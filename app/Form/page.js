"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdArrowBack, MdAddPhotoAlternate } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createHotel, updateHotel } from "../Services/hotel.services"; // Assuming you have an updateHotel service
import Swal from "sweetalert2";

const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Retourne true si userId existe, sinon false
};

const FormContainer = styled.div`
  max-width: 966px;
  width: 100%;
  margin: 50px auto;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BackIcon = styled(MdArrowBack)`
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  flex: ${(props) => (props.doubleWidth ? "2" : "1")};
  margin: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  padding-right: 80px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: #000000;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: #000000;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #555555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 800px;
`;

const FileInput = styled.input`
  display: none;
`;

const CustomFileInput = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 50px;
  padding-right: 140px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 16px;

  svg {
    font-size: 50px;
    margin-bottom: 10px;
    color: #dddddd;
  }

  img {
    max-width: 200px; 
    max-height: 100px; 
    object-fit: cover;
    margin-top: 10px;
  }
`;

const DottedLine = styled.hr`
  border: none;
  border-top: 1px dotted #ccc;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const validationSchema = Yup.object().shape({
  hotelName: Yup.string().required("Veuillez entrer le nom de l'hôtel."),
  address: Yup.string().required("Veuillez entrer l'adresse de l'hôtel."),
  email: Yup.string()
    .email("Veuillez entrer une adresse e-mail valide.")
    .required("Veuillez entrer l'adresse e-mail de l'hôtel."),
  phoneNumber: Yup.string().required(
    "Veuillez entrer le numéro de téléphone de l'hôtel."
  ),
  pricePerNight: Yup.number()
    .required("Veuillez entrer le prix par nuit de l'hôtel.")
    .positive("Le prix doit être un nombre positif."),
  currency: Yup.string().required("Veuillez sélectionner la devise."),
  photo: Yup.mixed().required("Veuillez ajouter une photo de l'hôtel."),
});

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [initialValues, setInitialValues] = useState({
    hotelName: "",
    address: "",
    email: "",
    phoneNumber: "",
    pricePerNight: "",
    currency: "XOF",
    photo: null,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [hotelId, setHotelId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const routerId = useRouter();
  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      routerId.push("/"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [router]);

  const handleBackClick = () => {
    router.push("/Hotels");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId);
      console.log("id user form : ", storedUserId);

      const hotelData = localStorage.getItem("hotelData");
      if (hotelData) {
        const parsedHotelData = JSON.parse(hotelData);
        setInitialValues({
          hotelName: parsedHotelData.name,
          address: parsedHotelData.address,
          email: parsedHotelData.email,
          phoneNumber: parsedHotelData.phoneNumber,
          pricePerNight: parsedHotelData.pricePerNight,
          currency: parsedHotelData.currency,
          photo: parsedHotelData.photo, // Pour les fichiers, il est nécessaire d'avoir une nouvelle sélection
        });
        setIsEditMode(true);
        setHotelId(parsedHotelData._id);
      }
    }
  }, []);

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true} // Permet de réinitialiser le formulaire lorsque initialValues change
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        try {
          const formData = new FormData();
          formData.append("hotelName", values.hotelName);
          formData.append("userId", userId);
          formData.append("address", values.address);
          formData.append("email", values.email);
          formData.append("phoneNumber", values.phoneNumber);
          formData.append("pricePerNight", values.pricePerNight);
          formData.append("currency", values.currency);
          formData.append("photo", values.photo);
          console.log('photo :', values.photo);
          if (isEditMode) {
            // Update existing hotel
            await updateHotel(hotelId, formData);
          } else {
            // Create new hotel
            await createHotel(formData);
          }

          Swal.fire({
            icon: "success",
            title: isEditMode
              ? "Hôtel mis à jour avec succès!"
              : "Hôtel ajouté avec succès!",
            showConfirmButton: false,
            timer: 1500, // Durée de l'affichage du message en millisecondes
          });

          // Effacer les données de l'hôtel dans le localStorage
          localStorage.removeItem("hotelData");

          // Rediriger vers la liste des hôtels
          router.push("/Hotels");
        } catch (error) {
          // Affichage d'un message d'erreur avec SweetAlert
          Swal.fire({
            icon: "error",
            title: isEditMode
              ? "Erreur lors de la mise à jour de l'hôtel"
              : "Erreur lors de l'ajout de l'hôtel",
            text: "Une erreur est survenue. Veuillez réessayer.",
          });
          console.error(
            "Erreur lors de l'ajout/mise à jour de l'hôtel:",
            error
          );
          setFieldError(
            "submit",
            "Une erreur est survenue lors de l'ajout/mise à jour de l'hôtel. Veuillez réessayer."
          );
        }
        setSubmitting(false);
      }}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        values,
        setFieldValue,
      }) => (
        <Modal>
          <FormContainer>
            <HeaderContainer>
              <BackIcon onClick={handleBackClick} />
              <FormTitle>
                {isEditMode ? "Modifier l'hôtel" : "Ajouter un nouvel hôtel"}
              </FormTitle>
            </HeaderContainer>
            <DottedLine />
            <form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="hotelName">Nom de l'hôtel</Label>
                  <Input
                    type="text"
                    id="hotelName"
                    name="hotelName"
                    value={values.hotelName}
                    onChange={handleChange}
                    required
                  />
                  <ErrorMessageStyled name="hotelName" component="div" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    type="text"
                    id="address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    required
                  />
                  <ErrorMessageStyled name="address" component="div" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                  <ErrorMessageStyled name="email" component="div" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="phoneNumber">Numéro de Téléphone</Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <ErrorMessageStyled name="phoneNumber" component="div" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="pricePerNight">Prix par nuit</Label>
                  <Input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={values.pricePerNight}
                    onChange={handleChange}
                    required
                  />
                  <ErrorMessageStyled name="pricePerNight" component="div" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="currency">Devise</Label>
                  <Select
                    id="currency"
                    name="currency"
                    value={values.currency}
                    onChange={handleChange}
                  >
                    <option value="XOF">XOF</option>
                    <option value="Euro">Euro</option>
                    <option value="Dollar">Dollar</option>
                  </Select>
                  <ErrorMessageStyled name="currency" component="div" />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup $doubleWidth>
                  <Label>Ajouter une photo</Label>
                  <FileInput
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={(event) => handlePhotoChange(event, setFieldValue)}
                    required
                  />
                  <CustomFileInput htmlFor="photo">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Aperçu de l'image" />
                    ) : (
                      <>
                        <MdAddPhotoAlternate />
                        {values.photo ? values.photo.name : "Ajouter une image"}
                      </>
                    )}
                  </CustomFileInput>
                  <ErrorMessageStyled name="photo" component="div" />
                </FormGroup>
              </FormRow>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "En cours..."
                  : isEditMode
                  ? "Mettre à jour"
                  : "Enregistrer"}
              </Button>
            </form>
          </FormContainer>
        </Modal>
      )}
    </Formik>
  );
}

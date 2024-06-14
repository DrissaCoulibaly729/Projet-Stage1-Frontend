"use client";
import styled from "styled-components";
import RootLayout from "../layout";
import { MdAdd, MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getHotelsByIdUser, deleteHotel,countHotelsByIdUser } from "../Services/hotel.services";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Retourne true si userId existe, sinon false
};

const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #000000de;
  font-weight: normal;
  display: flex;
  align-items: center;
  p {
    margin: 10px;
    color: #c3c3c3de;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin-right: 50px;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    margin-right: 8px;
    font-size: 24px;
  }
`;

const HotelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
`;

const ContainerBody = styled.div`
  width: calc(25% - 20px);
  margin: 10px;
  background-color: #ffffff;
  padding: 0;
  padding-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyleImage = styled(Image)`
  width: 100%;
  max-width: 100%;
  height: 273px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 10px;
`;

const StyleText = styled.div`
  padding: 2px 16px;
`;

const Address = styled.span`
  font-size: 14px;
  color: #8d4b38;
  margin-bottom: 5px;
`;

const HotelName = styled.h3`
  font-size: 20px;
  color: #333;
  margin: 0 0 5px;
`;

const Price = styled.p`
  font-size: 16px;
  color: #222222;
  margin: 0;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
  svg {
    margin-right: 8px;
  }
`;

export default function Page() {
  const [hotelCount, setHotelCount] = useState(0);
  const router = useRouter();
  const [hotels, setHotels] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null); // État pour gérer la visibilité de la liste déroulante

  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      router.push("/"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [router]);

  useEffect(() => {
    async function fetchHotelCount() {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("L'ID de l'utilisateur n'est pas disponible.");
          return;
        }
        const countData = await countHotelsByIdUser(userId);
        setHotelCount(countData.count);
      } catch (error) {
        console.error("Erreur lors du comptage des hôtels:", error);
      }
    }

    fetchHotelCount();
  }, []);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const userId = localStorage.getItem("userId"); // Récupérez l'ID de l'utilisateur depuis localStorage
        if (!userId) {
          // Vérifiez si l'ID de l'utilisateur est disponible dans localStorage
          console.error("L'ID de l'utilisateur n'est pas disponible.");
          return;
        }
        console.log('get id : ', userId);
        // Récupérez les hôtels depuis la base de données
        const hotelsData = await getHotelsByIdUser(userId);
        console.log("mes hotel", hotelsData);
        setHotels(hotelsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des hôtels:", error);
      }
    }

    fetchHotels(); // Appelez la fonction pour récupérer les hôtels lors du montage du composant
  }, []); // Utilisez un tableau vide pour que cette effect ne s'exécute qu'une seule fois au montage du composant

  const handleSubmit = () => {
    router.push("/Form");
    router.refresh();
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index); // Affiche ou cache la liste déroulante pour un hôtel spécifique
  };

  const handleDelete = async (id) => {
    try {
      await deleteHotel(id);
      setHotels(hotels.filter(hotel => hotel.id !== id)); // Mettez à jour l'état après la suppression
      MySwal.fire({
        title: 'Succès',
        text: 'Hôtel supprimé avec succès',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.refresh(); // Actualise la page après la suppression
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'hôtel:", error);
      MySwal.fire({
        title: 'Erreur',
        text: 'Échec de la suppression de l\'hôtel',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleEdit = (hotel) => {
    localStorage.setItem("hotelData", JSON.stringify(hotel)); // Stocke les données de l'hôtel dans le localStorage
    router.push('/Form');
  };

  return (
    <RootLayout activeLink="Liste des hotels">
      <ContainerHeader>
        <Title>
          Hôtels <p>{hotelCount}</p>
        </Title>
        <Button onClick={handleSubmit}>
          <MdAdd />
          Créer un nouvel hôtel
        </Button>
      </ContainerHeader>
      <HotelsContainer>
        {hotels.map((hotel, index) => (
          <ContainerBody key={index}>
            <StyleImage
              src={hotel.photo}
              alt="image"
              width={351}
              height={273}
            />
            <IconContainer onClick={() => toggleDropdown(index)}>
              <MdMoreVert />
            </IconContainer>
            <DropdownMenu visible={dropdownVisible === index ? 'true' : undefined}>
              <DropdownItem onClick={() => handleEdit(hotel)}>
                <MdEdit /> Modifier
              </DropdownItem>
              <DropdownItem onClick={() => handleDelete(hotel._id)}>
                <MdDelete /> Supprimer
              </DropdownItem>
            </DropdownMenu>
            <StyleText>
              <Address>{hotel.address}</Address>
              <HotelName>{hotel.name}</HotelName>
              <Price>
                {hotel.pricePerNight} {hotel.currency} par nuit
              </Price>
            </StyleText>
          </ContainerBody>
        ))}
      </HotelsContainer>
    </RootLayout>
  );
}

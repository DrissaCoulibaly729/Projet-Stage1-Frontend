'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUser } from '../Services/user.services';
import * as Yup from 'yup';
import Swal from 'sweetalert2';


const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #494C4F;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const ImageAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center; 
  justify-content: center;
`;

const ImageStyle = styled(Image)`
  margin-right: 10px; 
  margin-bottom: -10px;
`;

const StyledForm = styled(Form)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #A0A0A033;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled(Field)`
  margin-right: 10px;
`;

const TermsText = styled.p`
  margin: 0;
  font-size: 12px; 
`;

const SmallText = styled.span`
  font-size: 15px; 
  margin-bottom: 10px;
`;

const SpanText = styled.span`
  text-align: center;
  color: #fff;
  margin-top: 20px;
  display: block; 
  a {
    color: #FFD964; 
    text-decoration: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("S'il vous plaît entrez le nom de l'utilisateur"),
  email: Yup.string()
    .email("Email invalide")
    .required("S'il vous plaît entrez l'email"),
  password: Yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .required("S'il vous plaît entrez le mot de passe"),
  terms: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les termes et la politique'),
});

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    try {
      // Faites l'appel à votre backend pour enregistrer l'utilisateur
      await createUser(values); // Utilisez la fonction createUser avec les valeurs du formulaire
      console.log('Utilisateur enregistré avec succès:', values);
  
      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Inscription réussie !'
      });
  
      router.push('/'); // Rediriger l'utilisateur vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      });
    }
    setSubmitting(false);
  };
  

  return (
    <Main>
      <Container>
        <ImageAndTitleContainer>
          <ImageStyle src="/assets/img/Link→SVG.png" alt="image" width={32} height={32} />
          <Title width={178} height={22}>RED PRODUCT</Title>
        </ImageAndTitleContainer>
        <Formik
          initialValues={{ name: '', email: '', password: '', terms: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <SmallText>Inscrivez-vous en tant qu'administrateur</SmallText>
              <FormGroup>
                <Label>Nom</Label>
                <Input type="text" name="name" />
                <ErrorMessageStyled name="name" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <Label>E-mail (@gmail.com)</Label>
                <Input type="email" name="email" />
                <ErrorMessageStyled name="email" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <Label>Mot de passe</Label>
                <Input type="password" name="password" />
                <ErrorMessageStyled name="password" component={ErrorText} />
              </FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" name="terms" />
                <TermsText>Accepter les termes et la politique</TermsText>
                <ErrorMessageStyled name="terms" component={ErrorText} />
              </CheckboxContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                S'inscrire
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
        <SpanText>Vous avez déjà un compte ? <Link href="/">Se connecter</Link></SpanText>
      </Container>
    </Main>
  );
}

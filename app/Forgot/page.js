'use client'
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { forgotPassword } from '../Services/user.services';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #494C4F;
  font-family : system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

const FormStyle = styled(Form)`
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

const SmallText = styled.span`
  font-size: 13px; 
  margin: 5px;
  margin-bottom: 10px;
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
  background-color: #494C4F;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

// Schéma de validation avec Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez entrer une adresse e-mail valide.")
    .required("Veuillez entrer votre adresse e-mail."),
});

export default function Forgot() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleForgotPassword = async (values, { setSubmitting }) => {
    try {
      const data = await forgotPassword(values.email);
      setSubmitting(false);

      // Afficher une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Instructions de réinitialisation du mot de passe envoyées avec succès!'
      });

      router.push('/'); // Rediriger l'utilisateur vers la page de connexion
    } catch (error) {
      setSubmitting(false);
      
      // Afficher une alerte d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Échec de l\'envoi de la demande. Veuillez réessayer.'
      });
    }
  };

  return (
    <Main>
      <Container>
        <ImageAndTitleContainer>
          <ImageStyle src="/assets/img/Link→SVG.png" alt="image" width={32} height={32} />
          <Title>RED PRODUCT</Title>
        </ImageAndTitleContainer>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({ isSubmitting }) => (
            <FormStyle>
              <SmallText>Mots de passe oublié</SmallText>
              <SmallText>Entrez votre adresse e-mail ci-dessous et nous vous enverrons des instructions sur la façon de modifier votre mot de passe.</SmallText>
              <FormGroup>
                <Label>E-mail</Label>
                <Input type="email" name="email" />
                <ErrorMessageStyled name="email" component="div" />
              </FormGroup>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Envoyer
              </SubmitButton>
            </FormStyle>
          )}
        </Formik>
        <SpanText>Revenir à la <Link href="/">Connexion</Link></SpanText>
        {message && <SmallText>{message}</SmallText>}
      </Container>
    </Main>
  );
}

// pages/Auth.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUserByEmail } from '../Services/user.services';
import { useState } from 'react';
import { useUser } from '../Context/UserContext';
import Swal from 'sweetalert2';



const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #494c4f;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  border-bottom: 1px solid #a0a0a033;
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
  font-size: 13px;
  margin-bottom: 10px;
`;

const SpanText = styled.span`
  text-align: center;
  color: #fff;
  display: block;
  a {
    color: #ffd964;
    text-decoration: none;
  }
`;

const CustomLinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  a {
    color: #ffd964;
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez entrer une adresse e-mail valide.")
    .required("Veuillez entrer votre adresse e-mail."),
  password: Yup.string().required("Veuillez entrer votre mot de passe."),
});
const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

export default function Auth() {
  const router = useRouter();
  const { setUserId } = useUser(); // Utilisation du contexte utilisateur
  
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const user = await getUserByEmail(values.email);
  
      // Vérifiez si l'utilisateur existe et si le mot de passe correspond
      if (!user || user.password !== values.password) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Adresse e-mail ou mot de passe incorrect.'
        });
        setSubmitting(false);
        return;
      }
  
      // Définissez userId dans le contexte utilisateur et dans le localStorage
      setUserId(user._id);
      localStorage.setItem('userId', user._id);
  
      // Connexion réussie, redirigez vers le dashboard
      router.push(`/Dashboard`);
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion:", error);
      // Affichez une alerte pour l'erreur générale
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
      });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Main>
          <Container>
            <ImageAndTitleContainer>
              <ImageStyle
                src="/assets/img/Link→SVG.png"
                alt="image"
                width={32}
                height={32}
              />
              <Title>RED PRODUCT</Title>
            </ImageAndTitleContainer>
            <StyledForm>
              <SmallText>Connectez-vous en tant qu'administrateur</SmallText>
              <FormGroup>
                <Label htmlFor="email">E-mail(@gmail.com)</Label>
                <Input type="email" name="email" />
                <ErrorMessageStyled name="email" component="div" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Mot de passe</Label>
                <Input type="password" name="password" />
                <ErrorMessageStyled name="password" component="div" />
              </FormGroup>
              <CheckboxContainer>
                <Checkbox type="checkbox" name="rememberMe" />
                <TermsText>Gardez moi connecté</TermsText>
              </CheckboxContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Connecter
              </SubmitButton>
              <ErrorMessageStyled name="submit" component="div" />
            </StyledForm>
            <CustomLinkContainer>
              <Link href="/Forgot">Mot de passe oublié?</Link>
            </CustomLinkContainer>
            <SpanText>
              Vous avez déjà un compte ?{" "}
              <Link href="/Register">S'inscrire</Link>
            </SpanText>
          </Container>
        </Main>
      )}
    </Formik>
  );
}


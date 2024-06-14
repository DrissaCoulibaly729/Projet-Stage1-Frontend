// pages/Auth.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUserByEmail } from '../Services/user.services';
import { useUser } from '../Context/UserContext';
import Swal from 'sweetalert2';
import { Checkbox, CheckboxContainer, Container, CustomLinkContainer, FormGroup, ImageAndTitleContainer, ImageStyle, Input, Label, Main, SmallText, SpanText, StyledForm, SubmitButton, TermsText, Title } from '../styles/Auth.style';



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


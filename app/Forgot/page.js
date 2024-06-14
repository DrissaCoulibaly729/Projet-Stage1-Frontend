'use client'
import Link from 'next/link';

import { forgotPassword } from '../Services/user.services';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Container, ErrorMessageStyled, FormGroup, FormStyle, ImageAndTitleContainer, ImageStyle, Input, Label, Main, SmallText, SpanText, SubmitButton, Title } from '../styles/Forgot.style';



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

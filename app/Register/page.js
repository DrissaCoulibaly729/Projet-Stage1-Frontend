'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import zxcvbn from 'zxcvbn';
import { useState } from 'react';
import { createUser } from '../Services/user.services'; // Assurez-vous que ce chemin est correct
import { 
  Main, Container, Title, ImageAndTitleContainer, ImageStyle, 
  StyledForm, FormGroup, Label, Input, ErrorText, CheckboxContainer, 
  Checkbox, TermsText, SmallText, SpanText, SubmitButton, ErrorMessageStyled 
} from '../styles/Register.style'; // Assurez-vous que ce chemin est correct

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, "Le nom ne doit contenir que des lettres et des espaces, et ne pas commencer ou se terminer par des espaces")
    .required("S'il vous plaît entrez le nom de l'utilisateur"),
  email: Yup.string()
    .email("Email invalide")
    .required("S'il vous plaît entrez l'email"),
  password: Yup.string()
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Le mot de passe doit comporter des lettres, des chiffres et des caractères spéciaux")
    .required("S'il vous plaît entrez le mot de passe"),
  terms: Yup.boolean()
    .oneOf([true], 'Vous devez accepter les termes et la politique'),
});

const getPasswordStrength = (password) => {
  const result = zxcvbn(password);
  return result.score;
};

export default function Register() {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    try {
      await createUser(values);
      console.log('Utilisateur enregistré avec succès:', values);
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Inscription réussie !'
      });
      router.push('/');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
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
          <Title>RED PRODUCT</Title>
        </ImageAndTitleContainer>
        <Formik
          initialValues={{ name: '', email: '', password: '', terms: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, handleChange }) => (
            <StyledForm as={Form}>
              <SmallText>Inscrivez-vous en tant qu'administrateur</SmallText>
              <FormGroup>
                <Label>Nom</Label>
                <Field as={Input} type="text" name="name" />
                <ErrorMessageStyled name="name" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <Label>E-mail (@gmail.com)</Label>
                <Field as={Input} type="email" name="email" />
                <ErrorMessageStyled name="email" component={ErrorText} />
              </FormGroup>
              <FormGroup>
                <Label>Mot de passe</Label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordStrength(getPasswordStrength(e.target.value));
                  }}
                />
                <ErrorMessageStyled name="password" component={ErrorText} />
                <div>
                  <div style={{
                    width: '100%',
                    height: '10px',
                    backgroundColor: (() => {
                      switch (passwordStrength) {
                        case 0: return 'red';
                        case 1: return 'orange';
                        case 2: return 'yellow';
                        case 3: return 'lightgreen';
                        case 4: return 'green';
                        default: return 'transparent';
                      }
                    })()
                  }}></div>
                  <div style={{ marginTop: '5px', fontSize: '14px', color: (() => {
                    switch (passwordStrength) {
                      case 0: return 'red';
                      case 1: return 'orange';
                      case 2: return 'yellow';
                      case 3: return 'lightgreen';
                      case 4: return 'green';
                      default: return 'black';
                    }
                  })() }}>
                    {passwordStrength === 0 && 'Très faible'}
                    {passwordStrength === 1 && 'Faible'}
                    {passwordStrength === 2 && 'Moyen'}
                    {passwordStrength === 3 && 'Bon'}
                    {passwordStrength === 4 && 'Parfait'}
                  </div>
                </div>
              </FormGroup>
              <CheckboxContainer>
                <Field as={Checkbox} type="checkbox" name="terms" />
                <TermsText>Accepter les termes et la politique</TermsText>
                <ErrorMessageStyled name="terms" component={ErrorText} />
              </CheckboxContainer>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Traitement en cours...' : 'S\'inscrire'}
              </SubmitButton>
            </StyledForm>
          )}
        </Formik>
        <SpanText>Vous avez déjà un compte ? <Link href="/">Se connecter</Link></SpanText>
      </Container>
    </Main>
  );
}

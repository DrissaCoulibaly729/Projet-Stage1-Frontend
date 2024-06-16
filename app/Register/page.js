'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { createUser } from '../Services/user.services'; // Assurez-vous que ce chemin est correct
import { 
  Main, Container, Title, ImageAndTitleContainer, ImageStyle, 
  StyledForm, FormGroup, Label, Input, ErrorText, CheckboxContainer, 
  Checkbox, TermsText, SmallText, SpanText, SubmitButton, ErrorMessageStyled 
} from '../styles/Register.style'; // Assurez-vous que ce chemin est correct

const validationSchema = Yup.object({
  name: Yup.string().required("S'il vous plaît entrez le nom de l'utilisateur"),
  email: Yup.string().email("Email invalide").required("S'il vous plaît entrez l'email"),
  password: Yup.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères').required("S'il vous plaît entrez le mot de passe"),
  terms: Yup.boolean().oneOf([true], 'Vous devez accepter les termes et la politique'),
});

export default function Register() {
  const router = useRouter();

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

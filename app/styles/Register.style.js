'use client'
import styled from "styled-components";
import Image from 'next/image';
import { Form, Field, ErrorMessage } from 'formik';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #494C4F;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
`;

export const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

export const ImageAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center; 
  justify-content: center;
`;

export const ImageStyle = styled(Image)`
  margin-right: 10px; 
  margin-bottom: -10px;
`;

export const StyledForm = styled(Form)`
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #A0A0A033;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const Checkbox = styled(Field)`
  margin-right: 10px;
`;

export const TermsText = styled.p`
  margin: 0;
  font-size: 12px; 
`;

export const SmallText = styled.span`
  font-size: 15px; 
  margin-bottom: 10px;
`;

export const SpanText = styled.span`
  text-align: center;
  color: #fff;
  margin-top: 20px;
  display: block; 
  a {
    color: #FFD964; 
    text-decoration: none;
  }
`;

export const SubmitButton = styled.button`
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

export const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

export const PasswordStrengthMeter = styled.div`
  margin-top: 10px;
`;

export const PasswordStrengthBar = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ strength }) => {
    if (strength === 0) return 'red';
    if (strength === 1) return 'orange';
    if (strength === 2) return 'yellow';
    if (strength === 3) return 'lightgreen';
    if (strength === 4) return 'green';
  }};
`;

export const PasswordStrengthText = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${({ strength }) => {
    if (strength === 0) return 'red';
    if (strength === 1) return 'orange';
    if (strength === 2) return 'yellow';
    if (strength === 3) return 'lightgreen';
    if (strength === 4) return 'green';
  }};
`;
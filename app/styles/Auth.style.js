'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { Form, Field } from 'formik';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #494c4f;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  border-bottom: 1px solid #a0a0a033;
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
  font-size: 13px;
  margin-bottom: 10px;
`;

export const SpanText = styled.span`
  text-align: center;
  color: #fff;
  display: block;
  a {
    color: #ffd964;
    text-decoration: none;
  }
`;

export const CustomLinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  a {
    color: #ffd964;
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


'use client'
import styled from "styled-components";
import { MdArrowBack} from "react-icons/md";
import { ErrorMessage } from "formik";

export const FormContainer = styled.div`
  max-width: 966px;
  width: 100%;
  margin: 50px auto;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const BackIcon = styled(MdArrowBack)`
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  display: flex;
  align-items: center;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

export const FormGroup = styled.div`
  flex: ${(props) => (props.doubleWidth ? "2" : "1")};
  margin: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  padding-right: 80px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: #000000;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: #000000;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #555555;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-left: 800px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const CustomFileInput = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 50px;
  padding-right: 140px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: white;
  font-size: 16px;

  svg {
    font-size: 50px;
    margin-bottom: 10px;
    color: #dddddd;
  }

  img {
    max-width: 200px; 
    max-height: 100px; 
    object-fit: cover;
    margin-top: 10px;
  }
`;

export const DottedLine = styled.hr`
  border: none;
  border-top: 1px dotted #ccc;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
  color: red;
`;

'use client'

import styled from "styled-components";
import Image from "next/image";

export const ContainerHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  color: #000000de;
  font-weight: normal;
  display: flex;
  align-items: center;
  p {
    margin: 10px;
    color: #c3c3c3de;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  margin-right: 50px;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    margin-right: 8px;
    font-size: 24px;
  }
`;

export const HotelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
`;

export const ContainerBody = styled.div`
  width: calc(25% - 20px);
  margin: 10px;
  background-color: #ffffff;
  padding: 0;
  padding-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const StyleImage = styled(Image)`
  width: 100%;
  max-width: 100%;
  height: 273px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 10px;
`;

export const StyleText = styled.div`
  padding: 2px 16px;
`;

export const Address = styled.span`
  font-size: 14px;
  color: #8d4b38;
  margin-bottom: 5px;
`;

export const HotelName = styled.h3`
  font-size: 20px;
  color: #333;
  margin: 0 0 5px;
`;

export const Price = styled.p`
  font-size: 16px;
  color: #222222;
  margin: 0;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

export const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f8f9fa;
  }
  svg {
    margin-right: 8px;
  }
`;
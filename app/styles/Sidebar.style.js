'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { MdAdd } from 'react-icons/md';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #494C4F;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PrincipalParagraph = styled.p`
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const SidebarTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const ImageAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

export const CircularImage = styled(Image)`
  border-radius: 100%;
  cursor: pointer;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 200px;
  padding-left: 10px;

  @media (max-width: 768px) {
    margin-bottom: 100px;
  }

  @media (max-width: 480px) {
    margin-bottom: 50px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 60px;

  @media (max-width: 768px) {
    margin-right: 30px;
  }

  @media (max-width: 480px) {
    margin-right: 10px;
  }
`;

export const UserName = styled.span`
  color: white;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const OnlineStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Line = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #555;
  margin: 10px 0;

  @media (max-width: 480px) {
    margin: 5px 0;
  }
`;

export const GreenCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-right: 5px;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;
  ${props => props.active && `
    background-color: #FFFFFF;
    color: #4D5154;
  `}

  .icon {
    margin-right: 10px;
    font-size: 20px;
    color: white;
    ${props => props.active && `
      color: #4D5154;
    `}
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    padding: 5px;
    border-radius: 5px;
    ${props => props.active && `
      color: #4D5154;
    `}
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
    .icon {
      font-size: 18px;
    }
    a {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 5px;
    .icon {
      font-size: 16px;
    }
    a {
      font-size: 12px;
    }
  }
`;

export const ImageStyle = styled(Image)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const AddIconStyle = styled(MdAdd)`
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const VisibleFileInput = styled.input`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
`;

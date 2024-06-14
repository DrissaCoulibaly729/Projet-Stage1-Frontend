'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { MdSearch, MdNotificationsNone } from 'react-icons/md';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  color: #333;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px 20px;
  }
`;

export const NavbarItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

export const NavbarItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;

  .icon {
    font-size: 24px;
    color: #333;
    margin-right: 30px;

    @media (max-width: 768px) {
      margin-right: 10px;
    }
  }

  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 10px;
  }
`;

export const CircularImage = styled(Image)`
  border-radius: 50%;
`;

export const GreenCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  position: absolute;
  bottom: 2px;
  right: 2px;
  border: 2px solid white;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
    width: 100%;
  }
`;

export const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 10px;
  font-size: 20px;
  color: #ccc;

  @media (max-width: 768px) {
    left: 5px;
  }
`;

export const SearchInput = styled.input`
  height: 30px;
  width: 200px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 5px 10px 5px 30px;
  margin-right: 20px;
  color: #333;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 25px;
    margin-right: 0;
  }
`;

export const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #FCC100;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;

export const CustomNotificationIcon = styled(MdNotificationsNone)`
  color: #000000DE; 
  font-size: 24px;
`;
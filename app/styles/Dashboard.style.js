"use client"

import styled from "styled-components";
import Link from "next/link";
import { MdEmail, MdOutlineLocalParking } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
// Style pour le conteneur principal
export const Container = styled.div`
  margin-right: 50px;
  margin-left: 50px;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-right: 20px;
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    margin-right: 10px;
    margin-left: 10px;
  }
`;

// Style pour la liste des éléments
export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Style pour chaque élément de la liste
export const ListItem = styled.li`
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Alignement des éléments sur toute la largeur */
  padding: 20px; /* Espacement interne */
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0px 0px 1.33313px rgba(0, 0, 0, 0.15);
`;

// Style pour le lien et le texte
export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000de;
`;

// Style pour le conteneur de l'icône (cercle)
export const IconContainer1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #a88add;
  margin-right: 10px;
`;
export const IconContainerP1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0cc2aa;
  margin-right: 10px;
`;
export const IconContainerU1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fcc100;
  margin-right: 10px;
`;
export const IconContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f90000;
  margin-right: 10px;
`;
export const IconContainerP2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9c27b0;
  margin-right: 10px;
`;
export const IconContainerU2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1565c0;
  margin-right: 10px;
`;

// Style pour l'icône
export const Icon = styled(MdEmail)`
  font-size: 24px;
  color: #ffffffde;
`;
export const IconP = styled(MdOutlineLocalParking)`
  font-size: 24px;
  color: #ffffffde;
`;
export const IconUser = styled(FaUserGroup)`
  font-size: 24px;
  color: #ffffffde;
`;

// Style pour le texte
export const Text = styled.span`
  h4 {
    margin: 0;
    font-size: 18px;
    color: #000000de;
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #000000de;
  }
`;

// Style pour le conteneur de bienvenue
export const WelcomeContainer = styled.div`
  background-color: #ffffff;
  padding: 10px 10px 10px 10px;
  margin-top: 0;
  padding-left: 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  h2 {
    font-size: 18px;
    color: #000000de;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 10px;
    color: #000000de;
    margin: 0;
    padding: 0;
  }
`;
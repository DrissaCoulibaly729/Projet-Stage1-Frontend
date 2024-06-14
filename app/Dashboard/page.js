"use client";
import styled from "styled-components";
import Link from "next/link"; // Conservez cette importation
import { MdEmail, MdOutlineLocalParking } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import RootLayout from "../layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Retourne true si userId existe, sinon false
};

// Style pour le conteneur principal
const Container = styled.div`
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
const List = styled.ul`
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
const ListItem = styled.li`
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
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000de;
`;

// Style pour le conteneur de l'icône (cercle)
const IconContainer1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #a88add;
  margin-right: 10px;
`;
const IconContainerP1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0cc2aa;
  margin-right: 10px;
`;
const IconContainerU1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fcc100;
  margin-right: 10px;
`;
const IconContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f90000;
  margin-right: 10px;
`;
const IconContainerP2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #9c27b0;
  margin-right: 10px;
`;
const IconContainerU2 = styled.div`
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
const Icon = styled(MdEmail)`
  font-size: 24px;
  color: #ffffffde;
`;
const IconP = styled(MdOutlineLocalParking)`
  font-size: 24px;
  color: #ffffffde;
`;
const IconUser = styled(FaUserGroup)`
  font-size: 24px;
  color: #ffffffde;
`;

// Style pour le texte
const Text = styled.span`
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
const WelcomeContainer = styled.div`
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

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = isAuthenticated();
    if (!isLoggedIn) {
      router.push("/"); // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    }
  }, [router]);

  return (
    <RootLayout activeLink="Dashboard">
      <WelcomeContainer>
        <h2>Bienvenue sur RED Product</h2>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </WelcomeContainer>
      <Container>
        <List>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainer1>
                <Icon />
              </IconContainer1>
              <Text>
                <h4>124 Formulaire</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainerP1>
                <IconP />
              </IconContainerP1>
              <Text>
                <h4>40 Messages</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainerU1>
                <IconUser />
              </IconContainerU1>
              <Text>
                <h4>600 Utilisateurs</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainer2>
                <Icon />
              </IconContainer2>
              <Text>
                <h4>25 E-mails</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainerP2>
                <IconP />
              </IconContainerP2>
              <Text>
                <h4>40 Hotels</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink href="#" className="link">
              <IconContainerU2>
                <IconUser />
              </IconContainerU2>
              <Text>
                <h4>02 Entites</h4>
                <p>Je ne sais pas quoi mettre</p>
              </Text>
            </StyledLink>
          </ListItem>
        </List>
      </Container>
    </RootLayout>
  );
}

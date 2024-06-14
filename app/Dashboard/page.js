"use client";

 // Conservez cette importation

import RootLayout from "../layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {Container, Icon, IconContainer1, IconContainer2, IconContainerP1, IconContainerP2, IconContainerU1, IconContainerU2, IconP, IconUser, List, ListItem, StyledLink, Text, WelcomeContainer } from "../styles/Dashboard.style";


const isAuthenticated = () => {
  const userId = localStorage.getItem("userId");
  return !!userId; // Retourne true si userId existe, sinon false
};



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

// RootLayout.js
"use client";
import Head from 'next/head';
import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navbar from "./Navbar/page";
import Sidebar from "./Sidebar/page";
import { UserProvider, useUser } from "./Context/UserContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #F0F0F0;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding-left: ${({ hasSidebar }) => (hasSidebar ? '250px' : '0')};
`;

const RootLayoutContent = ({ children, activeLink }) => {
  const { userId: contextUserId } = useUser();
  const actualUserId = contextUserId;

  useEffect(() => {
    console.log('Current User ID in RootLayoutContent:', actualUserId);
  }, [actualUserId]);

  const hasSidebar = activeLink && activeLink !== "/";

  return (
    <html>
      <Head>
        <title>My Custom Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
      <LayoutContainer>
        <GlobalStyle />
        {hasSidebar && <Sidebar activeLink={activeLink} userId={actualUserId} />}
        <ContentContainer hasSidebar={hasSidebar}>
          {hasSidebar && <Navbar text={activeLink} userId={actualUserId} />}
          <main>{children}</main>
        </ContentContainer>
      </LayoutContainer>
      </body>
    </html>
  );
};

export default function RootLayout({ children, activeLink, userId }) {
  console.log('UserId in RootLayout Sidebar:', userId);
  return (
    <UserProvider userId={userId}>
      <RootLayoutContent children={children} activeLink={activeLink} />
    </UserProvider>
  );
}

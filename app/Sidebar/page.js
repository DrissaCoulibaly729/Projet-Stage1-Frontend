// Sidebar.js
'use client';

import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { getUser, updateUserByImg } from '../Services/user.services';
import Swal from 'sweetalert2';
import { 
  SidebarContainer, ContentWrapper, ImageAndTitleContainer, SidebarTitle, 
  PrincipalParagraph, SidebarList, SidebarItem, ImageStyle, 
  AddIconStyle, UserInfoContainer, UserInfo, UserName, 
  OnlineStatusContainer, GreenCircle, Line, CircularImage, 
  VisibleFileInput 
} from '../styles/Sidebar.style';

export default function Sidebar({ activeLink, userId }) {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log('id ::', userId);
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userData = await getUser(userId);
          setUser(userData);
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const updatedUserData = new FormData();
        updatedUserData.append('photo', file);
        await updateUserByImg(userId, updatedUserData);
        console.log("Image de profil mise à jour avec succès.");
        Swal.fire({
          icon: 'success',
          title: 'Image de profil mise à jour!',
          text: 'Votre image de profil a été modifiée avec succès.',
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'image de profil:", error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour de l\'image de profil!',
          text: 'Une erreur s\'est produite lors de la mise à jour de votre image de profil. Veuillez réessayer plus tard.',
        });
      }
    }
  };

  return (
    <SidebarContainer>
      <ContentWrapper>
        <ImageAndTitleContainer>
          <ImageStyle src="/assets/img/Link→SVG.png" alt="image" width={32} height={32} />
          <SidebarTitle>RED PRODUCT</SidebarTitle>
        </ImageAndTitleContainer>
        <PrincipalParagraph>Principal</PrincipalParagraph>
        <SidebarList>
          <SidebarItem active={activeLink === 'Dashboard'}>
            <MdDashboard className='icon' />
            <Link href="/Dashboard">Dashboard</Link>
          </SidebarItem>
          <SidebarItem active={activeLink === 'Liste des hotels'}>
            <FaBoxOpen className='icon' />
            <Link href="/Hotels">Liste des hôtels</Link>
          </SidebarItem>
        </SidebarList>
      </ContentWrapper>
      <div>
        <Line />
        {user ? (
          <UserInfoContainer>
            {user.photo ? (
              <div onClick={handleImageClick} style={{ position: 'relative' }}>
                <CircularImage src={user.photo} alt="user" width={40} height={40} onClick={handleImageClick} />
                <VisibleFileInput type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
              </div>
            ) : (
              <div onClick={handleImageClick} style={{ position: 'relative' }}>
                <AddIconStyle />
                <VisibleFileInput type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
              </div>
            )}
            <UserInfo>
              <UserName>{user.name}</UserName>
              <OnlineStatusContainer>
                <GreenCircle />
                <span>En ligne</span>
              </OnlineStatusContainer>
            </UserInfo>
          </UserInfoContainer>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </SidebarContainer>
  );
}

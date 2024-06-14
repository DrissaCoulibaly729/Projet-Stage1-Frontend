// Sidebar.js
'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { MdDashboard, MdAdd } from 'react-icons/md';
import { FaBoxOpen } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { getUser, updateUserByImg } from '../Services/user.services';
import Swal from 'sweetalert2';

const SidebarContainer = styled.div`
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

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PrincipalParagraph = styled.p`
  color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;

  @media (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const SidebarTitle = styled.h1`
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

const ImageAndTitleContainer = styled.div`
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

const CircularImage = styled(Image)`
  border-radius: 100%;
  cursor: pointer;
`;

const UserInfoContainer = styled.div`
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

const UserInfo = styled.div`
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

const UserName = styled.span`
  color: white;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const OnlineStatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #555;
  margin: 10px 0;

  @media (max-width: 480px) {
    margin: 5px 0;
  }
`;

const GreenCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-right: 5px;
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
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

const ImageStyle = styled(Image)`
  margin-right: 10px;
  margin-bottom: 10px;
`;

const AddIconStyle = styled(MdAdd)`
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const VisibleFileInput = styled.input`
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0;
  cursor: pointer;
`;

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

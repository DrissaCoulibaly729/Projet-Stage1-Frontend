'use client'
import { MdSearch, MdNotificationsNone, MdLogout } from 'react-icons/md';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUser, updateUser } from '../Services/user.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const NavbarContainer = styled.div`
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

const NavbarItems = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const NavbarItem = styled.div`
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

const ProfileContainer = styled.div`
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

const CircularImage = styled(Image)`
  border-radius: 50%;
`;

const GreenCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  position: absolute;
  bottom: 2px;
  right: 2px;
  border: 2px solid white;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
    width: 100%;
  }
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 10px;
  font-size: 20px;
  color: #ccc;

  @media (max-width: 768px) {
    left: 5px;
  }
`;

const SearchInput = styled.input`
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

const NotificationContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #FCC100;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;

const CustomNotificationIcon = styled(MdNotificationsNone)`
  color: #000000DE; 
  font-size: 24px;
`;

export default function Navbar({ text, userId }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState('/assets/img/user.png'); // Default image

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
        if (userData.photo) {
          setImageUrl(userData.photo); // Set the user's image URL if it exists
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogout = () => {
    // Effacer le localStorage de l'utilisateur
    localStorage.removeItem('userId');
    // Rediriger vers la page de connexion
    router.refresh();
    router.push('/');
  };

  const handleProfileClick = () => {
    Swal.fire({
      title: 'Nouveau mot de passe',
      input: 'password',
      inputPlaceholder: 'Entrez votre nouveau mot de passe',
      showCancelButton: true,
      confirmButtonText: 'Suivant &rarr;',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Vous devez entrer un mot de passe';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newPassword = result.value;
        Swal.fire({
          title: 'Confirmez votre nouveau mot de passe',
          input: 'password',
          inputPlaceholder: 'Confirmez votre nouveau mot de passe',
          showCancelButton: true,
          confirmButtonText: 'Confirmer',
          cancelButtonText: 'Annuler',
          inputValidator: (value) => {
            if (!value) {
              return 'Vous devez confirmer votre nouveau mot de passe';
            }
            if (value !== newPassword) {
              return 'Les mots de passe ne correspondent pas';
            }
          }
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            const confirmedPassword = confirmResult.value;
            // Mettre à jour le mot de passe dans la base de données
            if (newPassword === confirmedPassword) {
              updateUser(userId, { password: newPassword })
                .then((updatedUser) => {
                  console.log('Utilisateur mis à jour avec succès:', updatedUser);
                  Swal.fire({
                    icon: 'success',
                    title: 'Mot de passe mis à jour!',
                    text: 'Votre mot de passe a été mis à jour avec succès.',
                  });
                })
                .catch((error) => {
                  console.error('Erreur lors de la mise à jour du mot de passe:', error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de la mise à jour de votre mot de passe. Veuillez réessayer.',
                  });
                });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Les mots de passe ne correspondent pas. Veuillez réessayer.',
              });
            }
          }
        });
      }
    });
  };

  return (
    <NavbarContainer>
      <NavbarItems>
        <NavbarItem>
          <Link href="/">{text}</Link>
        </NavbarItem>
      </NavbarItems>
      <NavbarItems>
        <SearchContainer>
          <SearchIcon />
          <SearchInput type="text" placeholder="Rechercher..." />
        </SearchContainer>
        <NotificationContainer>
          <Link href="/notifications">
            <CustomNotificationIcon className='icon' />
            <NotificationBadge>3</NotificationBadge>
          </Link>
        </NotificationContainer>
        <ProfileContainer onClick={handleProfileClick}>
          <CircularImage src={imageUrl} alt="user" width={32} height={32} />
          <GreenCircle />
        </ProfileContainer>
        <NavbarItem onClick={handleLogout}>
          <MdLogout className='icon' />
        </NavbarItem>
      </NavbarItems>
    </NavbarContainer>
  );
}

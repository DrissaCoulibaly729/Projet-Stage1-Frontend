'use client'
import {  MdLogout } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { getUser, updateUser } from '../Services/user.services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { CircularImage, CustomNotificationIcon, GreenCircle, NavbarContainer, NavbarItem, NavbarItems, NotificationBadge, NotificationContainer, ProfileContainer, SearchContainer, SearchIcon, SearchInput } from '../styles/Navbar.style';





export default function Navbar({ text, userId }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState('/assets/img/vector-users-icon.jpg'); // Default image

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

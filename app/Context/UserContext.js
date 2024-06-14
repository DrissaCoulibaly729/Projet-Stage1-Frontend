import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSessionUserId } from '../Services/user.services'; // Importez la fonction getSessionUserId

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children, userId: initialUserId }) => {
  const [userId, setUserId] = useState(initialUserId);

  useEffect(() => {
    setUserId(initialUserId);
  }, [initialUserId]);

  useEffect(() => {
    console.log('Current User ID:', userId); // Ajout du console.log pour vérifier l'ID de l'utilisateur
  }, [userId]);

  useEffect(() => {
    // Appelez la fonction getSessionUserId ici
    const fetchSessionUserId = async () => {
      try {
        // Récupérer l'ID de l'utilisateur depuis le local storage
        const storedUserId = localStorage.getItem('userId');

        // Vérifier si l'ID de l'utilisateur est présent dans le local storage
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          // Si l'ID n'est pas présent dans le local storage, récupérez-le à partir de la session
          const sessionUserId = await getSessionUserId();
          setUserId(sessionUserId);
          
          // Stocker l'ID de l'utilisateur dans le local storage pour une utilisation ultérieure
          localStorage.setItem('userId', sessionUserId);
        }
      } catch (error) {
        console.error('Erreur 2 lors de la récupération de l\'ID de session de l\'utilisateur:', error);
      }
    };
    fetchSessionUserId(); // Appel de la fonction lors du montage du composant
  }, []); // Utilisez une dépendance vide pour que ce code s'exécute une seule fois lors du montage

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

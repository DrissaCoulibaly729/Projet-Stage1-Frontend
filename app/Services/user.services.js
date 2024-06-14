import axiosInstance from './axiosInstance';


// Obtenir l'ID de session de l'utilisateur
export const getSessionUserId = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data.userId;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'ID de session de l\'utilisateur:', error);
    throw error;
  }
};

// Obtenir tous les utilisateurs
export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    throw error;
  }
};

// Obtenir un utilisateur par ID
export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}:`, error);
    throw error;
  }
};

// Créer un utilisateur
export const createUser = async (userData) => {
  try {
    console.log('mes donnees : ',userData);
    const response = await axiosInstance.post('/', userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

// Mettre à jour un utilisateur par ID
export const updateUser = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/${id}/${userData.password}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur avec ID ${id}:`, error);
    throw error;
  }
};

// Supprimer un utilisateur par ID
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur avec ID ${id}:`, error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    console.log(email);
    const response = await axiosInstance.get(`/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur avec l'adresse e-mail ${email}:`, error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    console.log('meme email :',email);
    const response = await axiosInstance.post(`/forgot-password/${email}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de réinitialisation du mot de passe:', error);
    throw error;
  }
};

export const updateUserByImg = async (id, userData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur avec ID ${id}:`, error);
    throw error;
  }
};
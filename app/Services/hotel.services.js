import axiosInstanceHotel from './axiosInstanceHotel';

// Obtenir tous les hôtels
export const getHotels = async () => {
  try {
    const response = await axiosInstanceHotel.get('/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    throw error;
  }
};

export const getHotelsByIdUser = async (addedBy) => {
  try {
    console.log('id addedBy',addedBy);
    const response = await axiosInstanceHotel.get(`/addedBy/${addedBy}`);
    console.log('reponse : ',response);
    console.log('reponse des donnee : ',response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des hôtels:', error);
    throw error;
  }
};

export const countHotelsByIdUser = async (addedBy) => {
  try {
    console.log('id addedBy:', addedBy);
    const response = await axiosInstanceHotel.get(`/count/${addedBy}`);
    console.log('réponse:', response);
    console.log('réponse des données:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du comptage des hôtels:', error);
    throw error;
  }
};

// Obtenir un hôtel par ID
export const getHotel = async (id) => {
  try {
    const response = await axiosInstanceHotel.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'hôtel avec ID ${id}:`, error);
    throw error;
  }
};

//Créer un hôtel

export const createHotel = async (hotelData) => {
  try {
    console.log('hotel que je veux ajouter : ',hotelData);
    const response = await axiosInstanceHotel.post('/', hotelData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('reponse hotel que je veux ajouter : ',response);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'hôtel:', error);
    throw error;
  }
};

// export const createHotel = async (hotelData, photoFile) => {
//   const formData = new FormData();
//   formData.append('photo', photoFile);
 
//   for (const key in hotelData) {
//     formData.append(key, hotelData[key]);
//   }

//   try {
//     const response = await axiosInstanceHotel.post('/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log( 'mes reponse d insertion :',response);
//     return response.data;
//   } catch (error) {
//     console.error('Erreur lors de la création de l\'hôtel:', error);
//     throw error;
//   }
// };

// Mettre à jour un hôtel par ID
export const updateHotel = async (id, hotelData) => {
  try {
    const response = await axiosInstanceHotel.put(`/${id}`, hotelData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'hôtel avec ID ${id}:`, error);
    throw error;
  }
};

// Supprimer un hôtel par ID
export const deleteHotel = async (id) => {
  try {
    const response = await axiosInstanceHotel.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'hôtel avec ID ${id}:`, error);
    throw error;
  }
};
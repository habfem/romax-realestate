import axios from 'axios';

export const FETCH_ESTATE_DATA = 'FETCH_ESTATE_DATA';

export const fetchEstateData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://romax-real-estate.onrender.com/api/estate');
      const estateData = response.data[0];
      dispatch({
        type: FETCH_ESTATE_DATA,
        payload: estateData,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
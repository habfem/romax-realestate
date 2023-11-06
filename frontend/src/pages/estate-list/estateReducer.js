import { FETCH_ESTATE_DATA } from './estateActions';

const initialState = {
  estateData: {},
};

export const estateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ESTATE_DATA:
      return {
        ...state,
        estateData: action.payload,
      };
    default:
      return state;
  }
};
import { GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE } from '../actions/getRequestByIdAction';

const initialState = {
  product: null,
  error: null,
};

const getByIdRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.payload, 
        error: null,
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        product: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getByIdRequestReducer;

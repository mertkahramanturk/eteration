export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE';

export const getByIdRequest = (data) => (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

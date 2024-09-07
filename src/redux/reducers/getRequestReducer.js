
const initialState = {
  data: [],
  loading: false,
  success: false,
  error: false,
  filterValues: undefined,
};

export const getRequest = (namespace) => (state = initialState, action) => {
  switch (action.type) {
    case `${namespace}/GET_REQUEST_REQUEST`: {
      return { ...initialState, loading: true, success: false };
    }
    case `${namespace}/GET_REQUEST_SUCCESS`: {
      return { ...state, data: action.data, success: true, loading: false };
    }
    case `${namespace}/GET_REQUEST_FAILURE`: {
      return { ...state, data: [], success: false, error: action.error, loading: false };
    }
    case `${namespace}/GET_REQUEST_SET_FILTER_VALUES`: {
      return { ...state, filterValues: action.data };
    }
    case `${namespace}/GET_REQUEST_RESET_FILTER_VALUES`: {
      return { ...state, filterValues: undefined };
    }
    case `${namespace}/GET_REQUEST_RESET`: {
      return initialState;
    }
    default:
      return state;
  }
};

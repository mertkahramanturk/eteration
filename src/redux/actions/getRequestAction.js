/* eslint-disable array-callback-return */

import { get } from '../../utils/base';


function request(namespace) {
  return {
    type: `${namespace}/GET_REQUEST_REQUEST`,
  };
}

function success(namespace, data) {
  return {
    type: `${namespace}/GET_REQUEST_SUCCESS`,
    data,
  };
}

function failure(namespace, error) {
  return {
    type: `${namespace}/GET_REQUEST_FAILURE`,
    error,
  };
}

export const reset = (namespace) => async (dispatch) => {
  try {
    return {
      type: `${namespace}/GET_REQUEST_RESET`,
    };
  } catch (error) {
    throw error;
  }
}

export function setFilterValues(namespace, data) {
  return {
    type: `${namespace}/GET_REQUEST_SET_FILTER_VALUES`,
    data,
  };
}

export function resetFilterValues(namespace) {
  return {
    type: `${namespace}/GET_REQUEST_RESET_FILTER_VALUES`,
  };
}

function toQueryString(obj) {
  return obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key];

    if (Array.isArray(val)) {
      return val.sort().map(function (val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2 instanceof Date ? Date.parse(val2) : val2);
      }).join('&');
    }

    return encodeURIComponent(key) + '=' + encodeURIComponent(val instanceof Date ? Date.parse(val) : val);
  }).join('&') : '';
}


export const getRequest = (namespace, { storeVariable = undefined }={}) => async (dispatch, getState) => {

  let filter = ''
  if (storeVariable && getState()[storeVariable] && getState()[storeVariable].filterValues) {
    filter = '?' + toQueryString(getState()[storeVariable].filterValues);
  }
  console.log(process.env.REACT_APP_API_URL)
  try {
    dispatch(request(namespace));
    const res = await get(`${process.env.REACT_APP_API_URL}/${namespace}${filter}`);
    if (res.data.errorCode) {
    } else {
      dispatch(success(namespace, res.data));

    }
  } catch (error) {

    dispatch(failure(namespace, error));
    if (error.response !== undefined && error.response.status !== 500) {
    } else {
    }
    throw error;
  }
}


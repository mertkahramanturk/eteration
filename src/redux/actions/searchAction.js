export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const setSearchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};

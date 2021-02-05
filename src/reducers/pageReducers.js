import { SET_PAGE } from '../actions/types';

const initialState = {
  currentPage: 'home',
  previousPage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        previousPage: state.currentPage,
        currentPage: `${action.payload}`,
      };

    default:
      return state;
  }
};

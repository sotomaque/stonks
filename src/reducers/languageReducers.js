import { SET_LANGUAGE } from '../actions/types';
import { DEFAULT_LANGUAGE } from '../locales';

const initialState = {
  language: `${DEFAULT_LANGUAGE}`,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { language: action.payload };

    default:
      return state;
  }
};

// ENV VARIABLES
export const __prod__ =
  process.env.NODE_ENV === 'production';

// GQL DOCKER LINKS
export const HTTP_URL = 'http://localhost:8080/v1/graphql';
export const WS_URL = 'ws://localhost:8080/v1/graphql';
// GQL HASURA CLOUD + AWS LINKS
export const HASURA_SECRET =
  process.env.REACT_APP_HASURA_ADMIN_SECRET;
export const HTTPS_URL = process.env.REACT_APP_HTTPS_URL;
export const WSS_URL = process.env.REACT_APP_WSS_URL;

// PAGINGATION TYPES
export const PAGINATION_TYPES = Object.freeze({
  PREV: 'prev',
  NEXT: 'next',
});

// PAGE NAMES
export const PAGES = Object.freeze({
  HOME: 'Home Page',
  LOGIN: 'Login Page',
  REGISTER: 'Register Page',
});

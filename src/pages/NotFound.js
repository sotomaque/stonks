import React from 'react';
import notFoundImg from '../assets/not-found.png';
import Wrapper from '../styles/NotFound';

function NotFound() {
  return (
    <Wrapper>
      <img
        src={notFoundImg}
        alt="Error page illustration"
      />
      <br />
      <p>This page isnt available. Sorry about that.</p>
      <p>Try searching for something else.</p>
    </Wrapper>
  );
}

export default NotFound;

/* eslint-disable no-unused-vars */
import { useQuery } from '@apollo/react-hooks';
import { NUMBER_OF_USERS_QUERY } from 'app/gql/queries';
import React from 'react';

const HomePage = () => {
  const { loading, error, data } = useQuery(
    NUMBER_OF_USERS_QUERY,
  );
  if (data) {
    console.log(data);
  }
  return <div>Home Page</div>;
};

export default HomePage;

import { NUMBER_OF_USERS_QUERY } from 'gql/queries';
import React from 'react';
import Wrapper from '../styles/Home';
import VideoGrid from '../styles/VideoGrid';
import { useQuery } from '@apollo/react-hooks';

function Home() {
  const { loading, error, data } = useQuery(
    NUMBER_OF_USERS_QUERY,
  );
  if (data) {
    console.log(data);
  }
  return (
    <Wrapper>
      <VideoGrid>Recommended videos</VideoGrid>
    </Wrapper>
  );
}

export default Home;

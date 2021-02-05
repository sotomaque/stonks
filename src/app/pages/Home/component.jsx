/* eslint-disable no-unused-vars */
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { NUMBER_OF_USERS_QUERY } from 'app/gql/queries';

const width = window.innerWidth;
const height = window.innerHeight;

const HomePage = () => {
  const [state, setState] = React.useState({});
  const { loading, error, data } = useQuery(
    NUMBER_OF_USERS_QUERY,
  );
  if (data) {
    console.log(data);
  }

  React.useEffect(async () => {
    const res = await fetch(
      'https://api.coindesk.com/v1/bpi/historical/close.json',
    );
    const data = await res.json();
    setState({
      data: Object.keys(data.bpi).map((date) => {
        return {
          date,
          price: data.bpi[date],
        };
      }),
    });
  }, []);
  if (state) {
    console.log(state);
  }
  const padding = 100;
  const xMax = width - padding;
  const yMax = height - padding;

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#32deaa"
        />
      </svg>
    </div>
  );
};

export default HomePage;

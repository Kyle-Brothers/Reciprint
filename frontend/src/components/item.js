import React from 'react';

const Item = props => {
  const {result} = props;
  return <p>{result.rank}</p>;
};

export default Item;

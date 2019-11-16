import React from 'react';

const Item = props => {
  const {result} = props;
  return <p>{result.recipeMaterial}</p>;
};

export default Item;

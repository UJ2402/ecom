import React from 'react';

 export const ProductsContext = React.createContext({
  products: [],
  setProducts: () => {},
});

export default ProductsContext;

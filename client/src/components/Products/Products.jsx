import React, { Suspense} from 'react';
import { CircularProgress } from '@mui/material';
const ProductComponents = React.lazy(() => import('./ProductComponents'))

const Products = () => {
  return (
    <Suspense fallback={<div><CircularProgress/></div>}>
      <ProductComponents />
      </Suspense>
  );
};

export default Products;

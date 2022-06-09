import React, {Suspense} from 'react'
import { CircularProgress } from '@mui/material';
const ProductDetailComponent = React.lazy(() => import('./ProductDetailComponent'))
const ProductDetail = () => {
  return (
    <Suspense fallback={<div><CircularProgress/></div>}>
      <ProductDetailComponent/>
      </Suspense>  
  );
};

export default ProductDetail;

import React, {Suspense} from 'react';
import { CircularProgress } from '@mui/material';
const Sponsors = React.lazy(() => import('../Sponsors/Sponsors'))
const Players = React.lazy(() => import('./../Players/Players'))
const TeamDetail = () => {
    return (
        <>
        <Suspense fallback={<div><CircularProgress/></div>}>
        <Sponsors />
        <Players />
      </Suspense>
        </>
    );
}

export default TeamDetail;

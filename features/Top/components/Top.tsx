import React from 'react';
import {FC} from 'react';
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation';
import { GoogleMapComponents } from "features/GoogleMapComponents/GoogleMapComponents";

const Top:FC = () => {
    return (
        <>
            <GoogleMapComponents />
            <GrobalNavigation/>
        </>
    )
};

export default Top;

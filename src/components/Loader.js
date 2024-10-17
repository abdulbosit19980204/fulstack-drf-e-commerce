import React from 'react'
import {Spinner} from 'react-bootstrap';
function Loader() {
    return (<>
        <Spinner animation="grow" /> 
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        </>);
}

export default Loader

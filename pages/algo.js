import React, { useRef } from 'react';

import Carousel from '../src/components/carousel';
import containerPDF from './containerPDF';

import ReactToPrint from 'react-to-print';
import NavBar from '../src/components/NavBar';



const Algo = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <NavBar ref={componentRef} />
    </div>
  );
};

export default Algo;
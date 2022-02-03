import Head from 'next/head';
import React from 'react';
import NavBar from '../src/components/NavBar';


const calendario = () => {
  return (
    <>
    <Head>
      <link rel="StyleSheet" href={print} type="text/css" />
    </Head>
      <NavBar />
      <div className='print'>Calendario</div>
    </>
  )
};

export default calendario;

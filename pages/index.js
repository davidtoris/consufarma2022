import Head from 'next/head';
import NavBar from '../src/components/NavBar';
import CarouselSection from '../src/containers/carousel';

export default function Home() {
  return (  
    <>
    <NavBar />
    <CarouselSection />
    </>
  )
}

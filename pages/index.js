import Head from 'next/head';
import NavBar from '../src/components/NavBar';
import CarouselSection from '../src/containers/Carousel';
import Cursos from '../src/containers/Cursos';

export default function Home() {
  return (  
    <>
      <div className='bg-gray-100'>
        <NavBar />
        <CarouselSection />
        <Cursos />
      </div>
    </>
  )
}

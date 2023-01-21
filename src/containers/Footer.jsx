import Link from 'next/link';
import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div className='bg-blueConsufarma p-5no-print pb-2'>
      <div className="max-w-7xl mx-auto">

        <div className="text-right flex md:justify-between text-white items-center justify-center md:flex-row flex-col">

          <div className='flex flex-col md:flex-row items-center'>
            
            <div className='flex items-center justify-center'>

              <div className=''>
                <Link href="https://www.facebook.com/consufarma">
                  <a>
                    <FaFacebookSquare className='text-white text-2xl' />
                  </a>
                </Link> 
              </div>
              <div className='ml-5'>
                <Link href="https://www.linkedin.com/in/pedro-valadez-eslava-8075a439/">
                  <a>
                    <FaLinkedin className='text-white text-2xl' />
                  </a>
                </Link> 
              </div>
              

              <div className='ml-5'>
                <Link href="https://wa.me/525618003145?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
                  <a>
                    <FaWhatsapp className='text-white text-2xl' />
                  </a>
                </Link>
              </div>
            </div>
            
            <div className='text-center my-2'>
              <Link href="tel:525618003145">
                <span className='text-white ml-2'> (+52) 56 1800 3145</span>
              </Link>
            </div>

            <div className=''>
              <Link href='mailto:pedro.valadez@consufarma.com'>
                  <div className='ml-3 hover:text-blueLightCustom block'>
                    pedro.valadez@consufarma.com
                  </div>
              </Link>
            </div>

          </div>

          <div className='flex mt-2 sm:mt-0'>
            <Link href="/cursos">
              <div className="px-2 cursor-pointer">Cursos</div>
            </Link>
            <Link href="/nosotros">
              <div className="px-2 cursor-pointer">Nosotros</div>
            </Link>
            <Link href="/servicios">
              <div className="px-2 cursor-pointer">Servicios</div>
            </Link>
            <Link href="/calendario">
              <div className="px-2 cursor-pointer">Calendario</div>
            </Link>
          </div>
        </div>

      </div>
    </div>

    <div className='bg-redConsufarma h-2'></div>

    </>
  )
};

export default Footer;

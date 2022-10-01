import Link from 'next/link';
import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div className='bg-blueConsufarma p-5 mt-14 no-print pb-2'>
      <div className="max-w-7xl mx-auto">

        <div className="text-right flex md:justify-between text-white items-center justify-center lg:flex-row flex-col">

          <div className='flex items-center'>
            <div className=''>
              <Link href="https://www.instagram.com">
                <a>
                  <FaLinkedin className='text-white text-2xl' />
                </a>
              </Link> 
            </div>
            <div className='ml-5'>
              <Link href="https://www.facebook.com/consufarma">
                <a>
                  <FaFacebookSquare className='text-white text-2xl' />
                </a>
              </Link> 
            </div>

            <div className='ml-5'>
              <Link href="https://wa.me/525547810505?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
                <a>
                  <FaWhatsapp className='text-white text-2xl' />
                </a>
              </Link>
            </div>
            <span>
              <Link href="tel:525618003145">
                <span className='text-white ml-2'> (+52) 56 1800 3145</span>
              </Link>
            </span>

            
            <Link href='mailto:pedro.valadez@consufarma.com'>
                <div className='ml-3 hover:text-blueLightCustom'>
                   / pedro.valadez@consufarma.com
                </div>
            </Link>
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

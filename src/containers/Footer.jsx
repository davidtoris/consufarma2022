import Link from 'next/link';

const Footer = () => {
  return (
    <>
    <div className='bg-blueDarkCustom p-5 mt-14'>
      <div className="max-w-7xl mx-auto">

        <div className="text-right flex md:justify-between text-white items-center justify-center lg:flex-row flex-col">

          <div className='flex items-center'>
            <i className="text-3xl mx-2 fab fa-instagram"></i>
            <i className="text-3xl mx-2 fab fa-facebook-square"></i>
            <i className="text-3xl mx-2 fab fa-twitter-square"></i>
            <div className='ml-3'>
              pedro.valadez@consufarma.com
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
            <Link href="/contacto">
              <div className="px-2 cursor-pointer">Contacto</div>
            </Link>
          </div>
        </div>

      </div>
    </div>

    <div className='bg-blueLightCustom h-2'></div>

    </>
  )
};

export default Footer;

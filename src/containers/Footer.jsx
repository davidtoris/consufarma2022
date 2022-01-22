import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <>
    <div className='bg-blueDarkCustom p-5 mt-14'>
      <div className="max-w-7xl mx-auto">

        <div className="text-right flex md:justify-between text-white items-center justify-center lg:flex-row flex-col">

          <div className='flex items-center'>
            <div className=''>
              <Image src="/instag.png" height={30} width={30}/>
            </div>
            <div className='ml-5'>
              <Image src="/facebook.png" height={30} width={30} />
            </div>
            <div className='ml-5'>
              <Image src="/twitter.png" height={30} width={30} />
            </div>
            
            <Link href='mailto:pedro.valadez@consufarma.com'>
              
                <div className='ml-3 hover:text-blueLightCustom'>
                  pedro.valadez@consufarma.com
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

    <div className='bg-blueLightCustom h-2'></div>

    </>
  )
};

export default Footer;

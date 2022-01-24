import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SocialContact = () => {
  return (
    <div className='bg-gray-100 p-1 pt-2 flex'>
      <div className="text-gray-600 max-w-7xl mx-auto flex items-center">
        <div className=''>
          <Link href="https://www.instagram.com">
            <a>
              <Image src="/insta-gray.png" height={25} width={25} alt="instagram"/>
            </a>
          </Link> 
        </div>
        <div className='ml-3'>
          
            <a href="https://www.facebook.com/consufarma">
              <Image src="/facebook-gray.png" height={25} width={25} alt="facebook"/>
            </a>
          
        </div>
        <div className='ml-3'>
            <a href="https://www.twitter.com">
              <Image src="/twitter-gray.png" height={25} width={25} alt="twitter"/>
            </a>
        </div>
        <div className='mx-3'>
          <Link href="https://wa.me/525547810505?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
            <a>
              <Image src="/whatsapp.png" height={25} width={25} alt="whatsapp"/>
            </a>
          </Link>
        </div>
        <span>55 4781 0505</span>
      </div>
    </div>
  )
};

export default SocialContact;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SocialContact = () => {
  return (
    <div className='bg-blueConsufarma p-1 pt-2 flex'>
      <div className="text-gray-600 max-w-7xl mx-auto flex items-center">
      <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.facebook.com%2Fconsufarma&layout=button_count&size=small&appId=212287463617267&width=125&height=20" width="125" height="20" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        <div className='ml-3'>
            <a href="https://www.facebook.com/consufarma">
              <Image src="/facebook.png" height={25} width={25} alt="facebook"/>
            </a>
        </div>
        <div className='ml-3'>
          <Link href="https://www.instagram.com">
            <a>
              <Image src="/instag.png" height={25} width={25} alt="instagram"/>
            </a>
          </Link> 
        </div>
        <div className='ml-3'>
            <a href="https://www.twitter.com">
              <Image src="/twitter.png" height={25} width={25} alt="twitter"/>
            </a>
        </div>
        <div className='mx-3'>
          <Link href="https://wa.me/525547810505?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
            <a>
              <Image src="/whatsapp.png" height={25} width={25} alt="whatsapp"/>
            </a>
          </Link>
        </div>
        <span>
          <Link href="tel:5618003145">
            <span className='text-white'> 56 1800 3145</span>
          </Link>
          </span>
      </div>
    </div>
  )
};

export default SocialContact;

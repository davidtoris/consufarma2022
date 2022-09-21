import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookSquare, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const SocialContact = () => {
  return (
    <div className='bg-blueConsufarma p-1 pt-2 flex'>
      <div className="text-gray-600 max-w-7xl mx-auto flex items-center">
        {/* <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=92&layout=box_count&action=like&size=small&share=false&height=65&appId=212287463617267" width="92" height="65" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> */}
        <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=130&layout=button_count&action=like&size=small&share=false&height=21&appId=212287463617267" width="130" height="21" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        <div className='ml-3'>
            <a href="https://www.facebook.com/consufarma">
              <FaFacebookSquare className='text-white text-2xl' />
            </a>
        </div>
        <div className='ml-3'>
          <Link href="https://mx.linkedin.com/">
            <a>
              <FaLinkedin className='text-white text-2xl' />
            </a>
          </Link> 
        </div>
        <div className='mx-3'>
          <Link href="https://wa.me/525547810505?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
            <a>
              <FaWhatsapp className='text-white text-2xl' />
            </a>
          </Link>
        </div>
        <span>
          <Link href="tel:525618003145">
            <span className='text-white'> +52 56 1800 3145</span>
          </Link>
          </span>
      </div>
    </div>
  )
};

export default SocialContact;

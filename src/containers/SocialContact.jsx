import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookSquare, FaLinkedin, FaWhatsapp, FaPhone } from 'react-icons/fa';

const SocialContact = () => {
  return (
    <div className='bg-blueConsufarma p-1 pt-2 flex'>
      <div className="text-gray-600 max-w-7xl mx-auto flex items-center">
        <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=130&layout=button_count&action=like&size=small&share=false&height=21&appId=212287463617267" width="130" height="21" scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        <div className='ml-3'>
            <a href="https://www.facebook.com/consufarma" target="blank">
              <FaFacebookSquare className='text-white text-2xl' />
            </a>
        </div>
        <div className='ml-3'>
          <a href="https://www.linkedin.com/in/pedro-valadez-eslava-8075a439/" target="blank">
              <FaLinkedin className='text-white text-2xl' />
          </a> 
        </div>
        <div className='mx-3'>
          <a href="https://wa.me/525640009095?text=Hola%20me%20gusta%20el%20curso%20de..." target="blank">
              <FaWhatsapp className='text-white text-2xl' />
          </a>
        </div>
        <span>
          <a href="tel:525640009095">
            <FaPhone className='text-white text-2xl' />
          </a>
        </span>
      </div>
    </div>
  )
};

export default SocialContact;

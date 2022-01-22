import React from 'react';
import Image from 'next/image';

const SocialContact = () => {
  return (
    <div className='bg-gray-100 p-1 pt-2 flex'>
      <div className="text-gray-600 max-w-7xl mx-auto flex items-center">
        <div className=''>
          <Image src="/insta-gray.png" height={25} width={25}/>
        </div>
        <div className='ml-3'>
          <Image src="/facebook-gray.png" height={25} width={25} />
        </div>
        <div className='ml-3'>
          <Image src="/twitter-gray.png" height={25} width={25} />
        </div>
        <div className='mx-3'>
          <Image src="/whatsapp.png" height={25} width={25} />
        </div>
        <span>55 4781 0505</span>
      </div>
    </div>
  )
};

export default SocialContact;

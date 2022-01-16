import React from 'react'
import CardCourse from './CardCourse';

const SectionCourse = () => {
  return (
    <div class="max-w-7xl mx-auto pb-10">
      <section className='my-5 mt-10'>
        <h2 className='text-blueDarkCustom text-3xl font-extrabold mb-5 font-body'>Buenas Prácticas</h2>
        {/* <div className='grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-4'> */}
        <div className='flex space-x-3 overflow-scroll'>
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
          <CardCourse />
        </div>
        {/* </div> */}
      </section>
    </div>
  )
}

export default SectionCourse;

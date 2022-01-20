import Link from 'next/link'
import React from 'react'
import CardCourse from '../../src/components/cursos/CardCourse'

const Back = () => {
  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className='grid grid-cols-4 gap-10'>
        <CardCourse 
          link={'/back/9'}
        />
      </div>
    </div>
  )
}

export default Back

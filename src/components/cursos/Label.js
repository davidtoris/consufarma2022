
const Label = ({label}) => {
  return (
    <>
    {label === 'promocion' && (
      <div className='absolute z-10 right-0 mt-5 bg-red-500 p-1 pl-2 text-white rounded-l-lg uppercase font-semibold'>
        {label}
      </div>
    )} 
    {label === 'nuevo' && (
      <div className='absolute z-10 right-0 mt-5 bg-red-500 p-1 pl-2 text-white rounded-l-lg uppercase font-semibold'>
        {label}
      </div>
    )} 
    {label === 'destacado' && (
      <div className='absolute z-10 right-0 mt-5 bg-blueLightCustom p-1 pl-2 text-white rounded-l-lg uppercase font-semibold'>
        {label}
      </div>
    )} 
    </>
  )
};

export default Label;

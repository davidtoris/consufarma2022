import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRouter } from 'next/router';

const ModalTryings = ({  openModalTryings, setOpenModalTryings }) => {

  const router = useRouter()
  
    const onCloseModal = () => {
      setOpenModalTryings(false);
      router.push("/")
    }

  return (
    <>
      <Modal 
      open={openModalTryings} onClose={onCloseModal} center>
        
          <div className='cursor-pointer'>
            <div className='m-6 p-4 pt-2 text-2xl font-extrabold sm:mb-6 text-center'>
              Lo sentimos
              <div className='font-light'>

              </div>
              <div className='font-extralight text-lg'>
                Haz superado el número de intentos para realizar este Examen
              </div>
              <div className='mt-5'>
                <button onClick={() => onCloseModal()} className='py-2 px-4 text-white rounded-md bg-blueLightCustom'>Cerrar</button>
              </div>
            </div>
          </div>
        
      </Modal>
    </>
  )
}

export default ModalTryings;

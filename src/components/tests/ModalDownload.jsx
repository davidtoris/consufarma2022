import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { mailReset } from '../../../store/slices/Mail/MailSlice';

const ModalDownload = ({  openModal, setOpenModal }) => {

  const router = useRouter()
  const dispatch = useDispatch()
  
    const onCloseModal = () => {
      setOpenModal(false);
      dispatch(mailReset())
    }

  return (
    <>
      <Modal 
      open={openModal} onClose={onCloseModal} center>
        
          <div className='cursor-pointer'>
            <div className='m-6 p-4 pt-2 text-2xl font-extrabold sm:mb-6 text-center'>
              El documento se ha sido descargado exitosamente
              <div className='font-light text-lg'>
                Puedes revisar en tu carpetas de descargas
              </div>
              <div className='font-extralight text-lg'>
                
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

export default ModalDownload;

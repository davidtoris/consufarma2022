import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from 'react-redux';
import { DeleteTest } from '../../../store/slices/Tests/TestService';

const ModalDelete = ({  openModalDelete, setOpenModalDelete, nameCourse, idCourse }) => {
  
    const onCloseModal = () => setOpenModalDelete(false);
    const dispatch = useDispatch()

    const deleteCourse = () => {
      DeleteTest(dispatch, idCourse)
      setOpenModalDelete(false);
    }

  return (
    <>
      <Modal 
      classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}
      open={openModalDelete} onClose={onCloseModal} center>
        
          <div className='cursor-pointer'>
            <div className='m-6 p-4 pt-2 text-2xl font-extrabold sm:mb-6 text-center'>
              ¿Deseas borrar el examen? 
              <div className='font-light'>
                {nameCourse}
              </div>
              <div className='font-extralight text-sm'>
                Esta acción no podrá ser revertida
              </div>
              <div className='mt-5'>
                <button onClick={() => onCloseModal()} className='py-2 px-4 text-white rounded-md bg-blueLightCustom'>Cancelar</button>
                <button onClick={() => deleteCourse()} className='py-2 px-4 text-white rounded-md bg-redConsufarma ml-4'>Borrar Exámen</button>
              </div>
            </div>
          </div>
        
      </Modal>
    </>
  )
}

export default ModalDelete;

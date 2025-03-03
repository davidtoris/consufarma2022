import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import Link from 'next/link';

const ModalComp = () => {

  const [open, setOpen] = useState(true);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <Link href="/webinar">
          <div className='cursor-pointer'>
            <div className='bg-blueConsufarma p-4 pt-2 text-white text-3xl font-extrabold sm:mb-6 text-center'>
                Te invitamos a registrarte AQUI a nuestro Webinar
            </div>
            <div>
              <img 
                src="https://res.cloudinary.com/drq8o9k36/image/upload/v1741024840/Captura_de_pantalla_2025-03-03_a_la_s_12.00.26_p.m._zjthvp.png"
                width="500px"
                className='m-auto'/>
            </div>
          </div>
        </Link>
      </Modal>
    </>
  )
}

export default ModalComp;

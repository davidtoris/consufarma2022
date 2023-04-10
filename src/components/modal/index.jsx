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
        <Link href="/reto">
          <div className='cursor-pointer'>
            <div className='bg-blueConsufarma p-4 pt-2 text-white text-3xl font-extrabold sm:mb-6 text-center'>
                Te invitamos a registrarte AQUI sin costo al reto Consufarma
            </div>
            <div>
              <img 
                src="https://res.cloudinary.com/drq8o9k36/image/upload/v1681159706/reto/Captura_de_pantalla_2023-04-10_a_la_s_2.47.50_p.m._ihezuj.png"
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

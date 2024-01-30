import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { API_BASE_URL } from '../src/constants';
import { Thousands } from '../src/helpers/Thousands';
import axios from 'axios';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Link from 'next/link';
import Cookies from 'js-cookie'
import Spinner from '../src/components/spinner';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { orderError, orderSuccess } from '../slices/OrderSlice';
import { addItem } from '../slices/basketSlice';

const Carrito = ({ hoursData, peopleData }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [cuponText, setCuponText] = useState('');
  const [cuponDiscount, setCuponDiscount] = useState(1);
  const [cuponId, setCuponId] = useState('');

  const handleChangeCuponText = (e) => {
    setCuponText(e.target.value);
  } 

  const [userData, setUserData] = useState('')
  useEffect(() => {
    const userCookie = Cookies.get('user')
    if ( userCookie ) {
      const usuario = JSON.parse(userCookie)
      setUserData(usuario);
    }
  }, [])
  
  const [haveCupon, setHaveCupon] = useState('');
  const canjearCupon = async () => {
    if ( cuponText !== '' ) {
      await axios.get(`${API_BASE_URL}/cupons/validate/${cuponText}`)
      .then(({data}) => {
        const {date, findCupon} = data;
        if(findCupon.length) {
          if (findCupon[0]?.isValid) {
            
            if (findCupon[0]?.fechaFin > date) {
              setHaveCupon('valido');
              setCuponDiscount(findCupon[0]?.descuentoCupon)
              localStorage.setItem('cuponId', findCupon[0]?._id)
            } else {
              setHaveCupon('expired');
            }
            
          } else {
            setHaveCupon('noActive');
          }
        } else {
          setHaveCupon('noValido');
        }
      })
      .catch((err) => {
        setHaveCupon('noValido');
      })
    }
  }

  // Traer todos los elementos de LocalStorage y ponerlos en State del componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')); 
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  // Actualiza el carrito en LocalStorage 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    console.log(storedCart.length)
    dispatch(addItem(storedCart.length))
  }, [cartItems]);

  const [typeMoney, setTypeMoney ] = useState('MX');
  const [businessPersonalF3, setBusinessPersonalF3 ] = useState(0.9);

  const updateQuantity = (id, value) => {

    const filterNumPeople = peopleData.filter(i=> i.numPersonas === Number(value))
    let discountNumPeopleF2
    
    discountNumPeopleF2 =  filterNumPeople[0].descuentoPersonas;
    
    const itemIndex = cartItems.findIndex((item) => item._id === id);
    const updatedItems = [...cartItems];
    
    // Constants
    const priceMX = updatedItems[itemIndex].precio;
    const priceUSD = updatedItems[itemIndex].precioUSD;

    let priceSelected
    typeMoney === 'MX' ? priceSelected = priceMX : priceSelected = priceUSD
    
    const discountPercent = updatedItems[itemIndex].descuento;
    const discountCourseF1 = (100 - discountPercent) / 100;
    const total = Math.floor(priceSelected * discountCourseF1 * discountNumPeopleF2 * businessPersonalF3 * value);
    const percent = 100 - (total * 100 / (priceSelected * value));
    
    updatedItems[itemIndex].cantidad = Number(value)
    updatedItems[itemIndex].total = total
    updatedItems[itemIndex].descuentoTotal = Math.floor(percent);
    setCartItems(updatedItems);
    
    // console.log({priceMX, priceUSD, discountPercent, discountCourseF1, total, percent, priceSelected})
  }

  // 
  useEffect(() => {
    cartItems.map( item => {
      if(item.total === 0)
      cartItems.map( m => updateQuantity(m._id, m.cantidad))
    })
  }, [cartItems]);

  // Actualizar valores (Business and People / MXN and USD)
  useEffect(() => {
    cartItems.map( m => updateQuantity(m._id, m.cantidad))
  }, [businessPersonalF3, typeMoney]);

  const [subtotal, setSubtotal] = useState(0)
  const [iva, setIva] = useState(0)
  const [discountTotalHours, setDiscountTotalHours] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    localStorage.setItem('totalFinal', total);
  }, [total]);

  useEffect(() => {
    const hoursOfAllCourses = cartItems.reduce((sum, value) => (value.duracion ? sum + value.duracion : sum), 0)
    const descHoursOfAllCoursesF4 = hoursData.filter(h=> hoursOfAllCourses >= h.horasMin && hoursOfAllCourses <= h.horasMax)
    const subtotal = cartItems.reduce((sum, value) => (value.total ? sum + value.total : sum), 0)

    setSubtotal((subtotal).toFixed(2));
    setIva((subtotal * 1.16).toFixed(2));
    setDiscountTotalHours((iva - (iva * descHoursOfAllCoursesF4[0]?.descuentoHoras)).toFixed(2));
    setTotal((iva * descHoursOfAllCoursesF4[0]?.descuentoHoras * cuponDiscount).toFixed(2))

    localStorage.setItem('totalFinal', total)
  }, [cartItems, subtotal, businessPersonalF3, cuponDiscount])

  const removeItem = (id) => {
    const filterToRemove = cartItems.filter(f => f._id !== id);
    setCartItems(filterToRemove);
  }

  const [loadingPay, setLoadingPay] = useState(false);

  const validateOrder = async (order) => {
    setLoadingPay(true);
    const data = {
      usuario: userData._id,
      total: localStorage.getItem('totalFinal'),
      producto: cartItems,
    }

    let idOrder
    await axios.post(`${API_BASE_URL}/orders`, data)
    .then((resp) => {
      const { data } = resp;
      console.log(data)
      idOrder = data.orders._id
    })
    .catch((err) => {
      console.log(err.response.data)
      
    });

    await axios.get(`${API_BASE_URL}/pays/payOrder/${order}?idOrder=${idOrder}&cupon=${localStorage.getItem('cuponId')}`)
    .then((resp) => {
      const { data } = resp;
      dispatch(orderSuccess(data))
      router.push("/orders")
    })
    .catch((err) => {
      dispatch(orderError(err.response.data.message))
      router.push("/orders")
    });
    setLoadingPay(false);
  }

  const showTotalPayPal = () => {
    // console.log(total);
    return total
  }
  useEffect(() => {
    showTotalPayPal()
  }, [total])
  

  return (
    <>
      <NavBar />

      {loadingPay ? (
        <div className='my-10'>
          <Spinner />
        </div>
      ) : (
        <div>
          {cartItems.length ? (
            <div className='max-w-7xl mx-auto container px-5 pb-40 text-blueConsufarma mt-10'>
              <div className='flex'>
                <div>
                  <label className='cursor-pointer'>
                    <input type="radio" name='precio' defaultChecked onClick={() => setBusinessPersonalF3(0.9)} /> 
                    <span className='font-bold'> Precio pago personal </span>
                  </label>
                  <label className='cursor-pointer'>
                    <input type="radio" name='precio'  onClick={() => setBusinessPersonalF3(1)} className='ml-7'/>
                    <span className='font-bold'> Precio a empresa / </span> por participante
                  </label>
                </div>
  
                <div className='ml-24'>
                  <label className='cursor-pointer'>
                    <input type="radio" name="coin"  defaultChecked onClick={() => setTypeMoney('MX')} /> <span className='font-bold'> MX </span>
                  </label>
                  <label className='cursor-pointer'>
                    <input type="radio" name="coin" className='ml-7' onClick={() => setTypeMoney('USD')} /> USD
                  </label>
                </div>
              </div>
              <h2 className='text-grayCustom font-bold mt-3'>A mayor número de asistentes y cursos, obtienes un mayor descuento</h2>
  
              <div className='flex'>
                <div className='flex-1'>
                  <div className='bg-blueConsufarma p-3 text-white rounded-md mr-5 mt-3'>
                    <div className='grid gap-4 grid-cols-6 px-2 text-center'>
                      <div>
                        Curso
                      </div>
                      <div>
                        Precio
                      </div>
                      <div>
                        Cantidad
                      </div>
                      <div>
                        Descuento
                      </div>
                      <div>
                        Total
                      </div>
                    </div>
                  </div>
  
                  {cartItems.length && cartItems.map( i => (
                    <div className='grid gap-4 grid-cols-6 px-2 text-center my-5 border-b-2 border-gray-300 pb-5 mr-5' key={i._id}>
                      <div>
                        <img src={i.imagen} />
                        <div className='mt-2'>{i.nombre}</div>
                        <div className='font-thin'>{i.fecha_text}</div>
                        <div>{`${i.duracion} (${i.horario})`}</div>
                      </div>
                      <div className='font-bold text-2xl'>
                        ${typeMoney === 'MX' ? Thousands(i.precio) : i.precioUSD}
                      </div>
                      <div>
                        <select name="select" value={i.cantidad} onChange={(e) => updateQuantity(i._id, e.target.value)}>
                          <option value="1" >1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                        {/* <input className=' text-xl p-2' type="number" value={i.cantidad} onChange={(e) => updateQuantity(i._id, e.target.value)} /> */}
                      </div>
                      <div className='font-bold text-2xl'>
                      {i.descuentoTotal}%  
                      </div>
                      <div className='font-bold text-2xl'>
                        ${Thousands(i.total)}
                      </div>
                      <div className='font-bold text-2xl'>
                        <div className='cursor-pointer w-2/12 m-auto' onClick={() => removeItem(i._id)}>x</div>
                      </div>
                    </div>
                  ))}
                </div>
  
                <div className='bg-gray-100 p-2 rounded-md'>
                  <div className='font-bold text-2xl ml-2 mb-3'>Resumen</div>
                  
                  <div className='font-bold text-xl ml-2'>Subtotal:</div>
                  <div className='font-normal ml-2 mb-3'>${Thousands(subtotal)}</div>
                  
                  <div className='font-bold text-xl ml-2'>Precio más IVA:</div>
                  <div className='font-normal ml-2 mb-3'>${Thousands(iva)}</div>
  
                  <div className='font-bold text-xl ml-2'>Descuento × No. cursos adquiridos:</div>
                  <div className='font-normal ml-2 mb-3'>${Thousands(discountTotalHours)}</div>
  
                  <div className='font-bold text-xl ml-2 mb-2'>Cupón de descuento</div>
                  
                  <input type="text" className='p-2 bg-gray-300 rounded-md' value={cuponText} onChange={handleChangeCuponText}/>
                  <button type="button" className='bg-blueConsufarma text-white p-2 rounded-md' onClick={canjearCupon}>Canjear</button>
  
                  {haveCupon === 'noValido' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>Cupon no válido</div>
                  )}
                  {haveCupon === 'noActive' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>El cupón ya se ha usado </div>
                  )}
                  {haveCupon === 'expired' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>El cupon ha expirado</div>
                  )}
                  {haveCupon === 'valido' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-green-600 mb-3'>El cupón se aplicó correctamente </div>
                  )}
  
                  <div className='font-bold text-xl ml-2 mt-2'>Total:</div>
                  <div className='font-bold ml-2 mb-3'>${Thousands(total)}</div>
  
                  {userData === '' ? (
                    <Link href="/login">
                      <div className='bg-blueLightCustom text-white p-2 mb-3 w-full rounded-md text-center cursor-pointer hover:scale-105 transition'>Inicia sesión para continuar con el pago </div>
                    </Link>
                  ) : (
                    <PayPalButtons 
                      style={{ layout: "vertical" }} 
                      createOrder={( data, actions ) => {
                        
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: localStorage.getItem('totalFinal')
                              }
                            }
                          ]
                        })
                      }}
                      onApprove={ async (data, actions) => {
                        const order = await actions.order.capture()
                        validateOrder(order.id)
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <h3 className='font-extrabold text-2xl text-blueDarkCustom mb-5 text-center mt-5'>
              Tu carrito esta vacio
            </h3>
          )}
        </div>
      )}
    </>
  )
}

export default Carrito

export const getServerSideProps = async () => {
  const urlHours = `${API_BASE_URL}/numHours`
  const urlPeople = `${API_BASE_URL}/numPeople`

  const [respHours, respPeople] = await Promise.all([
    fetch(urlHours),
    fetch(urlPeople),
  ])
  
  const [hours, people] = await Promise.all([
    respHours.json(),
    respPeople.json(),
  ])

  return { props : { 
      hoursData : hours,
      peopleData: people,
    } 
  }
}
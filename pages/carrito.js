import React, { useEffect, useState } from 'react'
import NavBar from '../src/components/NavBar'
import { API_BASE_URL } from '../src/constants';
import { Thousands } from '../src/helpers/Thousands';
import axios from 'axios';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Link from 'next/link';
import Cookies from 'js-cookie'
import Spinner from '../src/components/spinner';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { orderError, orderSuccess } from '../store/slices/OrderSlice';
import { addItem } from '../store/slices/basketSlice';
import { IoTrashOutline } from "react-icons/io5";

const Carrito = ({ hoursData, peopleData }) => {

  const router = useRouter();
  const dispatchTemp = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [cuponText, setCuponText] = useState('');
  const [cuponDiscount, setCuponDiscount] = useState(1);

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
    setHaveCupon('')
    if ( cuponText !== '' ) {
      await axios.get(`${API_BASE_URL}/cupons/validate/${cuponText}`)
      .then(({data}) => {
        const {date, findCupon} = data;

        const { descuentoCupon, fechaExpira, fechaInicia, _id } = findCupon[0]

        
        if(findCupon.length > 0) {
          if (date >= fechaInicia && date <= fechaExpira) {
            setHaveCupon('valido');
            setCuponDiscount(descuentoCupon)
            localStorage.setItem('cuponId', _id)
          } else {
            setHaveCupon('noValido');
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
    if (localStorage.getItem('cart')) {
      const storedCart = JSON.parse(localStorage.getItem('cart')); 
      if (storedCart) {
        setCartItems(storedCart);
      }
    }
  }, []);

  // Actualiza el carrito en LocalStorage 
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    dispatchTemp(addItem(storedCart.length))
  }, [cartItems]);

  const [typeMoney, setTypeMoney ] = useState('MXN');
  const [businessPersonalF3, setBusinessPersonalF3 ] = useState(0.83);

  const updateQuantity = (id, value) => {

    const filterNumPeople = peopleData.filter(i=> i.numPersonas === Number(value))
    let discountNumPeopleF2
    
    discountNumPeopleF2 =  filterNumPeople[0].descuentoPersonas;
    
    const itemIndex = cartItems.findIndex((item) => item._id === id);
    const updatedItems = [...cartItems];
    
    // Constants
    const priceMXN = updatedItems[itemIndex].precio;
    const priceUSD = updatedItems[itemIndex].precioUSD;

    let priceSelected
    typeMoney === 'MXN' ? priceSelected = priceMXN : priceSelected = priceUSD
    
    const discountPercent = updatedItems[itemIndex].descuento;
    const discountCourseF1 = (100 - discountPercent) / 100;
    const total = Math.floor(priceSelected * discountCourseF1 * discountNumPeopleF2 * businessPersonalF3 * value);
    const percent = 100 - (total * 100 / (priceSelected * value));
    
    updatedItems[itemIndex].cantidad = Number(value)
    updatedItems[itemIndex].total = total
    updatedItems[itemIndex].descuentoTotal = Math.floor(percent);
    setCartItems(updatedItems);
  }

  // 
  useEffect(() => {
    cartItems.map( item => {
      if(item.total === 0)
      cartItems.map( m => updateQuantity(m._id, m.cantidad))
    })
  }, [cartItems]);

  // Actualizar valores (Business and People / MXNN and USD)
  useEffect(() => {
    cartItems.map( m => updateQuantity(m._id, m.cantidad))
  }, [businessPersonalF3, typeMoney]);

  const [subtotal, setSubtotal] = useState(0)
  const [precioMasIVA, setPrecioMasIVA] = useState(0)
  const [discountTotalHoursNum, setDiscountTotalHoursNum] = useState(0)
  const [discountTotalHoursPercent, setDiscountTotalHoursPercent] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    localStorage.setItem('totalFinal', total);
  }, [total]);

  useEffect(() => {
    const hoursOfAllCourses = cartItems.reduce((sum, value) => (value.duracion ? sum + value.duracion : sum), 0)
    const descHoursOfAllCoursesF4 = hoursData.filter(h=> hoursOfAllCourses >= h.horasMin && hoursOfAllCourses <= h.horasMax)
    const subtotal = cartItems.reduce((sum, value) => (value.total ? sum + value.total : sum), 0)

    setSubtotal((subtotal).toFixed(2));
    setPrecioMasIVA((subtotal * 1.16).toFixed(2));
    setDiscountTotalHoursNum((precioMasIVA - (precioMasIVA * descHoursOfAllCoursesF4[0]?.descuentoHoras)));
    setTotal((precioMasIVA * descHoursOfAllCoursesF4[0]?.descuentoHoras * cuponDiscount).toFixed(2))
    setDiscountTotalHoursPercent( Math.round(discountTotalHoursNum * 100 / precioMasIVA) )


    localStorage.setItem('totalFinal', total)
  }, [cartItems, subtotal, businessPersonalF3, cuponDiscount, precioMasIVA, discountTotalHoursNum])

  const removeItem = (id) => {
    const filterToRemove = cartItems.filter(f => f._id !== id);
    setCartItems(filterToRemove);
  }

  const [loadingPay, setLoadingPay] = useState(false);

  const validateOrder = async (order) => {
    setLoadingPay(true);
    const data = {
      usuario_id: userData._id,
      total: localStorage.getItem('totalFinal'),
      producto: cartItems,
    }

    let idOrder
    await axios.post(`${API_BASE_URL}/orders`, data)
    .then((resp) => {
      const { data } = resp;
      idOrder = data.orders._id
    })
    .catch((err) => {
      throw new Error(err.response.data)
    });

    await axios.get(`${API_BASE_URL}/pays/payOrder/${order}?idOrder=${idOrder}&cupon=${localStorage.getItem('cuponId')}`)
    .then((resp) => {
      const { data } = resp;
      dispatchTemp(orderSuccess(data))
      router.push("/orders")
    })
    .catch((err) => {
      dispatchTemp(orderError(err.response.data.message))
      router.push("/orders")
    });
    setLoadingPay(false);
  }

  const showTotalPayPal = () => {
    return total
  }
  useEffect(() => {
    showTotalPayPal()
  }, [total])

  const [showResume, setShowResume] = useState(false)

  const [{ options }, dispatch] = usePayPalScriptReducer();
  const onCurrencyChange = () => {
    dispatch({
        type: "resetOptions",
        value: {
            ...options,
            currency: typeMoney,
        },
    });
  }

  useEffect(() => {
    onCurrencyChange()
  }, [typeMoney])
  
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
            <div className='max-w-7xl mx-auto container pb-40 text-blueConsufarma mt-3 md:mt-10'>
              <div className='flex'>
                <div className='text-sm md:text-base flex text-center'>
                  <label className={`cursor-pointer p-3 rounded-md ${businessPersonalF3 === 0.83 ? 'bg-blueConsufarma text-white' : 'text-blueConsufarma border-2 border-blueConsufarma'} `}>
                    <button type="button" name='precio' onClick={() => setBusinessPersonalF3(0.83)} /> 
                    <span className=''> Precio pago personal </span>
                  </label>

                  <label className={`cursor-pointer p-3 rounded-md ml-7 ${businessPersonalF3 === 1 ? 'bg-blueConsufarma text-white' : 'text-blueConsufarma border-2 border-blueConsufarma'}`}>
                    <button type="button" name='precio'  onClick={() => setBusinessPersonalF3(1)} className=''/>
                    <span className=''> Precio a empresa / </span> por participante
                  </label>

                  <label className={`ml-10 cursor-pointer p-3 rounded-md ${typeMoney === `MXN` ? 'bg-blueConsufarma text-white' : 'text-blueConsufarma border-2 border-blueConsufarma'}`}>
                    <button type="button" name="coin" onClick={() => setTypeMoney('MXN')} /> <span className='font-bold'> MXN </span>
                  </label>
                  <label className={`cursor-pointer p-4 rounded-md ml-5 ${typeMoney === `USD` ? 'bg-blueConsufarma text-white' : 'text-blueConsufarma border-2 border-blueConsufarma'}`}>
                    <button type="button" name="coin" className='' onClick={() => setTypeMoney('USD')} /> USD
                  </label>
                </div>
              </div>

              <h2 className='text-grayCustom font-bold md:mt-7 text-sm md:text-md p-2 text-center md:text-left'>A mayor número de asistentes y cursos, obtienes un mayor descuento</h2>
  
              <div className='flex text-sm md:text-md'>
                <div className='flex-1'>

                  <div className='bg-blueConsufarma p-2 px-0 md:px-2 md:p-3 text-white rounded-md mr-5 mt-1 hidden md:block'>
                    <div className='flex px-2 text-center font-bold text-lg'>
                      <div className='w-3/12'>
                        Curso
                      </div>
                      <div className='w-3/12'>
                        Precio
                      </div>
                      <div className='w-1/12'>
                        {/* <span>Asistentes</span> */}
                        <span>Num</span>
                      </div>
                      <div className='w-2/12'>
                        Descuento
                      </div>
                      <div className='w-2/12'>
                        Total
                      </div>
                      <div className='w-1/12 text-right'>
                        
                      </div>
                    </div>
                  </div>
  
                  {cartItems.length && cartItems.map( i => (
                    <>
                      
                      {/* INFO CART FOR MOBILE */}
                      <div className='flex md:hidden px-2 ml-0 text-center my-5 border-b-2 border-gray-300 pb-5 mr-0' key={i._id}>
                        <div className='w-5/12'>
                          <img src={i.imagen} />
                          <div className='mt-2'>{i.nombre}</div>
                          <div className='font-thin'>{i.fecha_text}</div>
                          <div>{`${i.duracion}h (${i.horario})`}</div>
                        </div>
                        <div className='w-6/12 font-bold text-md flex items-center justify-center text-left'>
                          <div>
                            <div>
                              Precio: ${typeMoney === 'MXN' ? Thousands(i.precio) : i.precioUSD}
                            </div>
                            <div className='flex items-center my-2'>
                              <div className='mr-2'>Cantidad:</div>
                              <select className='bg-blueConsufarma p-1 rounded-md text-white text-md' name="select" value={i.cantidad} onChange={(e) => updateQuantity(i._id, e.target.value)}>
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
                            </div>
                            <div className='font-bold text-base text-blueLightCustom'>
                              Descuento: {i.descuentoTotal}%
                            </div>
                            <div className='font-bold text-base mt-2'>
                              Total: ${Thousands(i.total)}
                            </div>
                          </div>

                        </div>
                        <div className='w-1/12 font-bold text-md flex items-center'>
                          <div className='cursor-pointer text-lg' onClick={() => removeItem(i._id)}>
                            <IoTrashOutline />
                          </div>
                        </div>
                      </div>

                      {/* INFO CART FOR DESKTOP */}
                      <div className='hidden md:flex px-0 md:px-2 ml-0 text-center my-5 border-b-2 border-gray-300 pb-5 mr-0 md:mr-5 items-center' key={i._id}>
                        <div className='w-3/12'>
                          <img src={i.imagen} />
                          <div className='mt-2'>{i.nombre}</div>
                          <div className='font-thin'>{i.fecha_text}</div>
                          <div>{`${i.duracion}h (${i.horario})`}</div>
                        </div>
                        <div className='w-3/12 font-bold text-md md:text-2xl'>
                          ${typeMoney === 'MXN' ? Thousands(i.precio) : i.precioUSD}
                        </div>
                        <div className='w-1/12'>
                          <select className='bg-blueConsufarma p:0 md:p-1 rounded-md text-white text-md md:text-2xl' name="select" value={i.cantidad} onChange={(e) => updateQuantity(i._id, e.target.value)}>
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
                        <div className='w-2/12 font-bold text-md md:text-2xl'>
                        {i.descuentoTotal}%
                        </div>
                        <div className='w-2/12 font-bold text-md md:text-2xl'>
                          ${Thousands(i.total)}
                        </div>
                        <div className='w-1/12 font-bold text-md md:text-2xl'>
                          <div className='cursor-pointer w-2/12 m-auto' onClick={() => removeItem(i._id)}>
                            <IoTrashOutline />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>

                <div className='bg-redConsufarma p-2 rounded-t-lg fixed w-full bottom-0 shadow-sm z-20 block md:hidden' onClick={() => setShowResume(!showResume)}>
                  <div className='font-bold text-lg ml-2 text-center text-white'>Pagar</div>
                </div>

                { showResume && (
                  <div className='bg-gray-100 p-1 rounded-t-lg absolute w-full z-10 overflow-y-scroll bottom-10 h-[390px] shadow-lg'>

                    <div className='font-bold text-lg ml-2'>Subtotal:</div>
                    <div className='font-normal ml-2 mb-2'>${Thousands(subtotal)}</div>
                    
                    <div className='font-bold text-lg ml-2'>Precio más Impuestos:</div>
                    <div className='font-normal ml-2 mb-2'>${Thousands(precioMasIVA)}</div>
    
                    <div className='font-bold text-lg ml-2'>Descuento × No. total de horas solicitadas:</div>
                    <div className='font-normal ml-2 mb-2'>Ahorraste un ${discountTotalHoursPercent}%</div>
    
                    <div className='font-bold text-lg ml-2'>Cupón de descuento</div>
                    <input type="text" className='p-2 bg-gray-300 rounded-md' value={cuponText} onChange={handleChangeCuponText}/>
                    <button type="button" className='bg-blueConsufarma text-white p-2 rounded-md ml-1' onClick={canjearCupon}>Canjear</button>
    
                    {haveCupon === 'noValido' && (
                      <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>Cupon no válido</div>
                    )}
                    {haveCupon === 'error' && (
                      <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>El cupón tiene error </div>
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
                            purchase_units: [{
                              amount: {
                                value: localStorage.getItem('totalFinal'),
                              }
                            }]
                          })
                        }}
                        onApprove={ async (data, actions) => {
                          const order = await actions.order.capture()
                          validateOrder(order.id)
                        }}
                      />
                    )}
                  </div>
                )}
  

                <div className='bg-gray-100 p-2 rounded-md hidden md:block'>
                  <div className='font-bold text-2xl ml-2 mb-3'>Resumen</div>
                  
                  <div className='font-bold text-xl ml-2'>Subtotal:</div>
                  <div className='font-normal ml-2 mb-3'>${Thousands(subtotal)}</div>
                  
                  <div className='font-bold text-xl ml-2'>Precio más Impuestos:</div>
                  <div className='font-normal ml-2 mb-3'>${Thousands(precioMasIVA)}</div>
  
                  <div className='font-bold text-xl ml-2'>Descuento × No. total de horas solicitadas:</div>
                  <div className='font-normal ml-2 mb-3'>Ahorraste un ${discountTotalHoursPercent}%</div>
  
                  <div className='font-bold text-xl ml-2 mb-2'>Cupón de descuento</div>
                  
                  <input type="text" className='p-2 bg-gray-300 rounded-md' value={cuponText} onChange={handleChangeCuponText}/>
                  <button type="button" className='bg-blueConsufarma text-white p-2 rounded-md ml-1' onClick={canjearCupon}>Canjear</button>
  
                  {haveCupon === 'noValido' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>Cupon no válido</div>
                  )}
                  {haveCupon === 'error' && (
                    <div className='font-bold text-xs ml-2 mt-2 text-red-600 mb-3'>El cupón tiene error </div>
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
                          purchase_units: [{
                            amount: {
                              value: localStorage.getItem('totalFinal'),
                            }
                          }]
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
              <img src={"/../../../cart.jpg"} width={300} alt='vacio...' className='m-auto'  />
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
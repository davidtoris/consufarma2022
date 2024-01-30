import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import 'react-quill/dist/quill.snow.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const MyApp = ({ Component, pageProps }) => {

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "MXN",
    intent: "capture",
};

  return (
    <Provider store={store}>
      <PayPalScriptProvider options= { initialOptions }>
        <div lang="es" className='font-sans'>
        <Component {...pageProps} />
        </div>
      </PayPalScriptProvider>
    </Provider>
  )
}

export default MyApp

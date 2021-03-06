import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import 'react-quill/dist/quill.snow.css';

const MyApp = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>
      <div lang="es" className='font-sans'>
      <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp

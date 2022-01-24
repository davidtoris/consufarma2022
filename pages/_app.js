import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';

const MyApp = ({ Component, pageProps }) => {

  return (
    <Provider store={store}>
      <div lang="es">
      <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp

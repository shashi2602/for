import SimplyContext from '../context/SimplyContext'
import '../styles/globals.css'
import store from '../store/userStore'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <SimplyContext>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      <Toaster position="top-right"/>
      {/* </Provider> */}
    </SimplyContext>
  )
  
}

export default MyApp

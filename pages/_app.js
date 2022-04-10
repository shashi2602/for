import SimplyContext from '../context/SimplyContext'
import '../styles/globals.css'
import store from '../store/userStore'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
  return (
    <SimplyContext>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </SimplyContext>
  )
  
}

export default MyApp

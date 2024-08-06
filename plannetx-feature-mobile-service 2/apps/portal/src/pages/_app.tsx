import { setConfiguration } from 'react-grid-system'
import StyledComponentsRegistry from '../lib/registry'

import 'rc-tooltip/assets/bootstrap.css'
import 'react-datepicker/dist/react-datepicker.css'

import '../styles/sweetalert.css'

import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../store'

setConfiguration({ gutterWidth: 10 })

const WrappedApp = ({
  Component,
  pageProps
}: {
  Component: any
  pageProps: object
}) => (
  <>
    <Head>
      <title>Whalepay</title>
    </Head>
    <style jsx global>
      {`
        html {
          height: 100%;
        }
        body {
          margin: 0px;
          height: 100%;
          font-family: 'Kanit', sans-serif;
          color: #3b5475;
          background-color: #f3f8fe;
        }
        body > #__next,
        body > #__next > .container {
          height: 100%;
        }
        button,
        input,
        select,
        textarea {
          font-family: 'Kanit', sans-serif;
        }
      `}
    </style>
    <Provider store={store}>
      <StyledComponentsRegistry>
        <Component {...pageProps} />
      </StyledComponentsRegistry>
    </Provider>
  </>
)

export default WrappedApp

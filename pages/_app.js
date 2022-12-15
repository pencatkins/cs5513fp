import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "../components/layout";
import {useEffect} from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[]);

  return( 
    <>
    <Layout />
    <Component {...pageProps} />
    </>
  )

}

export default MyApp;

//installed bootstrap per reference: https://dev.to/anuraggharat/adding-bootstrap-to-nextjs-39b2

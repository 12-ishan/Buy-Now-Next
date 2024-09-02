'use client'

import React from 'react';
import Header from '../components/layout/Header';
import Head from 'next/head';
import Script from 'next/script';
import Footer from '@/components/layout/Footer';
import { Provider } from 'react-redux'; 
import ReactDOM from 'react-dom';
import store from '../redux/store';
import { useSelector } from 'react-redux'; 



export default function RootLayout({ children }) {

 
  return (
   
    <Provider store={store}>
      <html lang="en">
       <Head>
       <meta name="csrf-token" content="{{ csrf_token() }}"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mukta:300,400,700" />
          <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        </Head>
     
        <body>
        <div className="site-wrap">
      
        <HeaderWithStore />
          <main>
            {children} 
          </main>
          <Footer/>
          </div>
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive"></Script>
            {/* <Script src="../../../assets/js/jquery-3.3.1.min.js"></Script>
            <Script src="../../../assets/js/jquery-ui.js"></Script> */}
            {/* <Script src="../../../assets/js/popper.min.js"></Script>
            <Script src="../../../assets/js/bootstrap.min.js"></Script>
            <Script src="../../../assets/js/owl.carousel.min.js"></Script> */}
            {/* <Script src="../../../assets/js/jquery.magnific-popup.min.js"></Script> */}
            {/* <Script src="../../../assets/js/aos.js"></Script>
            <Script src="../../../assets/js/main.js"></Script> */}
            
        </body>
      </html>
      </Provider>
  );
}

function HeaderWithStore() {
  const token = useSelector((state) => state.auth.token);
  const loggedCartData = useSelector((state) => state.loggedInCart.cart) || [];
  const getGuestCustomer = useSelector((state) => state.cart.cartItems);
  const cartData = token ? loggedCartData : getGuestCustomer;

  return <Header cartData={cartData} />;
}

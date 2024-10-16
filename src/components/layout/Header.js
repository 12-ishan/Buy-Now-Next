'use client';
import Link from 'next/link';
import '../../../styles/css/style.css';
import '../../../styles/css/bootstrap/bootstrap-grid.css';
import '../../../styles/css/bootstrap/bootstrap-reboot.css';
import '../../../styles/css/aos.css';
import '../../../styles/css/bootstrap.min.css';
import '../../../styles/css/magnific-popup.css';
import '../../../styles/css/owl.theme.default.min.css';
import '../../../styles/scss/style.scss';
import '../../../styles/scss/bootstrap/bootstrap.scss';
import '../../../public/assets/fonts/icomoon/style.css';
import '../../../styles/css/owl.carousel.min.css';
import ProductCategories from '../ProductCategories';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchCartItems } from '@/redux/slice/loggedInCartSlice';
import { useRouter } from 'next/navigation'
import { websiteLogo } from '@/redux/slice/generalSettingsSlice';
import Image from 'next/image';



function Header({ cartData = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const logo = useSelector((state) => state.generalSettings.websiteLogo);
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);

  const totalItems = cartData.length;
  const manageCount = useSelector((state) => state.loggedInCart.manageCartCount);

  useEffect(() => {
      dispatch(websiteLogo());
  }, []);
 
  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems(token));
    }
  }, [token, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center">

          <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
          <form onSubmit={handleSearch} className="site-block-top-search d-flex align-items-center">
            <span className="icon icon-search2"></span>
            <input  type="text" 
                  className="form-control border-0 mx-2" 
                  placeholder="Search"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="btn btn-outline-secondary">Search</button>

          </form>
        </div>


            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
              <div className="">
                <Link href="/" className="js-logo-clone "> <Image
                    className="img-fluid"
                    src={logo.image}
                    alt="logo"
                    width={100} 
                    height={100} 
                /></Link>
              </div>
            </div>


            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="site-top-icons">
                <ul>
                  <li><Link href={localStorage.getItem('token') ? '/my-profile' : '/my-account'}><span className="icon icon-person"></span></Link></li>
                  <li><Link href='/wishlist' ><span className="icon icon-heart-o"></span></Link></li>
                  <li>
                    <Link href='/cart' className="site-cart">
                      <span className="icon icon-shopping_cart"></span>
                      <span className="count">{localStorage.getItem('token') ?  manageCount: totalItems}</span>
                    </Link>
                  </li> 
                  <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu"></span></a></li>
                </ul>
              </div> 
            </div>

          </div>
        </div>
      </div> 
      <nav className="site-navigation text-right text-md-center" role="navigation">
        <div className="container">
          <ul className="site-menu js-clone-nav d-none d-md-block">
            <li >
              <Link href='/'>Home</Link>
              {/* <ul className="dropdown">
                <li><a href="#">Menu One</a></li>
                <li><a href="#">Menu Two</a></li>
                <li><a href="#">Menu Three</a></li>
                <li className="has-children">
                  <a href="#">Sub Menu</a>
                  <ul className="dropdown">
                    <li><a href="#">Menu One</a></li>
                    <li><a href="#">Menu Two</a></li>
                    <li><a href="#">Menu Three</a></li>
                  </ul>
                </li>
              </ul> */}
            </li>
            {/* <li >
              <Link href='/about'>About</Link>
              <ul className="dropdown">
                <li><a href="#">Menu One</a></li>
                <li><a href="#">Menu Two</a></li>
                <li><a href="#">Menu Three</a></li>
              </ul>
            </li> */}
            <ProductCategories /> 
            {/* <li><Link href='/customer-service'>Customer Service</Link></li> */}
            {/* <li><Link href='/sale'>Sale</Link></li> */}
            <li><Link href='/contact'>Contact</Link></li>
            <li><Link href={localStorage.getItem('token') ? '/my-profile' : '/my-account'}>{localStorage.getItem('token') ? 'My Profile' : 'Login'}</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
import React from 'react';
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


function Header() {
  return (
    <header className="site-navbar" role="banner">
      <div className="site-navbar-top">
        <div className="container">
          <div className="row align-items-center">

          <div className="col-12 mb-3 mb-md-0 col-md-4 order-md-1 order-md-2 ">
              <div className="site-logo">
                <a href="index.html" className="js-logo-clone">Shoppers</a>
              </div>
          </div>

            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 ">
              <form action="" className="site-block-top-search">
                <span className="icon icon-search2"></span>
                <input type="text" className="form-control border-0" placeholder="Search"/>
              </form>
            </div>


            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
              <div className="site-top-icons">
                <ul>
                  <li><Link href='/my-account'><span className="icon icon-person"></span></Link></li>
                  <li><a href="#"><span className="icon icon-heart-o"></span></a></li>
                  <li>
                    <Link href='/cart' className="site-cart">
                      <span className="icon icon-shopping_cart"></span>
                      <span className="count">2</span>
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
            <li className="has-children">
              <Link href='/'>Home</Link>
              <ul className="dropdown">
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
              </ul>
            </li>
            <li className="has-children active">
              <Link href='/about'>About</Link>
              <ul className="dropdown">
                <li><a href="#">Menu One</a></li>
                <li><a href="#">Menu Two</a></li>
                <li><a href="#">Menu Three</a></li>
              </ul>
            </li>
            <ProductCategories /> 
            <li><Link href='/customer-service'>Customer Service</Link></li>
            <li><Link href='/sale'>Sale</Link></li>
            <li><Link href='/contact'>Contact</Link></li>
            <li><Link href='/my-profile'>My Profile</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
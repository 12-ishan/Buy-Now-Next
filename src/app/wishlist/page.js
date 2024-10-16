'use client'
import React from 'react'
import Breadcrumb from '@/components/layout/breadcrumb'
import ProductsInCart from '@/components/ProductsInCart';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CouponForm from '@/components/CouponForm';
import ProductsInWishList from '@/components/ProductsInWishList';

// export const metadata = {
//   title: 'Cart',
// };

function Cart() {

  const token = useSelector((state) => state.auth.token);

  return (
    <>
    <Breadcrumb pageName="Wish List"/>
    <div className="site-section">
      <div className="container">
       <ProductsInWishList/>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              {/* <div className="col-md-6 mb-3 mb-md-0">
                <button className="btn btn-primary btn-sm btn-block">Update Cart</button>
              </div> */}
              <div className="col-md-6">
                <button className="btn btn-outline-primary btn-sm btn-block"><Link href="/">Continue Shopping</Link></button>
              </div>
            </div>
        
            {/* <div className="row">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">Coupon</label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div className="col-md-8 mb-3 mb-md-0">
                <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code"/>
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary btn-sm">Apply Coupon</button>
              </div>
            </div> */}
          </div>
         
        </div>
      </div>
    </div>
    </>
  )
}

export default Cart
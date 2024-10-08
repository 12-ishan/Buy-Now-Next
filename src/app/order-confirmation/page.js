import React from 'react'
import Link from 'next/link';
import Breadcrumb from '@/components/layout/breadcrumb'

function page() {
  return (
    <>
    <Breadcrumb pageName="Order Confirmation"/>
    <div className="site-section">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <span className="icon-check_circle display-3 text-success"></span>
          <h2 className="display-3 text-black">Thank you!</h2>
          <p className="lead mb-5">You order was successfuly completed.</p>
          <p><Link href="/" className="btn btn-sm btn-primary">Back to shop</Link></p>
        </div>
      </div>
    </div>
  </div>
  </>

  )
}

export default page
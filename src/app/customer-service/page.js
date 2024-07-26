import React from 'react';
import Breadcrumb from '@/components/layout/breadcrumb'

function Service() {
  return (
    <>
     <Breadcrumb pageName="Customer Service"/>
    <div className="site-section site-section-sm site-blocks-1">
      <div className="container">
        <div className="row">
          {/* First Card */}
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="">
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="100">
              <div className="icon mr-4 align-self-start">
                <span className="icon-refresh2"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Free Returns</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="200">
              <div className="icon mr-4 align-self-start">
                <span className="icon-help"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Customer Support</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Fourth Card (Wrap to New Row) */}
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="300">
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="300">
              <div className="icon mr-4 align-self-start">
                <span className="icon-truck"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border p-3" data-aos="fade-up" data-aos-delay="200">
              <div className="icon mr-4 align-self-start">
                <span className="icon-help"></span>
              </div>
              <div className="text">
                <h2 className="text-uppercase">Customer Support</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Service;

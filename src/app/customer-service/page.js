import React from 'react';
import Breadcrumb from '@/components/layout/breadcrumb'

function Service() {
  return (
    <>
     <Breadcrumb pageName="Customer Service"/>
    <div class="site-section site-section-sm site-blocks-1">
      <div class="container">
        <div class="row">
          {/* First Card */}
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-truck"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-refresh2"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Free Returns</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-help"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Customer Support</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>

          {/* Fourth Card (Wrap to New Row) */}
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-truck"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-truck"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Free Shipping</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card border p-3" >
              <div class="icon mr-4 align-self-start">
                <span class="icon-help"></span>
              </div>
              <div class="text">
                <h2 class="text-uppercase">Customer Support</h2>
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

import React from 'react'
import Breadcrumb from '@/components/layout/breadcrumb'

function About() {
  return (
    <>
   <Breadcrumb pageName="About"/>
    <div className="site-section border-bottom" >
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="block-16">
              <figure>
                <img src="../../../assets/images/blog_1.jpg" alt="Image placeholder" className="img-fluid rounded"/>
                <a href="https://vimeo.com/channels/staffpicks/93951774" className="play-button popup-vimeo"><span className="ion-md-play"></span></a>

              </figure>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            
            
            <div className="site-section-heading pt-3 mb-4">
              <h2 className="text-black">How We Started</h2>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius repellat, dicta at laboriosam, nemo exercitationem itaque eveniet architecto cumque, deleniti commodi molestias repellendus quos sequi hic fugiat asperiores illum. Atque, in, fuga excepturi corrupti error corporis aliquam unde nostrum quas.</p>
            <p>Accusantium dolor ratione maiores est deleniti nihil? Dignissimos est, sunt nulla illum autem in, quibusdam cumque recusandae, laudantium minima repellendus.</p>
            
          </div>
        </div>
      </div>
    </div>

    <div className="site-section border-bottom" >
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 site-section-heading text-center pt-4">
            <h2>The Team</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
  
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="../../../assets/images/person_1.jpg" alt="Image placeholder" className="mb-4"/>
                  <h3 className="block-38-heading h4">Elizabeth Graham</h3>
                  <p className="block-38-subheading">CEO/Co-Founder</p>
                </div>
                <div className="block-38-body">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="../../../assets/images/person_2.jpg" alt="Image placeholder" className="mb-4"/>
                  <h3 className="block-38-heading h4">Jennifer Greive</h3>
                  <p className="block-38-subheading">Co-Founder</p>
                </div>
                <div className="block-38-body">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="../../../assets/images/person_3.jpg" alt="Image placeholder" className="mb-4"/>
                  <h3 className="block-38-heading h4">Patrick Marx</h3>
                  <p className="block-38-subheading">Marketing</p>
                </div>
                <div className="block-38-body">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="block-38 text-center">
              <div className="block-38-img">
                <div className="block-38-header">
                  <img src="../../../assets/images/person_4.jpg" alt="Image placeholder" className="mb-4"/>
                  <h3 className="block-38-heading h4">Mike Coolbert</h3>
                  <p className="block-38-subheading">Sales Manager</p>
                </div>
                <div className="block-38-body">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aut minima nihil sit distinctio recusandae doloribus ut fugit officia voluptate soluta. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    <div className="site-section site-section-sm site-blocks-1 border-0" >
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"  >
            <div className="icon mr-4 align-self-start">
              <span className="icon-truck"></span>
            </div>
            <div className="text">
              <h2 className="text-uppercase">Free Shipping</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" >
            <div className="icon mr-4 align-self-start">
              <span className="icon-refresh2"></span>
            </div>
            <div className="text">
              <h2 className="text-uppercase">Free Returns</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4"  >
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
    </>
  )
}

export default About
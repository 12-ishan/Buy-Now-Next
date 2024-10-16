
'use client'
import React from 'react';
import Breadcrumb from '@/components/layout/breadcrumb';
import ProductCard from '@/components/ProductCard'
import ProductFilter from '@/components/ProductFilter';
//import ProductCategories from '@/components/ProductCategories';
import { useSelector } from 'react-redux';
import FilteredProductsCards from '@/components/FilteredProductsCards';
import { useState, useEffect } from 'react';

// export const metadata = {
//   title: 'Products',
// };

const Products = ({ params }) => {
  const { slug } = params;
  const filteredProducts = useSelector((state) => state.filterProducts.filteredproducts) || [];
  const products = useSelector((state) => state.products.products);
  console.log(products);

  const [renderComponent, setRenderComponent] = useState(null);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      setRenderComponent(<FilteredProductsCards filteredProducts={filteredProducts} />);
    } else {
      setRenderComponent(<ProductCard slug={slug} />);
    }
  }, [filteredProducts, slug]);
  
  
 
  return (
    <>
      <Breadcrumb pageName= {slug} />
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="float-md-left mb-4">
                    <h2 className="text-black h5">Shop All</h2>
                  </div>
                  <div className="d-flex">
                    <div className="dropdown mr-1 ml-md-auto">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        id="dropdownMenuOffset"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Latest
                      </button>
                    
                      {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                        <a className="dropdown-item" href="#">Men</a>
                        <a className="dropdown-item" href="#">Women</a>
                        <a className="dropdown-item" href="#">Children</a>
                      </div> */}
                    </div>
                    <div className="btn-group">
                      {/* <button
                        type="button"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                        id="dropdownMenuReference"
                        data-toggle="dropdown"
                      >
                        Reference
                      </button> */}
                      {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                        <a className="dropdown-item" href="#">Relevance</a>
                        <a className="dropdown-item" href="#">Name, A to Z</a>
                        <a className="dropdown-item" href="#">Name, Z to A</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Price, low to high</a>
                        <a className="dropdown-item" href="#">Price, high to low</a>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* {products.length > 0 ? (
                <FilteredProductsCards products={products} />
              ) : (
                <ProductCard slug={slug} />
              )} */}

            {renderComponent}

            </div>

            <div className="col-md-3 order-1 mb-5 mb-md-0">
              {/* <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                <ul className="list-unstyled mb-0">
                  <li className="mb-1"><a href="#" className="d-flex"><span>Men</span> <span className="text-black ml-auto">(2,220)</span></a></li>
                  <li className="mb-1"><a href="#" className="d-flex"><span>Women</span> <span className="text-black ml-auto">(2,550)</span></a></li>
                  <li className="mb-1"><a href="#" className="d-flex"><span>Children</span> <span className="text-black ml-auto">(2,124)</span></a></li>
                </ul>
              </div> */}

             <ProductFilter slug={slug}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


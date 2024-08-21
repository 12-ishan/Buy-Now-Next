'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../redux/slice/productsSlice';
import Loader from './layout/Loader'; 
import Image from 'next/image';

const ProductCard = ({ slug }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const categorySlug = useSelector((state) => state.products.categorySlug);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductsByCategory(slug));
    }
  }, [slug, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(products)) {
    return <p>No products available.</p>;
  }

  return (
    <div className="row mb-5">
      {status === 'succeeded' && (
        products.length > 0 ? (
          products.map((data) => (
            <div key={data.id} className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
              <div className="block-4 text-center border">
                <figure className="block-4-image">
                  <a href={`/${categorySlug}/${data.slug}`}>
                  <Image
                    className="img-fluid"
                    src={data.media_name}
                    alt={data.name}
                    width={300} 
                    height={300} 
                />
                  </a>
                </figure>
                <div className="block-4-text p-4">
                  <h3><a href={`/${categorySlug}/${data.slug}`}>{data.name}</a></h3>
                  {/* <p className="mb-0">{data.description || "Finding perfect t-shirt"}</p> */}
                  <p className="text-primary font-weight-bold">{data.price || "50"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )
      )}
      
    </div>
  );
};

export default ProductCard;

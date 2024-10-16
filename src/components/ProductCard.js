'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, resetProducts } from '../redux/slice/productsSlice';
import Loader from './layout/Loader'; 
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ slug }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categorySlug = useSelector((state) => state.products.categorySlug);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const currentPage = useSelector((state) => state.products.currentPage);
  const lastPage = useSelector((state) => state.products.lastPage);
  const [loadingMore, setLoadingMore] = useState(false); 

  useEffect(() => {
   
    dispatch(resetProducts());
    dispatch(fetchProductsByCategory({ slug, page: 1 }));
  }, [slug, dispatch]);

  useEffect(() => {
   
    const handleScroll = () => {
     
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && currentPage < lastPage && !loadingMore) {
       
        setLoadingMore(true);
       
        dispatch(fetchProductsByCategory({ slug, page: currentPage + 1 }))
          .then(() => {
            setLoadingMore(false); 
          });
      }
    };


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, lastPage, dispatch, slug, loadingMore]);

  if (status === 'loading' && !loadingMore) {
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
            <div key={data.id} className="col-sm-6 col-lg-4 mb-4">
              <div className="block-4 text-center border">
                <figure className="block-4-image">
                  <Link href={`/product/${categorySlug}/${data.slug}`}>
                    <Image
                      className="img-fluid"
                      src={data.media_name}
                      alt={data.name}
                      width={300} 
                      height={300} 
                    />
                  </Link>
                </figure>
                <div className="block-4-text p-4">
                  <h3><Link href={`/product/${categorySlug}/${data.slug}`}>{data.name}</Link></h3>
                  <p className="text-primary font-weight-bold">&#8377;{data.price || "50"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )
      )}
     
      {loadingMore && <Loader />}
    </div>
  );
};

export default ProductCard;

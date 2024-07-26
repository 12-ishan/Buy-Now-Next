'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductCategories } from '../redux/slice/productCategoriesSlice';
import Link from 'next/link';

const ProductCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productCategory.categories);
  const status = useSelector((state) => state.productCategory.status);
  const error = useSelector((state) => state.productCategory.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductCategories());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === 'succeeded' && (
        <>
          {categories.map((category) => (
            <li className="active" key={category.slug}>
              <Link href={`/product/${category.slug}`}>
                {category.name}
              </Link>
              {/* <ul className="dropdown">
                <li><a href="#">Menu One</a></li>
                <li><a href="#">Menu Two</a></li>
                <li><a href="#">Menu Three</a></li>
              </ul> */}
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default ProductCategories;

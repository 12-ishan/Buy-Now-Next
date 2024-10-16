import React from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';

function FilteredProductsCards({filteredProducts}) {
    console.log(filteredProducts);
    const status = useSelector((state) => state.filterProducts.status);
    const categorySlug = useSelector((state) => state.filterProducts.categorySlug);

  return (
    <div className="row mb-5">
    {status === 'succeeded' && (
      filteredProducts.length > 0 ? (
        filteredProducts.map((data) => (
          <div key={data.id} className="col-sm-6 col-lg-4 mb-4" >
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
                {/* <p className="mb-0">{data.description || "Finding perfect t-shirt"}</p> */}
                <p className="text-primary font-weight-bold">&#8377;{data.price || "50"}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )
    )}
    
  </div>
  )
}

export default FilteredProductsCards
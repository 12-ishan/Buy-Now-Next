'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/redux/slice/productDetailSlice';
import Loader from '@/components/layout/Loader';

const ProductPage = ({ params }) => {
  const { slug } = params;
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail.singleProduct);
  const productVariation = useSelector((state) => state.productDetail.productVariation);
  console.log(productVariation);
  const attributes = useSelector((state) => state.productDetail.attributes);
  const maxPrice = useSelector((state) => state.productDetail.maxPrice);
  const status = useSelector((state) => state.productDetail.status);
  const error = useSelector((state) => state.productDetail.error);

  const [selectedPrice, setSelectedPrice] = useState(productDetail.price);
  console.log(selectedPrice);
  const [isPriceSelected, setIsPriceSelected] = useState(false);
  console.log(isPriceSelected)

  const AttributeSelectHandler = (attributeName, optionId) => {
    console.log('Attribute:', attributeName);
    console.log('option:', optionId);
    const filteredVariations = productVariation.filter(variation =>
        variation.attribute.some(
            attr => attr.attribute_name === attributeName && attr.option_id === optionId
        )
    );

    console.log(filteredVariations);

    if (filteredVariations.length > 0) {
        const selectedVariation = filteredVariations[0];
        setSelectedPrice(selectedVariation.price);
        setIsPriceSelected(true);
    }
};

  useEffect(() => {
    dispatch(fetchProductDetails(slug));
  }, [slug, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {productDetail.image && (
              <img src={productDetail.image} alt={productDetail.slug} className="img-fluid" />
            )}
          </div>
          <div className="col-md-6">
            <h2 className="text-black">{productDetail.name}</h2>
            <p className="mb-4">{productDetail.description}</p>
            <p>
              <strong className="text-primary h4">
                {productDetail.type === 1
                  ? (isPriceSelected ? selectedPrice : `${productDetail.price} - ${maxPrice}`)
                  : productDetail.price}
              </strong>
            </p>
            <div className="mb-1 row">
              {productDetail.type === 1 && attributes && attributes.length > 0 ? (
                attributes.map((attribute) => (
                  <div key={attribute.attribute_id} className="d-flex flex-column mr-3">
                    <span id={attribute.attribute_id} className="d-inline-block text-black font-weight-bold mb-2">
                      {attribute.attribute_name}
                    </span>
                    <div className="mb-1 d-flex">
                      {attribute.options && attribute.options.length > 0 ? (
                        attribute.options.map((option) => (
                          <label key={option.option_id} htmlFor={option.option_id} className="d-flex mr-3 mb-3">
                            <span className="d-inline-block mr-2" style={{ position: 'relative' }}>
                            <input type="radio" id={`id-${option.option_id}`} name={`attribute-${attribute.attribute_name}`}  onChange={() => AttributeSelectHandler(attribute.attribute_name, option.option_id)}/>
                              {/* <input
                                type="radio"
                                id={option.option_id}
                                onChange={() => AttributeSelectHandler(option.option_id)}
                              /> */}
                            </span>
                            <span className="d-inline-block text-black">{option.option_value}</span>
                          </label>
                        ))
                      ) : (
                        <p>No options available</p>
                      )}
                    </div>
                  </div>
                ))
              ) : null}
            </div>
            <div className="mb-5">
              <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                <div className="input-group-prepend">
                  <button className="btn btn-outline-primary js-btn-minus" type="button">
                    &minus;
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control text-center"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary js-btn-plus" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
            <p>
              <a href="cart.html" className="buy-now btn btn-sm btn-primary">
                Add To Cart
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

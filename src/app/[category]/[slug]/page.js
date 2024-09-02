'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/redux/slice/productDetailSlice';
import Loader from '@/components/layout/Loader';
import {storeInCart} from '@/redux/slice/cartSlice';
import { addToCartLoggedIn } from '@/redux/slice/loggedInCartSlice';


const ProductPage = ({ params }) => {
  const { category, slug } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails({ category, slug }));
  }, [dispatch, category, slug]);

  const productDetail = useSelector((state) => state.productDetail.singleProduct);
  const productVariation = useSelector((state) => state.productDetail.productVariation);
  const attributes = useSelector((state) => state.productDetail.attributes);
  const maxPrice = useSelector((state) => state.productDetail.maxPrice);
  const status = useSelector((state) => state.productDetail.status);
  const error = useSelector((state) => state.productDetail.error);

  const token = useSelector((state) => state.auth.token);
  

  const [selectedOption, setSelectedOption] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isPriceSelected, setIsPriceSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productVariation && productVariation.length > 0) {
      const initialSelections = {};
      const firstVariation = productVariation[0].attribute;

      firstVariation.forEach(attr => {
        initialSelections[attr.attribute_id] = attr.option_id;
      });

      setSelectedOption(initialSelections);
      setSelectedPrice(productVariation[0].price);
      setIsPriceSelected(true);
    }
  }, [productVariation]);

  const AttributeSelectHandler = (attributeId, optionId) => {
    const updatedSelections = {
      ...selectedOption,
      [attributeId]: optionId
    };

    setSelectedOption(updatedSelections);

    const matchedVariation = productVariation.find(variation =>
      variation.attribute.every(attr => updatedSelections[attr.attribute_id] === attr.option_id)
    );

    if (matchedVariation) {
      setSelectedPrice(matchedVariation.price);
      setIsPriceSelected(true);
    } else {
      setSelectedPrice(null);
      setIsPriceSelected(false);
    }
  };


  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    console.log(newQuantity);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  // const handleAddToCart = () => {
  //   AddToCartHandler(productDetail, quantity);
  //   router.push('/cart');
  // };
  
  const AddToCartHandler = (productDetail, quantity) => {
   // console.log(quantity);

  if (token) {
    dispatch(
      addToCartLoggedIn({
        product_id: productDetail.id,
        quantity,
        token: token, 
      })
    );
  } else {
    dispatch(storeInCart({ productDetail, quantity }));
  }
  };

  return (
    <div className="site-section">
      <div className="container">
        {status == 'loading' && <Loader/>}
        {status === 'succeeded' && productDetail && (
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
                              <input
                                type="radio"
                                id={`id-${option.option_id}`}
                                name={`attribute-${attribute.attribute_name}`}
                                checked={selectedOption[attribute.attribute_id] === option.option_id}
                                onChange={() => AttributeSelectHandler(attribute.attribute_id, option.option_id)}
                              />
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
                  <button className="btn btn-outline-primary js-btn-minus" type="button" onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}>
                    &minus;
                  </button>
                </div>
                <input
                  //type="number"  
                  className="form-control text-center"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value={quantity}
                  onChange={(e) => {
                   // debugger;
                   // console.log('Input changed:', e.target.value);
                    handleQuantityChange(e)}}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary js-btn-plus" type="button" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <p>
            <a className="buy-now btn btn-sm btn-primary" onClick={() => AddToCartHandler(productDetail, quantity)}>
                Add To Cart
              </a>
              {/* <a className="buy-now btn btn-sm btn-primary" onClick={handleAddToCart}>
                Add To Cart
              </a> */}
            </p>
          </div>
        </div>
         )} 
         {status === 'failed' && <p>{error.message}</p>} 
      </div>
              
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, removeFromCart, addToCartLoggedIn, subtractItemFromCart } from '@/redux/slice/loggedInCartSlice';
import { removeFromCartForGuestCustomer } from '@/redux/slice/cartSlice';
import Loader from './layout/Loader';

function ProductsInCart() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedCartData = useSelector((state) => state.loggedInCart.cart) || [];
  console.log(loggedCartData)
  const status = useSelector((state) => state.loggedInCart.status);
  const error = useSelector((state) => state.loggedInCart.error);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const getGuestCustomer = useSelector((state) => state.cart.cartItems);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems(token));
      setIsCartUpdated(false);
    }
  }, [token, isCartUpdated, dispatch]);

  const handleRemove = (cartItemId) => {
    if (token) {
      dispatch(removeFromCart({ cartItemId, token }));
      setIsCartUpdated(true);
    } else {
      dispatch(removeFromCartForGuestCustomer(cartItemId));
    }
  };

  const handleQuantityChangeByPlus = (productId, quantity) => {
    console.log(quantity);
    if (token) {
      dispatch(addToCartLoggedIn({ product_id: productId, quantity, token }));
      setIsCartUpdated(true);
    }
  };

  const handleQuantityChangeByMinus = (productId, quantity) => {
    if (token) {
      dispatch(subtractItemFromCart({ productDetail: { id: productId }, quantity, token }));
      setIsCartUpdated(true);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const item = loggedCartData.find((item) => item.product.id === productId);
    if (item && token) {
      if (newQuantity > item.quantity) {
        handleQuantityChangeByPlus(productId, newQuantity);
      } else if (newQuantity < item.quantity) {
        handleQuantityChangeByMinus(productId, newQuantity);
      }
    }
  };

  if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

 
  const cartData = token ? loggedCartData : getGuestCustomer;
  const totalItems = cartData.length;

  return (
    <div className="row mb-5">
      <form className="col-md-12">
        <div className="site-blocks-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="product-thumbnail">Image</th>
                <th className="product-name">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-total">Total</th>
                <th className="product-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length > 0 ? (
                cartData.map((item) => (
                  <tr key={item.product_id || item.id}>
                    <td className="product-thumbnail">
                      <img src={item.product_image || item.product.image} alt={item.product_name || item.product.name} className="img-fluid" />
                    </td>
                    <td className="product-name">
                      <h2 className="h5 text-black">{item.product_name || item.product.name}</h2>
                    </td>
                    <td>{item.product_price || item.product.price}</td>
                    <td>
                      <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary js-btn-minus"
                            type="button"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleQuantityChangeByMinus(item.product_id || item.id, item.quantity - 1);
                              }
                            }}
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity || item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.product_id || item.id, Number(e.target.value))
                          }
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary js-btn-plus"
                            type="button"
                            onClick={() =>
                              handleQuantityChangeByPlus(item.product_id || item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{(item.product_price || item.product.price) * item.quantity}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleRemove(item.product_id || item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nothing in your cart.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default ProductsInCart;

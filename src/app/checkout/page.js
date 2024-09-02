"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter
import { syncCart } from '@/redux/slice/cartSlice';
import { placeOrder, storePayment } from '@/redux/slice/orderSlice'; 
import BillingDetailsForm from '@/components/BillingDetailsForm';
import Link from 'next/link';

function CheckoutPage() {
    const dispatch = useDispatch();
    const router = useRouter(); 
    const token = useSelector((state) => state.auth.token);
    const loggedCartData = useSelector((state) => state.loggedInCart.cart) || [];
    const guestCartData = useSelector((state) => state.cart.cartItems);
    const totalAmountOfLoggedInCustomer = useSelector((state) => state.loggedInCart.totalAmount);
    const totalAmountOfGuestCustomer = useSelector((state) => state.cart.totalAmount);
    const orderStatus = useSelector((state) => state.order);
    const sessionId = localStorage.getItem('session_id') || null;
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        address: '',
        state: '',
        postalZip: '',
        email: '',
        phone: '',
    });

    const cartTotalAmount = token ? totalAmountOfLoggedInCustomer : totalAmountOfGuestCustomer;
    const cartData = token ? loggedCartData : guestCartData;

    useEffect(() => {
        if (!token) {
            const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            dispatch(syncCart(storedCart, sessionId));
        }
    }, [dispatch, token, sessionId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const orderData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName,
            address: formData.address,
            state: formData.state,
            postal_zip: formData.postalZip,
            email: formData.email,
            phone: formData.phone,
            cart_items: cartData.map((item) => ({
                product_id: item.product_id || item.id,
                quantity: item.quantity,
                price: item.product_price,
            })),
            total_amount: cartTotalAmount,
            session_id: sessionId,
        };

        dispatch(placeOrder(orderData)); 
    };

    useEffect(() => {
        if (orderStatus.order_id && !isPaymentCompleted) {
            const loadRazorpayScript = () => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => {
                    const options = {
                        key: 'rzp_test_tGif3L8XYPkTWO',
                        amount: cartTotalAmount * 100,
                        currency: orderStatus.currency,
                        name: 'Company',
                        description: 'Test Transaction',
                        image: '/your-logo.png',
                        order_id: orderStatus.order_id,
                        handler: function (response) {
                            dispatch(storePayment({
                                order_id: orderStatus.order_id,
                                payment_id: response.razorpay_payment_id,
                                cart_data: cartData,
                            }));
                            setIsPaymentCompleted(true);
                            router.push('/order-confirmation'); 
                        },
                        prefill: {
                            name: formData.firstName + ' ' + formData.lastName,
                            email: formData.email,
                            contact: formData.phone,
                        },
                        notes: {
                            address: formData.address,
                        },
                        theme: {
                            color: '#3399cc',
                        },
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                };
                script.onerror = () => {
                    console.error('Razorpay script could not be loaded.');
                };
                document.body.appendChild(script);
            };
            loadRazorpayScript();
        }
    }, [orderStatus.order_id, isPaymentCompleted, cartTotalAmount, cartData, formData, dispatch, router]);
    

    return (
        <div className="site-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="border p-4 rounded" role="alert">
                            Returning customer? <Link href="/my-account">Click here</Link> to login
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-5 mb-md-0">
                        <h2 className="h3 mb-3 text-black">Billing Details</h2>
                        <BillingDetailsForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            isSubmitting={orderStatus.ordering}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                                <div className="p-3 p-lg-5 border">
                                    <label htmlFor="c_code" className="text-black mb-3">
                                        Enter your coupon code if you have one
                                    </label>
                                    <div className="input-group w-75">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="c_code"
                                            placeholder="Coupon Code"
                                            aria-label="Coupon Code"
                                            aria-describedby="button-addon2"
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                type="button"
                                                id="button-addon2"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <h2 className="h3 mb-3 text-black">Your Order</h2>
                                <div className="p-3 p-lg-5 border">
                                    <table className="table site-block-order-table mb-5">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartData.length > 0 ? (
                                                cartData.map((item) => (
                                                    <tr key={item.product_id || item.id}>
                                                        <td>
                                                            {item.product_name || item.product.name}
                                                            <strong className="mx-2">x</strong>
                                                            {item.quantity}
                                                        </td>
                                                        <td>{item.product_price * item.quantity || item.product.price * item.quantity}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2">Nothing in your cart.</td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="text-black font-weight-bold">
                                                    <strong>Cart Subtotal</strong>
                                                </td>
                                                <td className="text-black">{cartTotalAmount}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-black font-weight-bold">
                                                    <strong>Order Total</strong>
                                                </td>
                                                <td className="text-black font-weight-bold">
                                                    <strong>{cartTotalAmount}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-lg py-3 btn-block"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={orderStatus.ordering}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;

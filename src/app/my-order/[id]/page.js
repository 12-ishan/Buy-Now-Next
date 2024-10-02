'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from '@/components/layout/breadcrumb';
import { fetchOrderDetails } from '@/redux/slice/orderDetailsSlice';
import Loader from '@/components/layout/Loader';

function MyOrder({ params }) {
    const { id } = params;
    const dispatch = useDispatch();
    const orderDetail = useSelector((state) => state.orderDetail.orderData);
    const customer = useSelector((state) => state.auth.customer);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            dispatch(fetchOrderDetails({ id }));
        }
    }, [dispatch, id, token]);

    const orderData = orderDetail?.[0];

    return (
        <>
            <Breadcrumb pageName="My Order" />
            {customer ? (
                <div className="container mt-5">
                    <header className="mb-4">
                        <h1 className="h2">Order Details</h1>
                    </header>

                    {/* Order Summary */}
                    {orderData ? (
                        <section className="card mb-4">
                            <div className="card-header">
                                <h2 className="h5">Order #{orderData.id}</h2>
                            </div>
                            <div className="card-body">
                                <p><strong>Date:</strong> {new Date(orderData.created_at).toLocaleString()}</p>
                                <p><strong>Payment Status:</strong> {orderData.order_status}</p>
                                <hr />
                            </div>
                        </section>
                    ) : (
                        <Loader/>
                    )}

                    {orderData?.order_billing && (
                        <section className="card mb-4">
                            <div className="card-header">
                                <h2 className="h5">Billing Details</h2>
                            </div>
                            <div className="card-body">
                                <p><strong>First Name:</strong> {orderData.order_billing.first_name}</p>
                                <p><strong>Last Name:</strong> {orderData.order_billing.last_name}</p>
                                <p><strong>Email:</strong> {orderData.order_billing.email}</p>
                                <p><strong>Phone:</strong> {orderData.order_billing.phone}</p>
                                <p><strong>Address:</strong> {orderData.order_billing.address}</p>
                                <p><strong>State:</strong> {orderData.order_billing.state}</p>
                                <p><strong>Pin Code:</strong> {orderData.order_billing.pin_code || 'N/A'}</p>
                            </div>
                        </section>
                    )}

                    {/* Order Items */}
                    {orderData?.order_items && (
                        <section className="card mb-4">
                            <div className="card-header">
                                <h2 className="h5">Order Items</h2>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {/* <th>Product Name</th> */}
                                            <th>Quantity</th>
                                            <th>Unit Price</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData.order_items.length > 0 ? (
                                            orderData.order_items.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    {/* <td>{item.product_id}</td>  */}
                                                    <td>{item.quantity}</td>
                                                    <td>${item.price}</td>
                                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No items found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </div>
            ) : (
                <div className="container mt-5">
                    <p>Please log in to view your order details.</p>
                </div>
            )}
        </>
    );
}

export default MyOrder;

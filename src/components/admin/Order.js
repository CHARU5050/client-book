import React, { useEffect, useState } from 'react';
import Adminpage from './Adminpage';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState('');

  useEffect(() => {
    fetchOrders();
    console.log(orders);
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getorders");
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <>
      <Adminpage>
        <div className='col-lg-10 ms-auto'>
          <h1>Orders</h1>
          <table className='table'>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Book ID</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {orders &&orders.map(order => (
                <tr key={order.id}>
                  <td>{order.userid}</td>
                  <td>{order.bookid}</td>
                  <td>{order.quantity}</td>
                  <td>{order.totalamount}</td>
                  <td>{order.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Adminpage>
    </>
  );
};

export default Order;

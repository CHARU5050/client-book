import React, { useContext, useEffect ,useState} from 'react'
import Navbar from "../sections/Navbar";
import { AuthContext } from "../../context/authcontext";
import { useNavigate ,Link} from 'react-router-dom';
import './Cart.css';
import axios from 'axios';
import Alert from '../Alert';

const Cart = () => {
  const {currentuser}=useContext(AuthContext);
  const[cart,setcart]=useState([]);
  const navigate = useNavigate();
  const shippingCharge = 50;
  const[msgloading,setmsgloading]=useState(false);
  const[msg,setmsg]=useState('');
  const[color,setcolor]=useState('success');
  useEffect(()=>{
    if(!currentuser){
      navigate('/login');
    }
    getcart();
   
  },[currentuser])

  const getcart = async () => {
    try {
      const response = await axios.get(`/getcart/${currentuser.iduser}`);
      setcart(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const deletecart = (bookid) => {
    const userid = currentuser.iduser;
    axios.delete(`/deletecart/${userid}/${bookid}`)
      .then(response => {
        console.log("remove successfully");
        getcart();
      })
      .catch(error => {
        console.error('Error deleting item from cart:', error);
      });
    
  };

  const handleQuantityChange = async (bookid, newQuantity) => {
    
    console.log(bookid, newQuantity);

    try {
        const response = await axios.get(`/singlebooks/${bookid}`);
        if (response.status === 200) {
            const availableQuantity = response.data[0].quantity; // Assuming 'quantity' is the column name in your 'all_books' table
            if (newQuantity <= availableQuantity) {
                try {
                    const updateResponse = await axios.put(`/updatecart/${bookid}/${currentuser.iduser}`, { newQuantity });
                    if (updateResponse.status === 200) {
                        console.log("success");
                    }
                } catch (updateError) {
                    console.error('Error updating quantity:', updateError);
                }
            } else {
              setmsgloading(true);
              setmsg(`Only ${availableQuantity} items available.`)
              setcolor('warning');
            }
        }
        getcart();
    } catch (error) {
        console.error('Error getting book quantity:', error);
    }
};
  

  return (
    <>
    <Navbar></Navbar>
    {msgloading && (<Alert message={msg} color={color} />)}
    <table className='carttable'>
      <thead className='cartheader'>
        <tr>
          <th>Products</th>
          <th>Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>View</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody className='carttb'>
          {cart && cart.map(item => (
            <tr className='cartrow' key={item.idcart}>
              <td><img src={`/upload/${item.img}`} alt=""/></td>
              <td>{item.heading}</td>
              <td>${item.price}</td>
              <td className='align'>
              <div className="quantity-input"><button onClick={()=>handleQuantityChange(item.idbook,item.quantity-1)}disabled={item.quantity === 1}>-</button>
            <input
                type="number"
                value={item.quantity}
                min={1}
                
                readOnly
            />
            <button onClick={()=>handleQuantityChange(item.idbook,item.quantity+1)} >+</button></div></td>
           
              <td>${item.price * item.quantity}</td>
              <td className='align'><a href={`/${item.idbook}`} className="fa-solid fa-eye"></a></td>
              <td className='align'><a onClick={()=>deletecart(item.idbook)} className="fa-solid fa-xmark"></a></td>
            </tr>
          ))}
          
      </tbody>
    </table>
    {cart.length===0 && (<img className='cart_empty' src='/images/cart.jpeg'></img>)} 

    {cart.length!=0 && (<div className='totalcart'>
      <h1>Cart Totals</h1>
      <div className='totalrow'>
        <h2>Subtotal</h2>
        <h6>${cart &&cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)}</h6>
      </div>
      <div className='totalrow'>
        <h2>Shipping Charge</h2>
        <h6>${shippingCharge}</h6>
      </div>
      <div className='totalrow  bold'>
        <h2>Total</h2>
        {/* Calculate total from cart items */}
        <h6>${cart&& cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)+50}</h6>
      </div>

      <Link
  to={`/payment`} >
  <button className='btn'>Proceed to payment</button>
</Link>


      </div>
    )}
    </>
  )

}

export default Cart
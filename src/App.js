import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Adminlogin from './components/admin/Adminlogin';
import Form from './components/admin/Forms';
import AllBooks from './components/admin/AllBooks';
import AdminForm from './components/admin/AdminForm';
import Order from './components/admin/Order'
import Singlepage from './components/pages/Singlepage';
import Cart from './components/pages/Cart';
import Wishlist from './components/pages/Wishlist';
import Mainbooks from './components/pages/Mainbooks';
import Feebback from './components/pages/Feebback';
import Payment from './components/pages/Payment';
import Contact from './components/pages/Contact';
import ComPayment from './components/pages/ComPayment';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/:id" element={<Singlepage></Singlepage>}></Route>
        <Route path="/adminlogin" element={<Adminlogin></Adminlogin>}></Route>
        <Route path="/admin_page" element={<Form></Form>}></Route>
        <Route path="/allbooks" element={<AllBooks></AllBooks>}></Route>
        <Route path="/admin_page/orders" element={<Order></Order>}></Route>
        <Route path='/admin_page/others' element={<AdminForm></AdminForm>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
        <Route path='/books/all' element={<Mainbooks></Mainbooks>}></Route>
        <Route path='/feedback' element={<Feebback></Feebback>}></Route>
        <Route path="/payment" element ={<Payment></Payment>}></Route>
        <Route path="/contacts" element={<Contact></Contact>}></Route>  
        <Route path="/paymentSuccesfull" element={<ComPayment></ComPayment>}></Route>



      </Routes>
      </Router>
      
    </div>
  );
}

export default App;

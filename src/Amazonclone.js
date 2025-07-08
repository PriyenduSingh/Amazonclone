import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; 
import { FaTrash } from 'react-icons/fa';


const productsData = [
  { id: 1, name: 'Air Conditioners', price: 29999, description: 'Split and window ACs for your home.', image: 'https://m.media-amazon.com/images/I/61UuKUxgbPL._AC_UY218_.jpg' },
  { id: 2, name: 'Refrigerators', price: 18999, description: 'Energy efficient and stylish refrigerators.', image: 'https://m.media-amazon.com/images/I/61bRiPEAWlL._AC_UL320_.jpg' },
  { id: 3, name: 'Microwaves', price: 5999, description: 'Cook and reheat with ease.', image: 'https://m.media-amazon.com/images/I/61vQxewGCiL._SL1500_.jpg' },
  { id: 4, name: 'Washing Machines', price: 14999, description: 'Top and front load washing machines.', image: 'https://m.media-amazon.com/images/I/712G-LLV+NL._AC_UL320_.jpg' },
  { id: 5, name: 'Smart Speakers', price: 4499, description: 'Smart voice assistant devices.', image: 'https://m.media-amazon.com/images/I/51C+FWhW9xL._AC_UY218_.jpg' }, 
  { id: 6, name: 'Chia Seeds', price: 500, description: 'Farmley Chia Seeds 200g I Seeds for Eating | Seeds for Weight Management | Rich in Calcium, Protein & Fibre (Pack of 1)', image: 'https://m.media-amazon.com/images/I/71OFtl2YrkL._SX522_.jpg' },
  { id: 7, name: 'Books', price: 250, description: 'Harry Potter and the Philosophers Stone.A young boy discovers he’s a wizard and begins his magical journey at Hogwarts.', image: 'https://m.media-amazon.com/images/I/81q77Q39nEL._SY385_.jpg' },
  { id: 8, name: 'iPads', price: 40000, description: 'Apple iPad 11″: A16 chip, 27.69 cm (11″) Model, Liquid Retina Display, 128GB, Wi-Fi 6, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue', image: 'https://m.media-amazon.com/images/I/61kMIKm23VL._SX425_.jpg' },
  { id: 9, name: 'Shoes', price: 400, description: 'ATHCO Mens Koach Memory Foam Comfort Shoes', image: 'https://m.media-amazon.com/images/I/71bCFPtGoSL._SX535_.jpg' },
  { id: 10, name: 'Smart Speakers', price: 4499, description: 'Smart voice assistant devices.Hands-free smart devices that respond to voice commands, stream music, control smart home gadgets, and provide real-time information using AI-powered assistants like Alexa, Siri, or Google Assistant.', image: 'https://m.media-amazon.com/images/I/51C+FWhW9xL._AC_UY218_.jpg' }, ,
];

function Home({ cart, setCart }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <header className="header">
      <Link to="/" className="logo">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbF7cGHkMnweu8pt9PKxoc1LbnqV6k3lIS-tLNpHfulPX5zS7qIWhzMv6O42abYd0BSY&usqp=CAU" alt="Amazon Logo" className="logo-img" />
     </Link>
        <input
          type="text"
          placeholder="Search Amazon.in"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <Link to="/cart" className="cart-link">🛒 Cart ({cart.length})</Link>
      </header>

      <div className="grid-sections">
        {filteredProducts.map((product) => (
          <div key={product.id} className="section-card">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartPage({ cart, setCart }) {
  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cart];
    if (!updatedCart[index].quantity) updatedCart[index].quantity = 1;
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="container">
      <header className="header">
      <Link to="/" className="logo">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbF7cGHkMnweu8pt9PKxoc1LbnqV6k3lIS-tLNpHfulPX5zS7qIWhzMv6O42abYd0BSY&usqp=CAU" alt="Amazon Logo" className="logo-img" />
     </Link>
        <div className="cart-link">🛒 Cart ({cart.length})</div>
      </header>
      <h2>Shopping Cart</h2>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="cart-controls">
                  <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  <FaTrash
                    onClick={() => handleDelete(index)}
                    className="trash-icon"
                  />
                </div>
              </div>
              <div className="cart-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <h3>Subtotal ({cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} item{cart.length > 1 ? 's' : ''}): ₹{total.toLocaleString()}</h3>
      </div>
    </div>
  );
}

export default function AmazonClone() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}
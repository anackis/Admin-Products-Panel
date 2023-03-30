


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';

import './addProduct.scss';

const AddProduct = () => {

  const [inputs, setInputs] = useState();
  const [select, setSelect] = useState();
  const [skuArray, setSkuArray] = useState();

  useEffect(() => {
    getUsers();
  }, []); 

  function getUsers() {
      axios.get('http://localhost/api/users/save').then(function(response) {
      setSkuArray(response.data);
      console.log(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))

  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (skuArray.find(e => e.sku === inputs.sku)) {
      console.log("SKU already exists");
    } else {
      axios.post('http://localhost/api/user/save', inputs).then(function(response){
        console.log(response);
        event.target.reset();
      });
    }
  }
 
  


  return (
    <div className='product-add-section'>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product Add</h2>
          <div className="header__buttons">
            <button type="submit" form="product_form" className='header__button'>Save</button>
            <Link to="/" className='header__button'>Cancel</Link>
          </div>
        </div>
        <div className="header__divider"></div>
      </div>

      <div className="container">
      <form id='product_form' onSubmit={handleSubmit}>
        <label htmlFor="sku">SKU</label>
        <input id='sku' name='sku' onChange={handleChange} type="text" placeholder="sku" />
        <br />
        <br />
        <label htmlFor="name">Name</label>
        <input id='name' name='name' onChange={handleChange} type="text" placeholder="name" />
        <br />
        <br />
        <label htmlFor="price">Price ($)</label>
        <input id='price' name='price' onChange={handleChange} type="text" placeholder="price" />
        <br />
        <br />

        <label htmlFor="productType">Type Switcher</label>
        <select value={select} onChange={e=>setSelect(e.target.value)} id='productType' name='productType' >
          <option></option>
          <option value="dvd">DVD</option>
          <option value="book">Book</option>
          <option value="furniture">Furniture</option>
        </select>

        
        <div className={select === "dvd" ? "DVD" : "DVD hidden"}>
          <br />
          <br />
          <label htmlFor="size">Size (MB)</label>
          <input id='size' name='size' onChange={handleChange} type="text" placeholder="size" />
        </div>

        <div className={select === "furniture" ? "Furniture" : "Furniture hidden"}>
          <br />
          <br />
          <label htmlFor="height">Height (CM)</label>
          <input id='height' name='height' onChange={handleChange} type="text" placeholder="height" />

          <br />
          <br />
          <label htmlFor="width">Width (CM)</label>
          <input id='width' name='width' onChange={handleChange} type="text" placeholder="width" />

          <br />
          <br />
          <label htmlFor="length">Length (CM)</label>
          <input id='length' name='length' onChange={handleChange} type="text" placeholder="length" />
        </div>

        <div className={select === "book" ? "Book" : "Book hidden"}>
          <br />
          <br />
          <label htmlFor="weight">Weight (KG)</label>
          <input id='weight' name='weight' onChange={handleChange} type="text" placeholder="weight" />
        </div>

      </form>
      </div>

      <PageFooter/>
    </div>
  );
};

export default AddProduct;
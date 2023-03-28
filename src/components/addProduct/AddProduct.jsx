
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';

import './addProduct.scss';

const AddProduct = () => {

  const [inputs, setInputs] = useState();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost/api/user/save', inputs).then(function(response){
    console.log(response.data);
    
    });
    // console.log(inputs);
  }

  


  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product Add</h2>
          <div className="header__buttons">
            <button type="submit" form="#product_form" className='header__button'>Save</button>
            <Link to="/" className='header__button'>Cancel</Link>
          </div>
        </div>
        <div className="header__divider"></div>
      </div>

      {/* <form action=""> */}
      <form id='#product_form' onSubmit={handleSubmit}>
        <label htmlFor="#sku">SKU</label>
        <input id='#sku' name='sku' onChange={handleChange} type="text" placeholder="#sku" />
        <br />
        <br />
        <label htmlFor="#name">Name</label>
        <input id='#name' name='name' onChange={handleChange} type="text" placeholder="#name" />
        <br />
        <br />
        <label htmlFor="#price">Price ($)</label>
        <input id='#price' name='price' onChange={handleChange} type="text" placeholder="#price" />

        {/* <label htmlFor="#productType">Type Switcher</label>
        <select id='#productType' name='#productType'>
          <option value="one">one</option>
        </select> */}
      </form>

      <PageFooter/>
    </>
  );
};

export default AddProduct;
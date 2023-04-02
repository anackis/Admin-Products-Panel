


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';
import './addProduct.scss';



const AddProduct = () => {
  const [inputs, setInputs] = useState({});
  const [select, setSelect] = useState();
  const [skuArray, setSkuArray] = useState();
  const [skuError, setSkuError] = useState(false);


  const [subbmitError, setSubmitError] = useState(false);

  const [dirtyInput, setDirtyInput] = useState([]);

  useEffect(() => {
    getUsers();
  }, []); 

  const getUsers = () => {
      axios.get('http://localhost/api/users/save').then(function(response) {
      setSkuArray(response.data);
    });
  }
  
  const validate = (e) => {
    if (e.target.value === "") {
      setDirtyInput([...dirtyInput, e.target.name ]);
    } else {
      setDirtyInput((current) => current.filter((item) => {
        return item !==  e.target.name
      }));
    }
  }
  
  const blurHandle = (e) => {
    validate(e);
    setSubmitError(false);
    setSkuError(false);
  }
  
  const handleChange = (e) => {
    setSubmitError(false);
    setSkuError(false);
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();

    // getUsers();
    if (Object.keys(inputs).length < 3) {
      setSubmitError(true);
      return
    } else if (skuArray.find(e => e.sku === inputs.sku) && inputs.sku) {
      console.log(inputs)
      setSkuError(true);
      return
    } else {
      axios.post('http://localhost/api/user/save', inputs).then(function(response) {
        console.log("SUCCESS");
        e.target.reset();
      });
    }
  }

  console.log("render");

  return (
    <div className='product-add-section'>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product Add</h2>
          <div className="header__buttons">
            <button  type="submit" form="product_form" className='header__button'>Save</button>
            <Link to="/" className='header__button'>Cancel</Link>
          </div>
        </div>
        <div className="header__divider"></div>
      </div>

      <div className="container">
      
        <form id='product_form' className='product_form' onSubmit={handleSubmit}>
        {subbmitError ? <p className='error error_top'>Please fill all required fields !</p> : ""}
          <div className="product_form__wrapper">
            <div className="product_form__labels">
              <label htmlFor="sku">SKU</label>
              <label htmlFor="name">Name</label>
              <label htmlFor="price">Price ($)</label>
            </div>
            <div className="product_form__inputs">
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='sku' name='sku' onChange={handleChange} type="text" placeholder="sku" />
                {dirtyInput.find(item => item === "sku") || subbmitError ? <p className='error'>Required Field</p> : ""}
                {skuError ? <p className='error'>Sku Alreadu Exists! </p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='name' name='name' onChange={handleChange} type="text" placeholder="name" />
                {dirtyInput.find(item => item === "name") || subbmitError ? <p className='error'>Required Field</p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='price' name='price' onChange={handleChange} type="text" placeholder="price" />
                {dirtyInput.find(item => item === "price") || subbmitError ? <p className='error'>Required Field</p> : ""}
              </div>
              
              
            </div>
          </div>
        
          <label htmlFor="productType">Type Switcher</label>
          <select value={select} onChange={e=>setSelect(e.target.value)} id='productType' name='productType' >
            <option></option>
            <option id='DVD' value="dvd">DVD</option>
            <option id='Furniture' value="book">Book</option>
            <option id='Book' value="furniture">Furniture</option>
          </select>
          

          <div className={select === "dvd" ? "DVD product_form__type" : "DVD hidden"}>
            <label htmlFor="size">Size (MB)</label>
            
            <input id='size' name='size' onChange={handleChange} type="text" placeholder="size" />
            <div className="product_form__descr">Please, provide DVD size in MB.</div>
          </div>

          <div className={select === "furniture" ? "Furniture product_form__type" : "Furniture hidden"}>
            <div className="product_form__wrapper">
              <div className="product_form__labels">
                <label htmlFor="height">Height (CM)</label>
                <label htmlFor="width">Width (CM)</label>
                <label htmlFor="length">Length (CM)</label>
              </div>
              <div className="product_form__inputs">
                <input id='height' name='height' onChange={handleChange} type="text" placeholder="height" />
                <input id='width' name='width' onChange={handleChange} type="text" placeholder="width" />
                <input id='length' name='length' onChange={handleChange} type="text" placeholder="length" />
              </div>
            </div>
            <div className="product_form__descr">Please, provide ( height x width x length ) in CM.</div>
          </div>

          <div className={select === "book" ? "Book product_form__type" : "Book hidden"}>
            <label htmlFor="weight">Weight (KG)</label>
            <input id='weight' name='weight' onChange={handleChange} type="text" placeholder="weight" />
            <div className="product_form__descr">Please, provide weight in Kg.</div>
          </div>

          

        </form>
      </div>

      <PageFooter/>
    </div>
  );
};

export default AddProduct;
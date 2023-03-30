


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

  // const useValidation = (value, validations) => {
  //   const [isEmpty, setIsEmpty] = useState(true);
  //   const [minLengthError, setMinLengthError] = useState(false);

  //   useEffect(() => {
  //     for (const validation in validations) {
  //       switch (validation) {
  //         case 'minLength': 
  //           value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
  //           break;
  //         case 'isEmpty':
  //           value ? setIsEmpty(false) : setIsEmpty(true)
  //           break;
  //         default: 
  //           console.log("ok");
  //       }
  //     }
  //   }, [value])

  //   return {
  //     isEmpty,
  //     minLengthError,
  //   }

  // }


  function getUsers() {
      axios.get('http://localhost/api/users/save').then(function(response) {
      setSkuArray(response.data);
      console.log(response.data);
    });
  }

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);




    setInputs(values => ({...values, [name]: value}));
    

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
        <form id='product_form' className='product_form' onSubmit={handleSubmit}>
          <div className="product_form__wrapper">
            <div className="product_form__labels">
              <label htmlFor="sku">SKU</label>
              <label htmlFor="name">Name</label>
              <label htmlFor="price">Price ($)</label>
            </div>
            <div className="product_form__inputs">
              <input id='sku' name='sku' onChange={handleChange} type="text" placeholder="sku" />
              <input id='name' name='name' onChange={handleChange} type="text" placeholder="name" />
              <input id='price' name='price' onChange={handleChange} type="text" placeholder="price" />
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
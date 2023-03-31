


import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';
import './addProduct.scss';



const AddProduct = () => {
  const [inputs, setInputs] = useState();
  const [select, setSelect] = useState();
  const [skuArray, setSkuArray] = useState();

  
  
  const [inputError, setInputError] = useState(['sku', 'name', 'price']);

  const [error, setError] = useState(false);

  const [dirtyInput, setDirtyInput] = useState([]);

  useEffect(() => {
    getUsers();
  }, []); 


  // const UseValidation = (value, validations) => {
  //   const [isEmpty, setIsEmpty] = useState(true);
  //   // const [minLengthError, setMinLengthError] = useState(false);
  
  //   useEffect(() => {
  //     for (const validation in validations) {
  //       switch (validation) {
  //         // case 'minLength': 
  //         //   value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
  //         //   break;
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
  //     // minLengthError,
  //   }
  // }

  const getUsers = () => {
      axios.get('http://localhost/api/users/save').then(function(response) {
      setSkuArray(response.data);
      // console.log(response.data);
    });
  }

 

  const blurHandle = (e) => {
    setDirtyInput([...dirtyInput, e.target.name ]);
    if (e.target.value === "") {
      // setInputError(e.target.name);
      // setInputError((prevState) => ([
      //   ...prevState,
      //   e.target.name
      // ]));
      setError(true);
    } else {
      setInputError((current) => current.filter((item) => {
        return item !==  e.target.name
      }));
    }
    // switch (e.target.name) {
    //   case 'sku':
    //     // console.log(e.target.name);
    //     // e.target.value === "" ? console.log(`${e.target.name} : ${e.target.value} error`) : console.log("yes");
    //     e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     console.log(inputError);
    //     break;
    //   case 'name': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;
    //   case 'price': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break; 
    //   case 'productType': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;  
    //   case 'size': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;   
    //   case 'height': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;  
    //   case 'width': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break; 
    //   case 'length': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;        
    //   case 'weight': 
    //   e.target.value === "" ? setInputError(e.target.name) : setInputError("");
    //     break;    
    //   default: 
    //     console.log("def");
        
    // }
    
  }
  
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    console.log(e.target.value);
    setInputs(values => ({...values, [name]: value}));
    // console.log(inputs);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputError.length !== 0) {
      console.log("validation error");
      setError(true);
    } else if ( skuArray.find(e => e.sku === inputs.sku)) {
      console.log("SKU already exists");
      
    } else {
      axios.post('http://localhost/api/user/save', inputs).then(function(response){
        console.log(response);
        e.target.reset();
      });
    }
  }


 
  
  return (
    <div className='product-add-section'>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product Add</h2>
          <div className="header__buttons">
            <button /* disabled={!formValid} */ type="submit" form="product_form" className='header__button'>Save</button>
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
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='sku' name='sku' onChange={handleChange} type="text" placeholder="sku" />
                {inputError.find(e => e === "sku") && error && dirtyInput.find(item => item === "sku") ? <p className='error'>Empty Sku</p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='name' name='name' onChange={handleChange} type="text" placeholder="name" />
                {inputError.find(e => e === "name") && error && dirtyInput.find(item => item === "name") ? <p className='error'>Empty name</p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => blurHandle(e)} id='price' name='price' onChange={handleChange} type="text" placeholder="price" />
                {inputError.find(e => e === "price") && error && dirtyInput.find(item => item === "price") ? <p className='error'>Empty price</p> : ""}
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
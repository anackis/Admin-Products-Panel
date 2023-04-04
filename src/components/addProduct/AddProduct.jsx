
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';
import './addProduct.scss';


const AddProduct = () => {
  const [inputs, setInputs] = useState({});
  const [skuArray, setSkuArray] = useState();
  const [submitTry, setSubmitTry] = useState(false);
  const navigate = useNavigate();
  

  const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [skuError, setSkuError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
  
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          
          case 'isEmpty': 
              value ? setIsEmpty(false) : setIsEmpty(true);
            break;
          case 'skuError':
            validations[validation] && validations[validation].find(item => item.sku === value) && inputs.sku ? setSkuError(true) : setSkuError(false);
            break;
          case 'typeError':
              const numberRegEx = /^\d+$/ ;
              numberRegEx.test(String(value).toLowerCase()) ? setTypeError(false) : setTypeError(true);;
            break;
          default: 
            break;
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, validations]);
  
    useEffect(() => {
      if (isEmpty  || skuError ||  typeError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEmpty, skuError, typeError] );
  
    return {
      isEmpty,
      skuError,
      typeError, 
      inputValid
    }
  }
  

  const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations)
  
    const onChange = (e) => {
      setValue(e.target.value);
      setSubmitTry(false);
      
      const name = e.target.name;
      const value = e.target.value;
      setInputs(values => ({...values, [name]: value}));
    }
  
    const onBlur = (e) => {
      setIsDirty(true);
    }
  
    return {
      value, 
      onChange,
      onBlur,
      isDirty,
      ...valid
    }
  }


  const sku = useInput('', {isEmpty: true, skuError: skuArray});
  const name = useInput('', {isEmpty:  true});
  const price = useInput('', {isEmpty:   true, typeError: "number"});
  const productType = useInput('', {isEmpty:  true});
  const size = useInput('', {isEmpty:  true, typeError: "number"});
  const weight = useInput('', {isEmpty:  true, typeError: "number"});
  const height = useInput('', {isEmpty:  true, typeError: "number"});
  const width = useInput('', {isEmpty:  true, typeError: "number"});
  const length = useInput('', {isEmpty:  true, typeError: "number"});

  useEffect(() => {
    getUsers();
  }, [sku.skuError]); 

  const getUsers = () => {
      axios.get('http://localhost/api/users/save').then(function(response) {
      setSkuArray(response.data);
    });
  }

  const handleSubmit = (e) => {
    setSubmitTry(false);
    e.preventDefault();
    if (!sku.inputValid || !name.inputValid || !price.inputValid || !productType.inputValid) {
      setSubmitTry(true);
      return;
    } else {
      axios.post('http://localhost/api/user/save', inputs).then(function(response) {
        console.log("SUCCESS");
        e.target.reset();
        navigate('/')
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
        {(!sku.inputValid ||!name.inputValid || !price.inputValid || !productType.inputValid) && submitTry ? <p className='error error_top'>Please fill all required fields !</p> : ""}
          <div className="product_form__wrapper">
            <div className="product_form__labels">
              <label htmlFor="sku">SKU</label>
              <label htmlFor="name">Name</label>
              <label htmlFor="price">Price ($)</label>
            </div>
            <div className="product_form__inputs">
              <div className="product_form__input">
                <input onBlur={e => sku.onBlur(e)} onChange={e => sku.onChange(e)} value={sku.value} id='sku' name='sku'  type="text" placeholder="sku" />
                {sku.isDirty && sku.isEmpty ? <p className='error'>Required Field</p> : ""}
                {sku.isDirty && sku.skuError ? <p className='error'>Sku already exists</p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => name.onBlur(e)} onChange={e => name.onChange(e)} value={name.value} id='name' name='name' type="text" placeholder="name" />
                {name.isDirty && name.isEmpty ? <p className='error'>Required Field</p> : ""}
              </div>
              <div className="product_form__input">
                <input onBlur={e => price.onBlur(e)} onChange={e => price.onChange(e)} value={price.value} id='price' name='price' placeholder="price" />
                {price.isDirty && price.isEmpty ? <p className='error'>Required Field</p> : ""}
                {price.isDirty && price.typeError && !price.isEmpty ? <p className='error'>Wrong type</p> : ""}
              </div>
            </div>
          </div>
          <label htmlFor="productType">Type Switcher</label>
          {productType.isDirty && productType.isEmpty ? <p className='error error_select'>Required Field</p> : ""}
          <select onBlur={e => productType.onBlur(e)} onChange={e => productType.onChange(e)} value={productType.value} id='productType' name='productType' >
            <option></option>
            <option id='DVD' value="dvd">DVD</option>
            <option id='Furniture' value="book">Book</option>
            <option id='Book' value="furniture">Furniture</option>
          </select>
          

          <div className={productType.value === "dvd" ? "DVD product_form__type" : "DVD hidden"}>
            <label htmlFor="size">Size (MB)</label>
            <input onBlur={e => size.onBlur(e)} onChange={e => size.onChange(e)} value={size.value} id='size' name='size' type="text" placeholder="size"/>
            <div className="error__block">
              {size.isDirty && size.isEmpty ? <p className='error error_select'>Required Field</p> : ""}
              {size.isDirty && size.typeError && !size.isEmpty ? <p className='error error_select'>Wrong type</p> : ""}
            </div>
            <div className="product_form__descr">Please, provide DVD size in MB.</div>
          </div>

          <div className={productType.value === "furniture" ? "Furniture product_form__type" : "Furniture hidden"}>
            <div className="product_form__wrapper">
              <div className="product_form__labels">
                <label htmlFor="height">Height (CM)</label>
                <label htmlFor="width">Width (CM)</label>
                <label htmlFor="length">Length (CM)</label>
              </div>
              <div className="product_form__inputs">
                <input onBlur={e => height.onBlur(e)} onChange={e => height.onChange(e)} value={height.value} id='height' name='height' type="text" placeholder="height" />
                <div className="error__block">
                  {height.isDirty && height.isEmpty ? <p className='error error_furn'>Required Field</p> : ""}
                  {height.isDirty && height.typeError && !height.isEmpty ? <p className='error error_furn'>Wrong type</p> : ""}
                </div>
                <input onBlur={e => width.onBlur(e)} onChange={e => width.onChange(e)} value={width.value} id='width' name='width' type="text" placeholder="width" />
                <div className="error__block">
                  {width.isDirty && width.isEmpty ? <p className='error error_furn'>Required Field</p> : ""}
                  {width.isDirty && width.typeError && !width.isEmpty ? <p className='error error_furn'>Wrong type</p> : ""}
                </div>
                <input onBlur={e => length.onBlur(e)} onChange={e => length.onChange(e)} value={length.value} id='length' name='length' type="text" placeholder="length" />
                <div className="error__block">
                  {length.isDirty && length.isEmpty ? <p className='error error_furn'>Required Field</p> : ""}
                  {length.isDirty && length.typeError && !length.isEmpty ? <p className='error error_furn'>Wrong type</p> : ""}
                </div>
              </div>
            </div>
            <div className="product_form__descr">Please, provide ( height x width x length ) in CM.</div>
          </div>

          <div className={productType.value === "book" ? "Book product_form__type" : "Book hidden"}>
            <label htmlFor="weight">Weight (KG)</label>
            <input onBlur={e => weight.onBlur(e)} onChange={e => weight.onChange(e)} value={weight.value} id='weight' name='weight' type="text" placeholder="weight" />
            <div className="error__block">
              {weight.isDirty && weight.isEmpty ? <p className='error error_select'>Required Field</p> : ""}
              {weight.isDirty && weight.typeError && !weight.isEmpty ? <p className='error error_select'>Wrong type</p> : ""}
            </div>
            <div className="product_form__descr">Please, provide weight in Kg.</div>
          </div>

        </form>
      </div>

      <PageFooter/>
    </div>
  );
};

export default AddProduct;
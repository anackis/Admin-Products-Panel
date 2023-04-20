import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageFooter from '../pageFooter/PageFooter';
import '../addProduct/addProduct.scss'


class Product {
  constructor(sku, name, price, errors, skuArray) {
    this.productType = "Product"
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.errors = errors;
    this.skuArray = skuArray;
  }
  
  validate() {
    const errors = {};
    const numberRegEx = /^\d+$/;

    if (!this.sku) {
      errors.sku = "Product SKU is required";
    } 
    else if (this.skuArray.find(item => item.sku === this.sku)) {
      errors.sku = "Product SKU already exists";
    }

    if (!this.name) {
      errors.name = "Product name is required";
    }

    if (!this.price) {
      errors.price = "Product price is required";
    } else if (!numberRegEx.test(String(this.price).toLowerCase())) {
      errors.price = "Wrong type price";
    }

    if (this.productType === "Product") {
      errors.productType = "Product Type is required";
    }

    return errors;
  }
}


class DVD extends Product {
  constructor(sku, name, price, size, errors, skuArray) {
    super(sku, name, price, errors, skuArray);
    this.productType = "DVD"
    this.size = size;
  }

  validate() {
    const errors = super.validate();
    const numberRegEx = /^\d+$/;

    if (!this.size) {
      errors.size = "DVD size is required";
    } else if (!numberRegEx.test(String(this.size).toLowerCase())) {
      errors.size = "Wrong type size";
    }

    return errors;
  }
}


class Book extends Product {
  constructor(sku, name, price, weight, errors, skuArray) {
    super(sku, name, price, errors, skuArray);
    this.productType = "Book"
    this.weight = weight;
  }

  validate() {
    const errors = super.validate();
    const numberRegEx = /^\d+$/;

    if (!this.weight) {
      errors.weight = "Book weight is required";
    } else if (!numberRegEx.test(String(this.weight).toLowerCase())) {
      errors.weight = "Wrong type weight";
    }

    return errors;
  }
}


class Furniture extends Product {
  constructor(sku, name, price, height, width, length, errors, skuArray) {
    super(sku, name, price, errors, skuArray);
    this.productType = "Furniture"
    this.height = height;
    this.width = width;
    this.length = length;
  }

  validate() {
    const errors = super.validate();
    const numberRegEx = /^\d+$/;

    if (!this.height) {
      errors.height = "Furniture height is required";
    } else if (!numberRegEx.test(String(this.height).toLowerCase())) {
      errors.height = "Wrong type height";
    }
    if (!this.width) {
      errors.width = "Furniture width is required";
    } else if (!numberRegEx.test(String(this.width).toLowerCase())) {
      errors.width = "Wrong type width";
    }
    if (!this.length) {
      errors.length = "Furniture length is required";
    } else if (!numberRegEx.test(String(this.length).toLowerCase())) {
      errors.length = "Wrong type length";
    }

    return errors;
  }
}


class InputField extends Component {
  render()  {
    const {
      name,
      label,
      value,
      error,
      onChange,
      onBlur,
      placeholder,
    } = this.props

    return (
      <div className="product_form__wrapper">
        <div className="product_form__labels">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="product_form__inputs">
          <div className="product_form__input">
            <input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              id={name}
              name={name}
              type="text"
              placeholder={placeholder}
            />
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    )
  }
}


class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productType: "Product",
      sku: "",
      name: "",
      price: "",
      size: "",
      weight: "",
      height: "",
      width: "",
      length: "",
      skuArray: [],
      errors: {},
    };    
  }

  componentDidMount() {
    axios.get("http://localhost/api/users/save").then((response) =>
    this.setState({ skuArray: [...response.data] })
    );
  }


  handleSubmit = event => {
    event.preventDefault(); 
    const { sku, name, price, productType, size, weight, height, width, length, skuArray } = this.state;
    let product;

    switch (productType) {
      case "DVD":
        product = new DVD(sku, name, price, size, skuArray, skuArray);
        break;
      case "Book":
        product = new Book(sku, name, price, weight, skuArray, skuArray);
        break;
      case "Furniture":
        product = new Furniture(sku, name, price, height, width, length, skuArray, skuArray);
        break;
      default:
        product = new Product(sku, name, price, skuArray, skuArray);
    }

    const errors = product.validate();

    if (Object.keys(errors).length !== 0) {
      this.setState({ errors: errors });
      return;
    } else {
      axios.post("http://localhost/api/user/save", product).then(function(response) {
        window.location.replace('/');
      });
    }
  };


  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
      },
    }));
  };


  render() {
    const {
      sku,
      name,
      price,
      productType,
      size,
      weight,
      height,
      width,
      length,
      errors
    } = this.state;
    
    
    return (
      <div className="product-add-section">
        <div className="header">
          <div className="header__wrapper">
            <h2>Product Add</h2>
            <div className="header__buttons">
              <button
                onSubmit={this.handleSubmit}
                type="submit"
                form="product_form"
                className="header__button"
              >
                Save
              </button>
              <Link to="/" className="header__button">
                Cancel
              </Link>
            </div>
          </div>
          <div className="header__divider"></div>
        </div>

        <div className="container">
          <form id="product_form" className="product_form" onSubmit={this.handleSubmit}>
            <InputField
              name="sku"
              label="SKU"
              value={sku}
              error={errors.sku}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              placeholder="sku"
            />

            <InputField
              name="name"
              label="Name"
              value={name}
              error={errors.name}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              placeholder="name"
            />

            <InputField
              name="price"
              label="Price ($)"
              value={price}
              error={errors.price}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              placeholder="price"
            />

            <div>
              <label>
                Product type:
                <select
                  value={productType}
                  onChange={this.handleChange}
                  id="productType"
                  name="productType"
                >
                  <option value=""></option>
                  <option value="DVD">DVD</option>
                  <option value="Book">Book</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </label>
              {errors.productType && (
                <p className="error error_select">{errors.productType}</p>
              )}
            </div>

            {productType === "DVD" && (
              <div className="DVD product_form__type">
                <div className="product_form__wrapper">
                  <InputField
                    name="size"
                    label="Size:"
                    value={size}
                    error={errors.size}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    placeholder="size"
                  />
                </div>
                <div className="product_form__descr">
                  Please, provide DVD size in MB.
                </div>
              </div>
            )}

            {productType === "Book" && (
              <div className="Book product_form__type">
                <div className="product_form__wrapper">
                  <InputField
                    name="weight"
                    label="Weight:"
                    value={weight}
                    error={errors.weight}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    placeholder="weight"
                  />
                </div>
                <div className="product_form__descr">
                  Please, provide weight in Kg.
                </div>
              </div>
            )}

            {productType === "Furniture" && (
              <div className="Furniture product_form__type">
                <div className="product_form__wrapper">
                  <div className="product_form__labels">
                  <label htmlFor="height">Height (CM)</label>
                  <label htmlFor="width">Width (CM)</label>
                  <label htmlFor="length">Length (CM)</label>
                </div>
                <div className="product_form__inputs">
                <InputField
                  name="height"
                  value={height}
                  error={errors.height}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                  placeholder="height"
                />
                <InputField
                  name="width"
                  value={width}
                  error={errors.width}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                  placeholder="width"
                />
                <InputField
                  name="length"
                  value={length}
                  error={errors.length}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                  placeholder="length"
                />
              </div>
              </div>
                <div className="product_form__descr">
                Please, provide ( height x width x length ) in CM.
                </div>
              </div>
            )}
          </form>
        </div>
        <PageFooter />
      </div>
    );
  }
}


export default ProductForm;

import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';

import './addProduct.scss';

const AddProduct = () => {
  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product Add</h2>
          <div className="header__buttons">
            <button className='header__button'>Save</button>
            <Link to="/" className='header__button'>Cancel</Link>
          </div>
        </div>
        <div className="header__divider"></div>
      </div>

      <form action="">
        <label htmlFor="#sku">SKU</label>
        <input id='#sku' name='#sku' type="text" placeholder="#sku" />

        <label htmlFor="#name">Name</label>
        <input id='#name' name='#name' type="text" placeholder="#name" />

        <label htmlFor="#price">Price ($)</label>
        <input id='#price' name='#price' type="text" placeholder="#price" />

        <label htmlFor="#productType">Type Switcher</label>
        <select id='#productType' name='#productType'>
          <option value="one">one</option>
        </select>
      </form>

      <PageFooter/>
    </>
  );
};

export default AddProduct;
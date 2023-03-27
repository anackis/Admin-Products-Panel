
import { Link } from 'react-router-dom';

// import PageHeader from '../pageHeader/PageHeader';
import PageFooter from '../pageFooter/PageFooter';
import ProductList from '../productList/ProductList';

import './mainPage.scss';


const MainPage = () => {
  return (
    <>
      {/* <PageHeader/> */}
      <div className="header">
      <div className="header__wrapper">
        <h2>Product List</h2>
        <div className="header__buttons">
          <Link to="/addproducts" className='header__button'>ADD</Link>
          <button className='header__button'>MASS DELETE</button>
        </div>
      </div>
      <div className="header__divider"></div>
    </div>
      <ProductList/>
      <PageFooter/>
    </>
  );
};

export default MainPage;
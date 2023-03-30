
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListItem from '../productListItem/ProductListItem';
import { Link } from 'react-router-dom';

import PageFooter from '../pageFooter/PageFooter';

import './mainPage.scss';


const MainPage = () => {


  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);


  useEffect(() => {
    getUsers();
  }, []); 

  function getUsers() {
    axios.get('http://localhost/api/users/save').then(function(response) {
    // console.log(response.data);
    setProducts(response.data);
  });
  }

  const handleCheck = (id) => {
    var updatedList = [...checked];
    if ( checked.includes(id)) {
      updatedList.splice(checked.indexOf(id), 1);
    } else {
      updatedList = [...checked, id];
    }
    setChecked(updatedList);  
  }

  const deleteUsers = () => {
    checked.forEach((id) => {
      axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response) {
        console.log(response.data);
        getUsers();
      })
    })
  }

  // const deleteUsers = (id) => {
  //   axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response) {
  //     console.log(response.data);
  //     getUsers();
  //   })
  // }

  console.log(products);

  return (
    <div className='main-page'>
      <div className="header">
        <div className="header__wrapper">
          <h2>Product List</h2>
          <div className="header__buttons">
            <Link to="/add-product" className='header__button'>ADD</Link>
            <button onClick={deleteUsers} className='header__button'>MASS DELETE</button>
            
          </div>
        </div>
        <div className="header__divider"></div>
      </div>

      <div className="container">
        <div className='product-list'>
          {products.map((product, key) => 
            <ProductListItem handleCheck={handleCheck} product={product} key={key} />
          )}
        </div>
      </div>

      <PageFooter/>
    </div>
  );
};

export default MainPage;
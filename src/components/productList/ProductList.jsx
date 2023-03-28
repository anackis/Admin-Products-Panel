


import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductListItem from '../productListItem/ProductListItem';
import './productList.scss';

const ProductList = () => {

  const [products, setProducts] =useState([]);

  useEffect(() => {
    getUsers();
  }, []); 

  function getUsers() {
    axios.get('http://localhost/api/users/save').then(function(response) {
    console.log(response.data);
    setProducts(response.data);
  });
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost/api/user/${id}/delete`).then(function(response) {
      console.log(response.data);
      getUsers();
    })
  }

  

  return (
    <div className="container">
      <div className='product-list'>
        {products.map((product, key) =>
          <ProductListItem deleteUser={deleteUser} product={product} key={key} />
        )}
      </div>
    </div>
    
        
    
      
    

    
  );
};

export default ProductList;





import './productListItem.scss';

const ProductListItem = (props) => {
 const {id, sku, name, price} = props.product
 const deleteUser = props.deleteUser


  return (
    <div className="product-list-item">
      <input onClick={() => deleteUser(id)} className='product-list-item__checkbox' type="checkbox" name="checkbox"></input>
      <div className="product-list-item__wrapper">
        <div className="product-list-item__content">
          <p>{id}</p>
          <p>{sku}</p>
          <p>{name}</p>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;



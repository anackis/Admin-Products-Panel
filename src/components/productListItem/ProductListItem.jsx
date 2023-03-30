

import './productListItem.scss';

const ProductListItem = (props) => {
 const {id, sku, name, price, size, height, width, length, weight} = props.product
 const handleCheck = props.handleCheck

  return (
    <div className="product-list-item">
      <input onChange={() => handleCheck(id)} className='delete-checkbox product-list-item__checkbox' type="checkbox" name="checkbox"></input>
        <div className="product-list-item__content">
          <p>{sku}</p>
          <p>{name}</p>
          <p>{price} $</p>
          <p className={size === null ? "hidden" : ""}>Size: {size}</p>
          <p className={height === null ? "hidden" : ""}>Dimensions: {height}x{width}x{length}</p>
          <p className={weight === null ? "hidden" : ""}>Weight: {weight}</p>
        </div>
    </div>
  );
};

export default ProductListItem;



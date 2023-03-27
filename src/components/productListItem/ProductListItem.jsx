

import './productListItem.scss';

const ProductListItem = () => {
  return (
    <div className="product-list-item">
      <input type="checkbox" name="checkbox"></input>
      <div className="product-list-item__wrapper">
        <h2>Hello ProductListItem</h2>
      </div>
    </div>
  );
};

export default ProductListItem;
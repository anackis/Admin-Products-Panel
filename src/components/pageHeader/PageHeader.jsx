


import './pageHeader.scss';

const PageHeader = () => {
  return (
    <div className="header">
      <div className="header__wrapper">
        <h2>Product List</h2>
        <div className="header__buttons">
          <button className='header__button'>ADD</button>
          <button className='header__button'>MASS DELETE</button>
        </div>
      </div>
      <div className="header__divider"></div>
    </div>
  );
};

export default PageHeader;
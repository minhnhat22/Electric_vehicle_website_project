import React from 'react';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent'; 
import './Style.scss';

const HomePage = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <div className="product-row">

        <ProductListComponent 
          parentTypeId={1} 
          title="XE MÁY ĐIỆN" 
          productsPerPage={4} 
        />
        <ProductListComponent 
          parentTypeId={2} 
          title="XE ĐẠP ĐIỆN" 
          productsPerPage={4} 
        />
        <ProductListComponent 
          parentTypeId={3} 
          title="ÁC QUY" 
          productsPerPage={4} 
        />
        <ProductListComponent 
        parentTypeId={4} 
        title="PHỤ TÙNG" 
        productsPerPage={4} 
        />
      </div>
    </div>
  );
};

export default HomePage;
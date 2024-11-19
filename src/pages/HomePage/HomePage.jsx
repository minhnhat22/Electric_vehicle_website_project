import React from 'react';
import ProductListComponent from '../../components/ProductListComponent/ProductListComponent'; // Sử dụng component tái sử dụng
import './Style.scss';

const HomePage = () => {
  return (
    <div style={{ marginBottom: '200px' }}>
      <div className="product-row">
        {/* Hiển thị Xe Máy Điện */}
        <ProductListComponent 
          parentTypeId={1} 
          title="XE MÁY ĐIỆN" 
          productsPerPage={4} 
        />

        {/* Hiển thị Xe Đạp Điện */}
        <ProductListComponent 
          parentTypeId={2} 
          title="XE ĐẠP ĐIỆN" 
          productsPerPage={4} 
        />

        {/* Hiển thị Xe Đạp Điện */}
        <ProductListComponent 
          parentTypeId={3} 
          title="ÁC QUY" 
          productsPerPage={4} 
        />

        {/* Hiển thị Xe Đạp Điện */}
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

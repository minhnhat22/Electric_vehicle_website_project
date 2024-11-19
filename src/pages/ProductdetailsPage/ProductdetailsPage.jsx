import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Space, Tabs, Typography, Radio } from 'antd';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import './Style.scss';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const ProductdetailsPage = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [data, setData] = useState(null); // Lưu dữ liệu API
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [selectedImage, setSelectedImage] = useState(null); // Hình ảnh được chọn
  const [selectedColorName, setSelectedColorName] = useState(''); // Màu sắc được chọn

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/productdetails/${productId}`);
        const result = await response.json();
        console.log('API Response:', result); // Log dữ liệu trả về từ API
        if (result.success) {
          setData(result.data); // Gán dữ liệu vào state
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  
  useEffect(() => {
    console.log('State data:', data); // Log dữ liệu sau khi state thay đổi
  }, [data]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Không tìm thấy dữ liệu sản phẩm.</div>;
  }

  // Lấy dữ liệu từ API
  const { product, imagesAndColors, dimensionsAndWeight, engine, battery, otherSpecs, reviewArticles } = data;

  return (
    <Space direction="vertical" className="product-details-page" size="large">
      {/* Hình ảnh sản phẩm */}
      <Space direction="vertical" size="middle" className="product-images">
        <ImageComponent src={selectedImage} alt={selectedColorName} className="product-image-big" />
        <Radio.Group
          onChange={(e) => {
            const selected = imagesAndColors[0];
            const colorKey = `color_name${e.target.value}`;
            const imageKey = `product_image_${e.target.value}`;
            setSelectedImage(selected[imageKey]);
            setSelectedColorName(selected[colorKey]);
          }}
          defaultValue="1"
          className="product-color-options"
        >
          {['1', '2', '3', '4'].map((key) => (
            imagesAndColors[0][`color_${key}`] && (
              <Radio.Button key={key} value={key} className="color-option">
                <div
                  style={{
                    backgroundColor: imagesAndColors[0][`color_${key}`],
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                  }}
                />
              </Radio.Button>
            )
          ))}
        </Radio.Group>
      </Space>

      {/* Thông tin cơ bản */}
      <Space direction="vertical" className="product-info">
        <Title level={2}>{product.product_name}</Title>
        <Paragraph>Giá gốc: {parseFloat(product.product_price).toLocaleString()} VNĐ</Paragraph>
        {product.discount_percentage > 0 && (
          <Paragraph>Giảm giá: {product.discount_percentage}%</Paragraph>
        )}
        <Paragraph>Số lượng còn: {product.product_quantity}</Paragraph>
      </Space>

      {/* Tabs thông số kỹ thuật và đánh giá */}
      <Tabs>
        <TabPane tab="Thông số kỹ thuật" key="1">
          <Space direction="vertical" className="product-specs">
            <Title level={3}>Kích thước và trọng lượng</Title>
            <Paragraph>Kích thước: {dimensionsAndWeight.dimensions}</Paragraph>
            <Paragraph>Màn hình: {dimensionsAndWeight.screen}</Paragraph>
            <Paragraph>Trọng lượng: {dimensionsAndWeight.self_weight}kg</Paragraph>
            <Paragraph>Sức tải tối đa: {dimensionsAndWeight.max_load_capacity}kg</Paragraph>
            <Paragraph>Dung tích cốp: {dimensionsAndWeight.trunk_capacity}L</Paragraph>

            <Title level={3}>Động cơ</Title>
            <Paragraph>Loại động cơ: {engine.engine_type}</Paragraph>
            <Paragraph>Công suất danh định: {engine.nominal_power}W</Paragraph>
            <Paragraph>Tốc độ tối đa: {engine.max_speed}km/h</Paragraph>

            <Title level={3}>Ắc quy</Title>
            <Paragraph>Loại: {battery.battery_type}</Paragraph>
            <Paragraph>Thời gian sạc: {battery.charging_time}</Paragraph>
          </Space>
        </TabPane>
        <TabPane tab="Đánh giá sản phẩm" key="2">
          {reviewArticles.map((article, index) => (
            <Space direction="vertical" key={index} className="review-article">
              <Title level={4}>{article[`title_${index + 1}`]}</Title>
              <Paragraph>{article[`content_${index + 1}`]}</Paragraph>
              {article[`image_${index + 1}`] && (
                <ImageComponent
                  src={article[`image_${index + 1}`]}
                  alt={`Đánh giá ${index + 1}`}
                  className="review-image"
                />
              )}
            </Space>
          ))}
        </TabPane>
      </Tabs>

      {/* Nút mua sản phẩm */}
      <ButtonComponent
        className="order-button"
        type="primary"
        buttonText="Chọn mua sản phẩm"
        href="/orders"
      />
    </Space>
  );
};

export default ProductdetailsPage;

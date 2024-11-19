import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typography, Spin } from 'antd';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import './Style.scss';

const { Title, Paragraph } = Typography;

const Storecriteriapage = () => {
  const [criteria, setCriteria] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCriteria = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/criteria');
      setCriteria(response.data);
    } catch (error) {
      setError('Lỗi khi tải dữ liệu tiêu chí');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });

    fetchCriteria();
  }, [fetchCriteria]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="news-page">
      <Title level={3} data-aos="fade-up">Các tiêu chí đảm bảo chất lượng sản phẩm của công ty chúng tôi</Title>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        criteria.map((item, index) => (
          <div
            key={item.criteria_id}
            className={`news-item ${index % 2 === 0 ? 'content-first' : 'image-first'}`}
          >
            <div
              className="news-content"
              data-aos="fade-up"
            >
              <h3 style={{ color: '#1890ff' }}>{item.title}</h3>
              <Paragraph style={{ whiteSpace: 'pre-line' }}>{item.content}</Paragraph>
            </div>
            <div
              className="news-image"
              data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
            >
              {item.image_path && (
                <ImageComponent
                  src={item.image_path}
                  alt={item.title}
                  width={300}
                  preview={false} // Tắt chế độ preview
                />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Storecriteriapage;

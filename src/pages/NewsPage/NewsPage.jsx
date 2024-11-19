import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typography, Button, Spin, Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import './Style.scss';

const { Title, Paragraph } = Typography;

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/news');
      setNewsList(response.data.newsList || []);
    } catch (error) {
      setError('Lỗi khi tải dữ liệu tin tức');
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

    fetchNews();
  }, [fetchNews]);

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);

  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="news-page">
      <Title level={3} data-aos="fade-up">Tin Tức</Title>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        currentNews.length > 0 ? (
          currentNews.map((news) => (
            <div
              key={news.news_id}
              className="news-item"
              data-aos="fade-up"
            >
              <div className="news-image">
                {news.news_image && (
                  <ImageComponent
                    src={news.news_image}
                    alt={news.news_title}
                    width={600}
                    preview={false}
                  />
                )}
              </div>
              <div className="news-content">
                <h3>{news.news_title}</h3>
                <Paragraph ellipsis={{ rows: 3, expandable: false }}>
                  {news.news_content}
                </Paragraph>
                <Button type="primary">XEM THÊM</Button>
              </div>
            </div>
          ))
        ) : (
          <p>Không có tin tức nào để hiển thị.</p>
        )
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <Pagination
            current={currentPage}
            total={newsList.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
            itemRender={(page, type, originalElement) => {
              if (type === 'prev') {
                return <Button icon={<LeftOutlined />} disabled={currentPage === 1} />;
              }
              if (type === 'next') {
                return <Button icon={<RightOutlined />} disabled={currentPage === totalPages} />;
              }
              return (
                <Button
                  type={currentPage === page ? 'primary' : 'default'}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            }}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;

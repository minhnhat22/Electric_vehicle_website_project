import React from 'react';
import { Form, Input, Button, Typography, Space, Col} from 'antd';

import './Style.scss';

const { Title } = Typography;


const ViewInvoicePage = () => {

  const applyDiscount = (values) => {
    console.log('Discount code applied:', values.discountCode);
  };
    

  return (
    <Space className='all-product-details'>
        <Space className='product-details'>
            <Space>
            <Col xs={24} lg={16}>
            <Space direction="vertical" className="customer-form-container">
  
              <Title level={3} className="section-title">Xem thông tin đơn hàng</Title>

            {/* Form nhập mã giảm giá */}
            <Form layout="inline" onFinish={applyDiscount} className="discount-code-form">
              <Form.Item
                name="discountCode"
                label="Nếu bạn có mã đơn hàng, vui lòng điền vào đây để xem thông tin đơn hàng: "
                className="discount-code-label"
              >
                <Input placeholder="Mã đơn hàng" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="apply-button">
                  Xem
                </Button>
              </Form.Item>
            </Form>

             {/* hhhh*/} 


            </Space>
          </Col>
            </Space>
        </Space>
    </Space>
  )
}

export default ViewInvoicePage
import React from 'react';
import CardInfo from './component/CardInfo';
import { Col, Row } from 'antd';
import RevenueChart from './component/RevenueChart';
import ProductSellerBarChart from './component/ProductSellerBarChart';
import RecentOrder from './component/RecentOrder';
import ProductBestSeller from './component/ProductBestSeller';

const Dashboard = () => {
  return (
    <>
      <div>
        <CardInfo />
        <div className="my-8">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <RevenueChart />
            </Col>

            <Col span={12}>
              <ProductSellerBarChart />
            </Col>
          </Row>
        </div>

        <div className="my-8">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <RecentOrder />
            </Col>

            <Col span={12}>
              <ProductBestSeller />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

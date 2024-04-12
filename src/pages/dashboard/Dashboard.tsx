import React from 'react';
import CardInfo from './component/CardInfo';
import { Col, Row } from 'antd';
import RevenueChart from './component/RevenueChart';

const Dashboard = () => {
  return (
    <>
      <div>
        <CardInfo />
        <RevenueChart />
        {/* <div>
          <Row gutter={[16, 16]}>
            <Col span={12}></Col>
          </Row>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;

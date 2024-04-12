import { Col, Row } from 'antd';
import { AppstoreOutlined, ShoppingCartOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import BoxCard from '@/components/BoxCard';
import { getTotalQuantityOrderProductApi } from '@/api/order-product.api';
import { useAppDispatch } from '@/app/hook';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';
import { getTotalOrderApi, getTotalRevenueApi } from '@/api/order.api';
import { getTotalUserApi } from '@/api/user.api';

const CardInfo = () => {
  const dispatch = useAppDispatch();

  const [totalProductSeller, setTotalProductSeller] = useState<number>(0);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  const getTotalQuantityOrderProduct = async () => {
    try {
      const res = await getTotalQuantityOrderProductApi();
      setTotalProductSeller(res.data);
    } catch (error) {
      dispatch(openNotification({ message: getMsgErrorApi(error), description: 'error', type: 'error' }));
    }
  };

  const getTotalOrder = async () => {
    try {
      const res = await getTotalOrderApi();
      setTotalOrder(res.data);
    } catch (error) {
      dispatch(openNotification({ message: getMsgErrorApi(error), description: 'error', type: 'error' }));
    }
  };

  const getTotalUser = async () => {
    try {
      const res = await getTotalUserApi();
      setTotalUser(res.data);
    } catch (error) {
      dispatch(openNotification({ message: getMsgErrorApi(error), description: 'error', type: 'error' }));
    }
  };

  const getTotalRevenue = async () => {
    try {
      const res = await getTotalRevenueApi();
      setTotalRevenue(res.data);
    } catch (error) {
      dispatch(openNotification({ message: getMsgErrorApi(error), description: 'error', type: 'error' }));
    }
  };

  useEffect(() => {
    getTotalQuantityOrderProduct();
    getTotalOrder();
    getTotalUser();
    getTotalRevenue();
  }, []);

  return (
    <>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <BoxCard
              title="Total Product Seller"
              content={totalProductSeller.toLocaleString('en-US')}
              icon={<AppstoreOutlined />}
              color={'#65edc9'}
            />
          </Col>

          <Col span={6}>
            <BoxCard
              title="Total Order"
              content={totalOrder.toLocaleString('en-US')}
              icon={<ShoppingCartOutlined />}
              color={'#ffc266'}
            />
          </Col>

          <Col span={6}>
            <BoxCard
              title="Total User"
              content={totalUser.toLocaleString('en-US')}
              icon={<UserOutlined />}
              color={'#b366ff'}
            />
          </Col>

          <Col span={6}>
            <BoxCard
              title="Total Revenue"
              content={totalRevenue.toLocaleString('en-US') + ' VND'}
              icon={<PieChartOutlined />}
              color={'#80ffe5'}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CardInfo;

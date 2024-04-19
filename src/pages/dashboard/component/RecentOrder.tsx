import { useAppDispatch, useAppSelector } from '@/app/hook';
import ChipOrderStatus from '@/components/ChipOrderStatus';
import ChipShippingMethod from '@/components/ChipShippingMethod';
import { filterOrderAsync } from '@/features/order/order.slice';
import { OrderStatusModels } from '@/model/order-status.model';
import { OrderDetailModels } from '@/model/order.model';
import { ShippingMethodModels } from '@/model/shipping-method.model';
import { UserPaymentModel } from '@/model/user.model';
import { Button } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentOrder = () => {
  const columns: ColumnsType<OrderDetailModels> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (value: any) => <span className="font-bold">{value}</span>,
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (value: any) => <span>{new Date(value).toLocaleString('vi-VN')}</span>,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (values: OrderStatusModels) => <ChipOrderStatus status={values?.status} />,
    },
    {
      title: 'Shipping Method',
      dataIndex: 'shippingMethod',
      key: 'shippingMethod',
      render: (values: ShippingMethodModels) => <ChipShippingMethod shippingMethod={values?.method} />,
    },
    {
      title: 'Payment Method',
      dataIndex: 'userPayment',
      key: 'userPayment',
      render: (values: UserPaymentModel) => {
        return <span>{values?.paymentType?.type}</span>;
      },
    },
    {
      title: 'Order Total',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      render: (value: any) => <span className="font-semibold">{value?.toLocaleString('en-US')} VND</span>,
    },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderDetails = useAppSelector((state) => state?.order?.orderDetails);

  const params = {
    page: 0,
    size: 5,
  };

  useEffect(() => {
    const body = {
      orderDate: '',
    };
    dispatch(filterOrderAsync({ body, params }));
  }, []);

  const handleClickBtnViewAll = () => {
    navigate('/order');
  };

  return (
    <>
      <div>
        <h2 className="text-gray-500">Recent Orders</h2>
        <Table columns={columns} dataSource={orderDetails} pagination={false} />
        <Button onClick={handleClickBtnViewAll}>View All Orders</Button>
      </div>
    </>
  );
};

export default RecentOrder;

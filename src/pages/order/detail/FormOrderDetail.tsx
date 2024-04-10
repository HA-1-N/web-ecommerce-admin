import { Tabs, TabsProps } from 'antd';
import React, { useEffect } from 'react';
import OrderProductDetail from './OrderProductDetail';
import ShippingAddress from './ShippingAddress';
import { OrderDetailModels } from '@/model/order.model';
import { useParams } from 'react-router-dom';
import { getOrderByIdApi } from '@/api/order.api';
import { useAppDispatch } from '@/app/hook';
import { openNotification } from '@/features/counter/counterSlice';
import { getMsgErrorApi } from '@/utils/form.util';

const FormOrderDetail = () => {
  const params = useParams();
  const getId = Number(params.id);
  const dispatch = useAppDispatch();

  const [orderDetail, setOrderDetail] = React.useState<OrderDetailModels>({} as OrderDetailModels);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Order Product',
      children: <OrderProductDetail orderDetail={orderDetail} />,
    },
    {
      key: '2',
      label: 'Shipping Address',
      children: <ShippingAddress orderDetail={orderDetail} />,
    },
  ];

  const getOrderDetail = async () => {
    try {
      const response = await getOrderByIdApi(getId);
      setOrderDetail(response.data);
    } catch (error) {
      dispatch(openNotification({ type: 'error', message: getMsgErrorApi(error) }));
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default FormOrderDetail;

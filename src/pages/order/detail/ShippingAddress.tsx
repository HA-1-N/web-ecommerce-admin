import { OrderDetailModels } from '@/model/order.model';
import React from 'react';

interface ShippingAddressProps {
  orderDetail: OrderDetailModels;
}

const ShippingAddress = (props: ShippingAddressProps) => {
  const { orderDetail } = props;

  const BoxInfo = ({ title, content }: { title: string; content: any }) => (
    <div>
      <span className="text-base font-bold">{title}: </span>
      <span className="text-base">{content}</span>
    </div>
  );
  return (
    <>
      <h2>Shipping Address</h2>
      <div>
        <BoxInfo title="Name" content={orderDetail?.userAddress?.name} />
        <BoxInfo title="Address" content={orderDetail?.userAddress?.address} />
        <BoxInfo title="City" content={orderDetail?.userAddress?.city} />
        <BoxInfo title="Country" content={orderDetail?.userAddress?.country} />
        <BoxInfo title="Phone" content={orderDetail?.userAddress?.phone} />
        <BoxInfo title="Prefix" content={orderDetail?.userAddress?.prefix} />
        <BoxInfo title="Note" content={orderDetail?.userAddress?.note} />
      </div>
    </>
  );
};

export default ShippingAddress;

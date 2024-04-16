import { Tag } from 'antd';
import React from 'react';

interface ChipShippingMethodProps {
  shippingMethod?: string;
}

const ChipShippingMethod = (props: ChipShippingMethodProps) => {
  const { shippingMethod } = props;

  switch (shippingMethod) {
    case 'Free shipping':
      return <Tag color="green">{shippingMethod}</Tag>;
    case 'Same day shipping':
      return <Tag color="volcano">{shippingMethod}</Tag>;
    default:
      return <Tag color="magenta">{shippingMethod}</Tag>;
  }
};

export default ChipShippingMethod;

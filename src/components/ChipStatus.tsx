import { Tag } from 'antd';

export const ChipStatus = ({ value }: { value: number }) => {
  switch (value) {
    case 0:
      return <Tag color="error">Out of Stock</Tag>;
    case 1:
      return <Tag color="success">Stocking</Tag>;
    default:
      return <Tag color="default">Loading</Tag>;
  }
};

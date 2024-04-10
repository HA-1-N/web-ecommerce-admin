import React from 'react';

interface ChipOrderStatusProps {
  status?: string;
}

const ChipOrderStatus = (props: ChipOrderStatusProps) => {
  const { status } = props;
  switch (status) {
    case 'Pending':
      return <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">{status}</span>;
    case 'Processing':
      return <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">{status}</span>;
    case 'Delivered':
      return <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">{status}</span>;
    case 'Cancelled':
      return <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs">{status}</span>;
    default:
      return <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs">{status}</span>;
  }
};

export default ChipOrderStatus;

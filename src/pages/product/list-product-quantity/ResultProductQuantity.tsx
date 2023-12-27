import { ProductQuantityModels } from '@/model/product.model';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';

const ResultProductQuantity = () => {
  const columns: ColumnsType<ProductQuantityModels> = [];

  return (
    <>
      <div className="mt-10">
        <Table columns={columns} dataSource={[]} pagination={false} scroll={{ x: 1500 }} bordered rowKey="id" />
      </div>
    </>
  );
};

export default ResultProductQuantity;

import { Spin } from 'antd';
import React from 'react';

interface SpinnerProps {
  open: boolean;
}

const Spinner = (props: SpinnerProps) => {
  const { open } = props;
  return (
    <>
      {open && (
        <div
          className="fixed inset-x-0 inset-y-0 w-full h-full flex items-center justify-center z-50"
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
        >
          <Spin size="large" spinning={open} />
        </div>
      )}
    </>
  );
};

export default Spinner;

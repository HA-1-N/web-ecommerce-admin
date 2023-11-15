import React from 'react';

interface BoxContainerProps {
  children: React.ReactNode;
}

const BoxContainer = (props: BoxContainerProps) => {
  const { children } = props;

  return (
    <div
      className="p-4 bg-white my-4"
      style={{
        boxShadow:
          '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        borderRadius: '5px',
      }}
    >
      {children}
    </div>
  );
};

export default BoxContainer;

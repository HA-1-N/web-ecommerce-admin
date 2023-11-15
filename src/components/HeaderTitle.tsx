import React from 'react';

interface HeaderTitleProps {
  title?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const HeaderTitle = (props: HeaderTitleProps) => {
  const { title, children, ...rest } = props;
  return (
    <header {...rest}>
      <h2 className="m-0">{title}</h2>
      <div>{children}</div>
    </header>
  );
};

export default HeaderTitle;

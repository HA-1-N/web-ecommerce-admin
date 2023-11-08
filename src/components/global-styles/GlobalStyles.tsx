import React from 'react';
import './GlobalStyles.scss';

interface GlobalStylesProps {
  children: React.ReactNode;
}

const GlobalStyles = (props: GlobalStylesProps) => {
  const { children } = props;

  return <>{children}</>;
};

export default GlobalStyles;

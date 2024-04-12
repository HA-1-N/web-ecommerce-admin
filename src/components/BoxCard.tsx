import { Card } from 'antd';
import React from 'react';

interface BoxCardProps {
  title: string;
  content: string;
  icon: any;
  color: any;
  [key: string]: unknown;
}

const BoxCard = (props: BoxCardProps) => {
  const { icon, title, color, content } = props;

  return (
    <>
      <Card className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-20 w-1 rounded-sm" style={{ backgroundColor: color }}></div>
            <div className="ml-6">
              <div className="text-xl font-medium" style={{ color: '#9a9a9a' }}>
                {title}
              </div>
              <div className="text-lg font-bold" style={{ color: '#4a5568' }}>
                {content}
              </div>
            </div>
          </div>
          <div className="text-4xl" style={{ color: color }}>
            {icon}
          </div>
        </div>
      </Card>
    </>
  );
};

export default BoxCard;

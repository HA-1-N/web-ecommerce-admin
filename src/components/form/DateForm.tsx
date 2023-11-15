import { DatePicker, Form } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import React from 'react';

interface DateFormProps {
  label?: string;
  name?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  hasFeedback?: boolean | undefined;
  [key: string]: unknown;
}

const DateForm = (props: DateFormProps) => {
  const { label, name, rules, size = 'large', hasFeedback = false, ...rest } = props;

  return (
    <Form.Item label={label} name={name} rules={rules} hasFeedback={hasFeedback}>
      <DatePicker size={size} className="w-full" {...rest} />
    </Form.Item>
  );
};

export default DateForm;

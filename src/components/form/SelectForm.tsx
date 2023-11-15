import { Form, Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import React from 'react';

interface SelectFormProps {
  label?: string;
  placeholder?: string;
  name?: string;
  rules?: Rule[] | undefined;
  hasFeedback?: boolean | undefined;
  options?: DefaultOptionType[] | undefined;
  size?: SizeType;
  [key: string]: unknown;
}

const SelectForm = (props: SelectFormProps) => {
  const { label, name, placeholder, rules, hasFeedback = false, options, size = 'large', ...rest } = props;

  return (
    <Form.Item name={name} label={label} rules={rules} hasFeedback={hasFeedback}>
      <Select size={size} placeholder={placeholder} options={options} {...rest} />
    </Form.Item>
  );
};

export default SelectForm;

import { Form, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import React from 'react';

interface TextAreaFormProps {
  label?: string;
  placeholder?: string;
  name?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  [key: string]: unknown;
}

const TextAreaForm = (props: TextAreaFormProps) => {
  const { label, name, placeholder, rules, size = 'large', ...rest } = props;

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input.TextArea size={size} {...rest} />
    </Form.Item>
  );
};

export default TextAreaForm;

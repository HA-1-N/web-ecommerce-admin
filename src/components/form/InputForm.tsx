import { Form, Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import React from 'react';

interface InputFormProps {
  label?: string;
  name?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  hasFeedback?: boolean | undefined;
  [key: string]: unknown;
}

const InputForm = (props: InputFormProps) => {
  const { label, name, rules, size = 'large', hasFeedback = false, ...rest } = props;

  return (
    <Form.Item label={label} name={name} rules={rules} hasFeedback={hasFeedback}>
      <Input size={size} {...rest} />
    </Form.Item>
  );
};

export default InputForm;

import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Form, { Rule } from 'antd/es/form';
import React from 'react';

interface InputPasswordFormProps {
  label?: string;
  name?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  hasFeedback?: boolean | undefined;
  dependencies?: string[] | undefined;
  [key: string]: any;
}

const InputPasswordForm = (props: InputPasswordFormProps) => {
  const { label, name, rules, size, dependencies, hasFeedback = false, ...rest } = props;

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} hasFeedback={hasFeedback}>
      <Input.Password size={size} {...rest} />
    </Form.Item>
  );
};

export default InputPasswordForm;

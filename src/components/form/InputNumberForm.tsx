import { InputNumber } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import Form, { Rule } from 'antd/es/form';

interface InputNumberFormProps {
  label?: string;
  name?: string;
  rules?: Rule[] | undefined;
  size?: SizeType;
  hasFeedback?: boolean | undefined;
  dependencies?: string[] | undefined;
  [key: string]: any;
}

const InputNumberForm = (props: InputNumberFormProps) => {
  const { label, name, rules, size, dependencies, hasFeedback = false, ...rest } = props;

  return (
    <Form.Item label={label} name={name} rules={rules} dependencies={dependencies} hasFeedback={hasFeedback}>
      <InputNumber size={size} {...rest} />
    </Form.Item>
  );
};

export default InputNumberForm;

import { OptionModel } from '@/model/option.model';
import { Checkbox, Col, Row } from 'antd';
import Form, { Rule } from 'antd/es/form';
import React from 'react';

interface CheckboxFormProps {
  label?: string;
  name?: string;
  rules?: Rule[] | undefined;
  options?: OptionModel[];
  colSpan?: number;
  [key: string]: unknown;
}

const CheckboxForm = (props: CheckboxFormProps) => {
  const { label, name, options, rules, colSpan } = props;

  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <Checkbox.Group>
          <Row gutter={[16, 16]}>
            {options?.map((option: OptionModel) => (
              <Col span={colSpan} key={option.value}>
                <Checkbox value={option.value} style={{ lineHeight: '32px' }}>
                  {option.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default CheckboxForm;

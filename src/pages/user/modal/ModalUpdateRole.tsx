/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { updateRoleUserApi } from '@/api/auth.api';
import { getAllRoleApi } from '@/api/role.api';
import { useAppDispatch } from '@/app/hook';
import CheckboxForm from '@/components/form/CheckboxForm';
import { openNotification } from '@/features/counter/counterSlice';
import { incrementCountUser } from '@/features/user/user.slice';
import { RoleModel } from '@/model/auth.model';
import { OptionModel } from '@/model/option.model';
import { getMsgErrorApi } from '@/utils/form.util';
import { Button, Checkbox, Col, Form, Modal, Row } from 'antd';
import React, { useEffect, useRef } from 'react';

interface ModalUpdateRoleProps {
  isModalOpen: boolean;
  onCancel: () => void;
  roles: number[];
  id: number | null | undefined;
  [key: string]: unknown;
}

const ModalUpdateRole = (props: ModalUpdateRoleProps) => {
  const { onCancel, isModalOpen, roles, id } = props;

  const dispatch = useAppDispatch();

  const initialValues: any = {
    roles: roles,
  };

  const [optionRoles, setOptionRoles] = React.useState<OptionModel[]>([]);

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const [form] = Form.useForm();

  const getAllRole = async () => {
    try {
      const res = await getAllRoleApi();
      const options = res.data.map((role: RoleModel) => ({
        label: role.text,
        value: role.id,
      }));
      setOptionRoles(options);
    } catch (error) {
      dispatch(openNotification({ message: getMsgErrorApi(error), type: 'error' }));
    }
  };

  useEffect(() => {
    form.setFieldValue('roles', roles);
  }, [id]);

  useEffect(() => {
    getAllRole();
  }, []);

  const handleOk = () => {
    btnRef.current.click();
  };

  const onFinish = async (values: any) => {
    const body = {
      roleIds: values?.roles,
    };
    try {
      const res = await updateRoleUserApi(id, body);
      if (res) {
        dispatch(incrementCountUser());
        dispatch(
          openNotification({
            message: 'Update role successfully',
            type: 'success',
          }),
        );
        onCancel();
        form.resetFields();
      }
    } catch (error) {
      dispatch(
        openNotification({
          message: getMsgErrorApi(error),
          type: 'error',
        }),
      );
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Update Role"
        open={isModalOpen}
        onCancel={onCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} className="w-28">
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel} className="w-28">
            Cancel
          </Button>,
        ]}
      >
        <div>
          <Form
            name="basic"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: '100%' }}
            autoComplete="off"
            colon={false}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
            form={form}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CheckboxForm colSpan={12} label="Roles" name="roles" options={optionRoles} />
              </Col>
            </Row>

            <Form.Item className="hidden" wrapperCol={{ offset: 8, span: 8 }}>
              <Button type="primary" size="large" htmlType="submit" className="w-32" ref={btnRef}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateRole;

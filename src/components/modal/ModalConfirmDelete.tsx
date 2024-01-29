import { Button, Modal } from 'antd';
import React, { useRef } from 'react';

interface ModalConfirmDeleteProps {
  isModalOpen: boolean;
  onCancel: () => void;
  deleteFunc: () => void;
  title: string;
  titleName: string;
  [key: string]: unknown;
}

const ModalConfirmDelete = (props: ModalConfirmDeleteProps) => {
  const { deleteFunc, isModalOpen, onCancel, title, titleName } = props;

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    deleteFunc();
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk} className="w-28">
          Submit
        </Button>,
        <Button key="back" onClick={handleCancel} className="w-28">
          Cancel
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <p>Do you want to delete this {titleName}? </p>
      <Button ref={btnRef} onClick={handleSubmit} className="hidden">
        Submit
      </Button>
    </Modal>
  );
};

export default ModalConfirmDelete;

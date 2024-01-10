import { Button, Modal } from 'antd';
import React, { useRef } from 'react';

interface ModalDeleteBrandProps {
  isModalOpen: boolean;
  onCancel: () => void;
  deleteBrand: () => void;
  [key: string]: unknown;
}

const ModalDeleteBrand = (props: ModalDeleteBrandProps) => {
  const { isModalOpen, onCancel, deleteBrand } = props;

  const btnRef = useRef<HTMLButtonElement | HTMLInputElement | null | any>(null);

  const handleOk = () => {
    btnRef.current.click();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = () => {
    deleteBrand();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Delete Brand"
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
        <p>Do you want to delete this brand? </p>
        <Button ref={btnRef} onClick={handleSubmit} className="hidden">
          Submit
        </Button>
      </Modal>
    </>
  );
};

export default ModalDeleteBrand;

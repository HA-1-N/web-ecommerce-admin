import { Breadcrumb, Button } from 'antd';
import React, { useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import BoxContainer from '@/components/BoxContainer';
import HeaderTitle from '@/components/HeaderTitle';
import ResultHotCategoryProductDetail from './ResultHotCategoryProductDetail';
import ModalAddHotProductCategory from '../modal/ModalAddHotProductCategory';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hook';
import { findHotCategoryByIdAsync } from '@/features/hot-category/hot-category.slice';

const HotCategoryProductDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params?.id);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  useEffect(() => {
    dispatch(findHotCategoryByIdAsync(id));
  }, []);

  const handleClickCreate = () => {
    setIsOpenModal(true);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <ModalAddHotProductCategory isOpen={isOpenModal} onCancel={handleCancel} />
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            {
              title: (
                <Link to={'/'}>
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: <Link to={'/hot-category/list-hot-category'}>List Hot Category</Link>,
            },
            {
              title: 'Hot Category Product Detail',
            },
          ]}
        />

        <Button className="w-auto" onClick={handleClickCreate}>
          Add Product Hot Category
        </Button>
      </div>
      <BoxContainer>
        <HeaderTitle title="List Hot Category Product" />
        <ResultHotCategoryProductDetail />
      </BoxContainer>
    </>
  );
};

export default HotCategoryProductDetail;

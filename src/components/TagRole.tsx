import { ROLE_CONSTANT_ENUM } from '@/constants/auth.constant';
import { RoleModel } from '@/model/auth.model';
import { Tag } from 'antd';
import React from 'react';
interface TagRoleProps {
  code?: string;
  text?: string;
}

const TagRole = (props: TagRoleProps) => {
  const { code, text } = props;

  switch (code) {
    case ROLE_CONSTANT_ENUM.ADMIN:
      return <Tag color="success">{text}</Tag>;
    case ROLE_CONSTANT_ENUM.USER:
      return <Tag color="gold">{text}</Tag>;
    case ROLE_CONSTANT_ENUM.SHIPPER:
      return <Tag color="cyan">{text}</Tag>;
    default:
      return <Tag color="default">{text}</Tag>;
  }
};

export default TagRole;

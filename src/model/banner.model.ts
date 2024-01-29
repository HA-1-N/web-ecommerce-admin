import { UploadFile } from 'antd';

export interface BannerModels {
  id?: number;
  title?: string;
  image?: string;
  status?: number;
  link?: string;
  content?: string;
  position?: string;
}

export interface CreateBannerModels {
  title?: string;
  image?: string | UploadFile;
  status?: number;
  link?: string;
  content?: string;
  position?: string;
}

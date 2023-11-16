export const getMsgErrorApi = (error: any) => {
  return error && error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : 'Có lỗi xảy ra với hệ thống';
};

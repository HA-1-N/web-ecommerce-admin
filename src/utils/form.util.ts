export const getMsgErrorApi = (error: any) => {
  return error && error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : 'Có lỗi xảy ra với hệ thống';
};

export const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

export const appendFileFormData = (formData: FormData, files: File[] | any, name: string) => {
  for (let index = 0; index < files?.length; index++) {
    const element = files[index];
    formData.append(name, element);
  }
};

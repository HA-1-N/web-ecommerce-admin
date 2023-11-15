export const ConvertGender = (value: string) => {
  if (value === 'M') {
    return 'Male';
  } else if (value === 'F') {
    return 'Female';
  } else {
    return 'Other';
  }
};

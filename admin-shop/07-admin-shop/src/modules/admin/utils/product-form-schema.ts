import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('').min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  sizes: yup.array().required(),
  gender: yup.string().required().oneOf(['kid', 'women', 'men']),
  tags: yup.array().required(),
  images: yup.array().required(),
});

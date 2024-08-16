import { useFieldArray, useForm } from 'vee-validate';
import { validationSchema } from './product-form-schema';

export const formValues = () => {
  const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
    validationSchema: validationSchema,
  });

  const [title, titleAttrs] = defineField('title');
  const [price, priceAttrs] = defineField('price');
  const [description, descriptionAttrs] = defineField('description');
  const [slug, slugAttrs] = defineField('slug');
  const [stock, stockAttrs] = defineField('stock');
  const [gender, genderAttrs] = defineField('gender');
  const [tags, tagsAttrs] = defineField('tags');

  const { fields: sizes, remove: removeSize, push: addSize } = useFieldArray<string>('sizes');
  const { fields: images } = useFieldArray<string>('images');

  const toggleSize = (size: string) => {
    const currentSizes = sizes.value.map((s) => s.value);
    const hasSize = currentSizes.includes(size);

    hasSize ? removeSize(currentSizes.indexOf(size)) : addSize(size);
  };

  return {
    values,
    title,
    titleAttrs,
    price,
    priceAttrs,
    description,
    descriptionAttrs,
    slug,
    slugAttrs,
    stock,
    stockAttrs,
    gender,
    genderAttrs,
    tags,
    tagsAttrs,
    meta,

    sizes,
    images,

    errors,

    // Actions
    handleSubmit,
    toggleSize,
    resetForm,
    hasSize: (size: string) => sizes.value.map((s) => s.value).includes(size),
  };
};

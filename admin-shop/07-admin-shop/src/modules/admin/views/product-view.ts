import { defineComponent, ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import { getProductById } from '@/modules/products/actions';
import { useRouter } from 'vue-router';
import type { Product } from '@/modules/products/interfaces';

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().min(1).required(),
  sizes: yup.array().required(),
  gender: yup.string().required().oneOf(['kid', 'women', 'men']),
  tags: yup.array().required(),
  images: yup.array().required(),
});

export default defineComponent({
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const myForm = ref<Product | null>(null);

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', { id: props.productId }],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });
    const { values, defineField, errors } = useForm({
      validationSchema: validationSchema,
    });

    const [title, titleAttrs] = defineField('title');
    const [price, priceAttrs] = defineField('price');
    const [description, descriptionAttrs] = defineField('description');
    const [slug, slugAttrs] = defineField('slug');
    const [stock, stockAttrs] = defineField('stock');
    const [sizes, sizesAttrs] = defineField('sizes');
    const [gender, genderAttrs] = defineField('gender');
    const [tags, tagsAttrs] = defineField('tags');
    const [images, imagesAttrs] = defineField('images');

    watchEffect(() => {
      if (!isLoading.value && isError.value) {
        router.replace({ name: 'admin-products' });
      }

      myForm.value = product.value!;
    });

    return {
      // properties
      product,
      myForm,
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
      sizes,
      sizesAttrs,
      gender,
      genderAttrs,
      tags,
      tagsAttrs,
      images,
      imagesAttrs,
      errors,
      //Getters

      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      // Actions
    };
  },
});

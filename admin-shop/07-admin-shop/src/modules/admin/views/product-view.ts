import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';

import { createUpdateProductAction, getProductById } from '@/modules/products/actions';
import { useRouter } from 'vue-router';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';
import { useToast } from 'vue-toastification';
import { formValues } from '../utils';

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', { id: props.productId }],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
      isPending,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const { resetForm, handleSubmit, ...formv } = formValues();

    const imageFiles = ref<File[]>([]);

    const onSubmit = handleSubmit(async (values) => {
      const submitValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      mutate(submitValues);
    });

    const onFileChange = (e: Event) => {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;

      if (!files || files.length === 0) return;

      for (const imageFile of files) {
        imageFiles.value.push(imageFile);
      }
    };

    watchEffect(() => {
      if (!isLoading.value && isError.value) {
        router.replace({ name: 'admin-products' });
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      if (props.productId === 'create') {
        router.replace(`/admin/products/${updatedProduct.value?.id}`);
        toast.success('Producto creado correctamente');
        return;
      }
      toast.success('Producto actualizado correctamente');
      resetForm({
        values: updatedProduct.value,
      });
      imageFiles.value = [];
    });

    watch(
      () => props.productId,
      () => refetch(),
    );

    return {
      // properties
      product,
      ...formv,
      imageFiles,
      isPending,

      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      // Actions
      onSubmit,
      onFileChange,
      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      },
    };
  },
});

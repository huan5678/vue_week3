<script>
import { computed, ref, watchEffect } from "vue";
import Api from "../api";
import { useStore } from "../stores";
export default {
  setup() {
    const store = useStore();
    const { handlerModalControl, handlerAdminGetProducts } = store;
    const productData = ref({ ...store.targetProduct });

    watchEffect(() => {
      productData.value = { ...store.targetProduct };
    });

    function handlerProductDelete() {
      const data = {
        method: "delete",
        url: `api/${store.api_path}/admin/product/${productData.value.id}`,
        token: store.tokenStore,
      };
      Api(data)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          handlerModalControl();
          handlerAdminGetProducts();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          handlerModalControl();
        });
    }

    return {
      handlerModalControl,
      isOpenModal: computed(() => store.isOpenModal),
      productData,
      handlerProductDelete,
    };
  },
};
</script>

<template>
  <section class="p-4 space-y-4 container">
    <div class="space-y-3">
      <h2 class="block mb-4">請確認是否刪除</h2>
      <p class="p-2 text-rose-500">{{ productData.title }}</p>
    </div>
    <div class="flex justify-between gap-4">
      <button
        class="flex-auto py-2 bg-teal-500 text-white hover:bg-teal-700 transition duration-300 rounded-md"
        type="button"
        @click="handlerProductDelete"
      >
        確認刪除
      </button>
      <button
        class="flex-auto py-2 bg-orange-500 text-white hover:bg-orange-700 transition duration-300 rounded-md"
        @click="handlerModalControl"
        type="button"
      >
        取消刪除
      </button>
    </div>
  </section>
</template>

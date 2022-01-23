<script>
import { computed } from "vue";
import { useStore } from "../stores";
import ProductEditor from "./ProductEditor.vue";
import DetailContent from "./DetailContent.vue";
export default {
  components: { ProductEditor, DetailContent },
  setup() {
    const store = useStore();
    const { handlerModalControl } = store;
    return {
      targetProduct: computed(() => store.targetProduct),
      selectFunctionType: computed(() => store.selectFunctionType),
      handlerModalControl,
      isOpenModal: computed(() => store.isOpenModal),
    };
  },
};
</script>

<template>
  <section
    class="bg-white rounded-md shadow-md p-4 transition-all duration-500 ease-in-out translate-y-16"
  >
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-medium pl-4">
        {{
          selectFunctionType === "getDetail"
            ? "產品 - 內容細節"
            : selectFunctionType === "productEdit"
            ? "產品 - 內容編輯"
            : "產品 - 項刪除"
        }}
      </h1>
      <button
        type="button"
        class="text-rose-500 p-4 hover:text-rose-700"
        @click="handlerModalControl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-x h-8 w-8"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
    <DetailContent v-if="selectFunctionType === 'getDetail'" />
    <ProductEditor v-if="selectFunctionType === 'productEdit'" />
  </section>
</template>

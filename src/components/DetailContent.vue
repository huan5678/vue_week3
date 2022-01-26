<script>
import { computed } from "vue";
import { useStore } from "../stores";
export default {
  setup() {
    const store = useStore();
    return {
      targetProduct: computed(() => store.targetProduct),
    };
  },
};
</script>
<template>
  <div
    class="rounded overflow-hidden flex flex-col md:flex-row gap-2 justify-between p-4"
  >
    <img
      class="max-h-[300px]"
      :src="targetProduct.imageUrl"
      :alt="targetProduct.title"
    />
    <div class="p-4 flex-1 space-y-8">
      <h2 class="font-bold text-xl mb-2">
        {{ targetProduct.title }}
        <span class="px-2 py-1 ml-2 rounded text-sm bg-primary-400 text-white">
          {{ targetProduct.category }}
        </span>
      </h2>
      <ul class="space-y-4 pb-3">
        <li>商品描述：{{ targetProduct.description }}</li>
        <li>商品內容：{{ targetProduct.content }}</li>
        <li>
          {{ targetProduct.price }}
          <span class="pl-1 text-gray-400 line-through">{{
            targetProduct.origin_price
          }}</span>
          個 / 元
        </li>
      </ul>
    </div>
  </div>
  <div class="p-4 flex gap-4">
    <img
      v-for="img in targetProduct.imagesUrl"
      :key="img"
      class="max-h-64 max-w-[8rem] object-cover flex-1"
      :src="img"
    />
  </div>
</template>

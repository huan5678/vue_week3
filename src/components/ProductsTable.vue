<script>
import { computed } from "vue";
import { useStore } from "../stores";
export default {
  setup() {
    const store = useStore();

    function handlerClickControl(type, item) {
      store.selectFunctionType = type;
      store.targetProduct = item;
      store.handlerModalControl();
    }
    return {
      adminProductList: computed(() => store.adminProductList),
      handlerClickControl,
    };
  },
};
</script>
<template>
  <section>
    <h2 class="text-4xl font-medium mb-8">產品列表</h2>
    <table class="table-auto w-full mb-4 rounded-md border">
      <thead class="border-b-2 border-black">
        <tr>
          <td width="200" class="pb-2 font-bold whitespace-nowrap">產品名稱</td>
          <td width="250" class="pb-2 font-bold whitespace-nowrap text-right">
            原價
          </td>
          <td width="250" class="pb-2 font-bold whitespace-nowrap text-right">
            售價
          </td>
          <td width="250" class="pb-2 font-bold whitespace-nowrap text-center">
            是否啟用
          </td>
          <td width="200" class="pb-2 font-bold whitespace-nowrap text-center">
            查看細節
          </td>
          <td width="200" class="pb-2 font-bold whitespace-nowrap text-center">
            修改
          </td>
          <td width="200" class="pb-2 font-bold whitespace-nowrap text-center">
            刪除
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-300 hover:bg-gray-200"
          v-for="item in adminProductList"
          :key="item.id"
        >
          <td class="py-2 whitespace-nowrap">{{ item.title }}</td>
          <td class="py-2 whitespace-nowrap text-right">
            {{ item.origin_price }}
          </td>
          <td class="py-2 whitespace-nowrap text-right">
            {{ item.price }}
          </td>
          <td
            class="py-2 whitespace-nowrap text-green-700 text-center"
            v-if="item.is_enabled === 1"
          >
            啟用
          </td>
          <td class="py-2 whitespace-nowrap text-gray-400 text-center" v-else>
            未啟用
          </td>
          <td class="py-2 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-blue-500 rounded px-3 py-2 hover:bg-blue-600 transition duration-200"
              @click="handlerClickControl('getDetail', item)"
            >
              查看細節
            </button>
          </td>
          <td class="py-2 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-cyan-500 rounded px-3 py-2 hover:bg-cyan-600 transition duration-200"
              @click="handlerClickControl('productEdit', item)"
            >
              修改內容
            </button>
          </td>
          <td class="py-2 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-rose-500 rounded px-3 py-2 hover:bg-rose-600 transition duration-200"
              @click="handlerClickControl('productDelete', item)"
            >
              刪除品項
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center">
      <p>目前有{{ Object.keys(adminProductList).length }}項產品</p>
      <button
        type="button"
        class="text-white bg-indigo-500 rounded px-3 py-2 hover:bg-indigo-600 transition duration-200"
        @click="handlerClickControl('productCreate')"
      >
        新增品項
      </button>
    </div>
  </section>
</template>

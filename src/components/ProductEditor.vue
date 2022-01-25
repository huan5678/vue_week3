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

    function handlerProductEdit() {
      const data = {
        method: "put",
        url: `api/${store.api_path}/admin/product/${productData.value.id}`,
        token: store.tokenStore,
        data: {
          data: {
            title: productData.value.title,
            category: productData.value.category,
            origin_price: parseInt(productData.value.origin_price),
            price: parseInt(productData.value.price),
            unit: productData.value.unit,
            description: productData.value.description,
            content: productData.value.content,
            is_enabled: productData.value.is_enabled,
            imageUrl: productData.value.imageUrl,
            imagesUrl: productData.value.imagesUrl,
          },
        },
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
      targetProduct: computed(() => store.targetProduct),
      handlerModalControl,
      isOpenModal: computed(() => store.isOpenModal),
      productData,
      handlerProductEdit,
    };
  },
};
</script>

<template>
  <form class="p-4 space-y-4 container max-w-[65vw]">
    <div class="flex justify-between gap-4">
      <div class="w-7/12">
        <div class="flex flex-col justify-between gap-4">
          <div class="flex-1">
            <label for="productMainImage" class="block mb-4">產品主圖片</label>
            <input
              type="text"
              id="productMainImage"
              name="productMainImage"
              class="rounded w-full"
              v-model="productData.imageUrl"
            />
          </div>
          <img
            class="max-h-[50%] object-cover"
            :src="productData.imageUrl"
            alt="產品主圖"
          />
        </div>
      </div>
      <div class="flex-[1_0_0] flex flex-wrap space-between">
        <div class="w-full">
          <label for="productName" class="block mb-4">產品名稱</label>
          <input
            type="text"
            id="productName"
            name="productName"
            class="rounded w-full"
            v-model="productData.title"
          />
        </div>
        <div class="w-full">
          <label for="productContent" class="block mb-4">產品說明</label>
          <input
            type="text"
            id="productContent"
            name="productContent"
            class="rounded w-full"
            v-model="productData.content"
          />
        </div>
        <div class="w-1/2 pr-2">
          <label for="productCategory" class="block mb-4">產品類別</label>
          <select
            class="rounded w-full"
            id="productCategory"
            v-model="productData.category"
          >
            <option value="測試分類">測試分類</option>
            <option value="上衣類">上衣類</option>
            <option value="褲類">褲類</option>
            <option value="裙類">裙類</option>
            <option value="鞋類">鞋類</option>
          </select>
        </div>
        <div class="w-1/2 pl-2">
          <label for="productIsEnable" class="block mb-4">產品啟用狀態</label>
          <select
            class="rounded w-full"
            id="productIsEnable"
            v-model="productData.is_enabled"
          >
            <option value="0">未啟用</option>
            <option value="1">啟用</option>
            <option value="3">未上架</option>
            <option value="4">已下架</option>
          </select>
        </div>
        <div class="w-1/2 pr-2">
          <label for="productOriginPrice" class="block mb-4">產品原價</label>
          <input
            type="text"
            id="productOriginPrice"
            name="productOriginPrice"
            class="rounded w-full"
            v-model="productData.origin_price"
          />
        </div>
        <div class="w-1/2 pl-2">
          <label for="productPrice" class="block mb-4">產品最終價格</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            class="rounded w-full"
            v-model="productData.price"
          />
        </div>
        <div class="flex-1">
          <label for="productUnit" class="block mb-4">產品品項單位</label>
          <input
            type="text"
            id="productUnit"
            name="productUnit"
            class="rounded w-full"
            v-model="productData.unit"
          />
        </div>
      </div>
    </div>
    <ul class="flex flex-wrap justify-around gap-4">
      <li
        class="flex-auto w-2/12 h-full flex flex-col justify-between"
        v-for="(img, idx) in productData.imagesUrl"
        :key="img"
      >
        <img class="object-cover flex-1 max-h-24" :src="img" :alt="img" />
        <label :for="'productImage' + [idx]" class="block"
          >產品附屬圖片 - {{ idx + 1 }}</label
        >
        <input
          type="text"
          :id="'productImage' + [idx]"
          :name="'productImage' + [idx]"
          class="rounded w-full"
          v-model="productData.imagesUrl[idx]"
        />
      </li>
    </ul>
    <div class="">
      <label for="productDescription" class="block mb-4">產品描述</label>
      <textarea
        id="productDescription"
        name="productDescription"
        class="rounded w-full"
        v-model="productData.description"
      />
    </div>
    <div class="flex justify-between gap-4">
      <button
        class="flex-auto py-2 bg-teal-500 text-white hover:bg-teal-700 transition duration-300 rounded-md"
        type="button"
        @click="handlerProductEdit"
      >
        送出修改
      </button>
      <button
        class="flex-auto py-2 bg-orange-500 text-white hover:bg-orange-700 transition duration-300 rounded-md"
        @click="handlerModalControl"
        type="button"
      >
        取消修改
      </button>
    </div>
  </form>
</template>

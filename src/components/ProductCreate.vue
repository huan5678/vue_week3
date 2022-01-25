<script>
import { computed, ref, watchEffect } from "vue";
import Api, { uploadImg } from "../api";
import { useStore } from "../stores";
export default {
  setup() {
    const store = useStore();
    const { handlerModalControl, handlerAdminGetProducts } = store;

    const productData = ref({
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: "",
      imageUrl: "",
      imagesUrl: [
        {
          image: "",
        },
      ],
    });

    watchEffect(() => {
      productData.value;
    });

    const uploadFile = ref("uploadFile");

    function handlerProductEdit() {
      const data = {
        method: "post",
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

    function handlerClearFiles() {
      uploadFile.value.value = "";
    }

    function handlerFiles(e) {
      const file = e.target.files[0];
      uploadImg(file)
        .then((res) => {
          console.log(res.data);
          handlerClearFiles();
        })
        .catch((err) => {
          console.dir(err);
        });
    }

    function handlerCreateFileInput() {
      productData.value.imagesUrl.push({
        image: "",
      });
    }

    function handlerResetFormInput() {
      handlerModalControl();
      productData.value.imagesUrl = [{ image: "" }];
    }

    return {
      targetProduct: computed(() => store.targetProduct),
      handlerModalControl,
      isOpenModal: computed(() => store.isOpenModal),
      productData,
      handlerProductEdit,
      handlerFiles,
      handlerCreateFileInput,
      handlerResetFormInput,
      uploadFile,
    };
  },
};
</script>

<template>
  <form class="p-4 space-y-4 container">
    <div class="flex space-between gap-4">
      <div class="flex-auto">
        <label for="productName" class="block mb-4">產品名稱</label>
        <input
          type="text"
          id="productName"
          name="productName"
          class="rounded w-full"
          v-model="productData.title"
        />
      </div>
      <div class="flex-auto">
        <label for="productContent" class="block mb-4">產品說明</label>
        <input
          type="text"
          id="productContent"
          name="productContent"
          class="rounded w-full"
          v-model="productData.content"
        />
      </div>
      <div class="flex-1">
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
    </div>
    <div class="flex space-between gap-4">
      <div class="flex-auto">
        <div class="flex justify-between gap-2">
          <div class="flex-1">
            <label for="productMainImage" class="block mb-4">產品主圖片</label>
            <input
              type="file"
              id="productMainImage"
              accept="image/*"
              name="productMainImage"
              class="rounded w-full"
              ref="uploadFile"
              @change="handlerFiles"
            />
          </div>
          <img
            class="max-h-48 object-cover flex-auto"
            v-if="productData.imageUrl !== ''"
            :src="productData.imageUrl"
            alt="產品主圖"
          />
        </div>
      </div>
    </div>
    <div class="flex space-between items-center gap-4">
      <button
        type="button"
        class="flex-auto py-2 px-4 max-w-max bg-lime-500 text-white hover:bg-lime-700 transition duration-300 rounded-md"
        @click="handlerCreateFileInput"
      >
        新增圖片
      </button>
      <ul class="flex flex-wrap justify-between gap-2">
        <li
          class="flex-auto"
          v-for="(image, idx) in productData.imagesUrl"
          :key="image + idx"
        >
          <img
            class="max-h-48 object-cover flex-auto"
            v-if="image !== undefined"
            alt="附屬圖片"
          />
          <label for="productImages" class="block mb-4">產品附屬圖片</label>
          <input
            type="file"
            accept="image/*"
            id="productImages"
            name="productImages"
            class="rounded"
            multiple
          />
        </li>
      </ul>
    </div>
    <div class="">
      <label for="productDescription" class="block mb-4">產品描述</label>
      <textarea
        id="productDescription"
        name="productDescription"
        class="rounded w-full"
        v-model="productData.description"
      />
    </div>
    <div class="flex space-between gap-4">
      <div class="flex-auto">
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
      <div class="flex-auto">
        <label for="productOriginPrice" class="block mb-4">產品原價</label>
        <input
          type="text"
          id="productOriginPrice"
          name="productOriginPrice"
          class="rounded w-full"
          v-model="productData.origin_price"
        />
      </div>
      <div class="flex-auto">
        <label for="productPrice" class="block mb-4">產品最終價格</label>
        <input
          type="text"
          id="productPrice"
          name="productPrice"
          class="rounded w-full"
          v-model="productData.price"
        />
      </div>
      <div class="flex-auto">
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
    <div class="flex justify-between gap-4">
      <button
        class="flex-auto py-2 bg-teal-500 text-white hover:bg-teal-700 transition duration-300 rounded-md"
        type="button"
        @click="handlerProductEdit"
      >
        新增產品
      </button>
      <button
        class="flex-auto py-2 bg-orange-500 text-white hover:bg-orange-700 transition duration-300 rounded-md"
        @click="handlerResetFormInput"
        type="reset"
      >
        取消新增
      </button>
    </div>
  </form>
</template>

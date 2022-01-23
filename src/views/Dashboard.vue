<script>
import { onMounted, ref, onBeforeMount, computed } from "vue";
import Api from "../api";
import { useRouter } from "vue-router";
import { useStore } from "../stores";
import ProductsTableVue from "../components/ProductsTable.vue";
import Modal from "../components/Modal.vue";
import ModalCard from "../components/ModalCard.vue";
import ProductEditor from "../components/ProductEditor.vue";
export default {
  components: { ProductsTableVue, Modal, ModalCard: ModalCard, ProductEditor },
  setup() {
    const store = useStore();

    const { handlerIsLogout, handlerClearCookie, handlerGetCookie, api_path } =
      store;

    const products = ref([]);

    const token = ref();

    const router = useRouter();

    function handlerLogout() {
      handlerIsLogout();
      const data = {
        method: "put",
        url: `logout`,
      };
      Api(data);
      handlerClearCookie("token");
      router.push("/");
    }

    token.value = handlerGetCookie("token");
    store.tokenStore = token.value;

    const data = {
      method: "get",
      url: `api/${api_path}/admin/products/all`,
      token: token.value,
    };

    onBeforeMount(() => {
      token.value === undefined ? router.push("/") : null;
    });

    onMounted(() => {
      token.value !== undefined &&
        Api(data)
          .then((res) => {
            products.value = res.data.products;
          })
          .catch((err) => {
            console.dir(err);
          });
    });

    return {
      products,
      handlerLogout,
    };
  },
};
</script>

<template class="bg-slate-100">
  <div
    class="flex justify-end items-center p-6 bg-stone-50 gap-4"
    v-if="token !== undefined"
  >
    <h2 class="text-xl">管理者登出</h2>
    <button
      class="rounded px-6 py-2 bg-rose-500 text-white hover:bg-rose-600 transition duration-300"
      @click="handlerLogout()"
    >
      登出
    </button>
  </div>
  <main class="container">
    <div class="flex justify-center py-4 gap-4">
      <ProductsTableVue :products="products" />
    </div>
  </main>
  <Modal>
    <ModalCard />
  </Modal>
</template>

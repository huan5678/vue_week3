import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Api from "../api";

export const useStore = defineStore("main", {
  state: () => {
    const tokenStore = ref("");
    const isAuthenticated = ref(false);
    const isOpenModal = ref(false);
    const selectFunctionType = ref("");
    const targetProduct = ref({});
    const adminProductList = ref([]);
    const router = useRouter();

    const api_path = import.meta.env.VITE_API_PATH;

    function handlerSetToken(tokenValue) {
      tokenStore.value = tokenValue;
    }

    function handlerIsLogin() {
      isAuthenticated.value = true;
    }

    function handlerIsLogout() {
      isAuthenticated.value = false;
    }

    function handlerCheckLogin() {
      Api({ method: "post", url: `api/user/check`, token: tokenStore.value })
        .then((res) => {
          router.push("dashboard");
        })
        .catch((err) => {
          router.push("/login");
          isAuthenticated.value = false;
          console.dir(err);
        });
    }

    function handlerGetCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function handlerClearCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }

    function handlerModalControl() {
      isOpenModal.value = !isOpenModal.value;
    }

    function handlerAdminGetProducts() {
      const data = {
        method: "get",
        url: `api/${api_path}/admin/products/all`,
        token: tokenStore.value,
      };
      tokenStore.value &&
        Api(data)
          .then((res) => {
            adminProductList.value = res.data.products;
          })
          .catch((err) => {
            console.dir(err);
          });
    }

    return {
      api_path,
      tokenStore,
      isOpenModal,
      isAuthenticated,
      targetProduct,
      adminProductList,
      selectFunctionType,
      handlerSetToken,
      handlerIsLogout,
      handlerIsLogin,
      handlerCheckLogin,
      handlerGetCookie,
      handlerClearCookie,
      handlerModalControl,
      handlerAdminGetProducts,
    };
  },
});

export default useStore;

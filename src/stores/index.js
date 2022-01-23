import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    const tokenStore = ref("");
    const isAuthenticated = ref(false);
    const isOpenModal = ref(false);
    const selectFunctionType = ref("");
    const targetProduct = ref({});

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

    return {
      api_path,
      tokenStore,
      isOpenModal,
      isAuthenticated,
      targetProduct,
      selectFunctionType,
      handlerSetToken,
      handlerIsLogout,
      handlerIsLogin,
      handlerGetCookie,
      handlerClearCookie,
      handlerModalControl,
    };
  },
});

export default useStore;

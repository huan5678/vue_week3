<script>
import Api from "../api";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../stores";
import Modal from "../components/Modal.vue";

export default {
  components: { Modal },
  setup() {
    const userName = ref("");
    const userPassword = ref("");
    const store = useStore();
    const {
      handlerIsLogin,
      handlerSetToken,
      handlerGetCookie,
      handlerModalControl,
    } = store;
    const router = useRouter();
    const loginErrorMessage = ref("");

    function handlerSubmit(e) {
      e.preventDefault();

      const api_data = {
        username: userName.value,
        password: userPassword.value,
      };

      const data = {
        method: "post",
        url: "admin/signin",
        data: api_data,
        token: "",
      };

      Api(data)
        .then((res) => {
          res.data.token && handlerSetToken(res.data.token);
          res.data.token &&
            (document.cookie = `token=${res.data.token}; max-age=3600`);
          res.data.token && handlerIsLogin();
          res.data.token && router.push("/dashboard");
        })
        .catch((err) => {
          console.dir(err);
          loginErrorMessage.value = err.response.data.message;
          handlerModalControl();
        });
    }

    onMounted(() => {
      let cookieToken = handlerGetCookie("token");
      cookieToken && router.push("/dashboard");
    });

    return {
      userName,
      userPassword,
      handlerSubmit,
      handlerModalControl,
      loginErrorMessage,
    };
  },
};
</script>

<template>
  <main class="flex justify-center items-center h-screen bg-gray-50">
    <div class="container max-w-lg">
      <form
        class="space-y-8 p-8 bg-white rounded shadow-sm"
        @submit.prevent="handlerSubmit"
      >
        <legend class="text-4xl text-center">請先登入</legend>
        <div class="">
          <label for="userName" class="mb-4 block">使用者帳號</label>
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="請輸入帳號Email"
            v-model.trim="userName"
            class="p-2 rounded border w-full bg-gray-50 invalid:text-blue-600 invalid:border-blue-600 focus:text-blue-600 text-blue-800"
          />
        </div>
        <div>
          <label for="userPassword" class="mb-4 block">使用者密碼</label>
          <input
            id="userPassword"
            type="password"
            class="p-2 rounded border w-full bg-gray-50 invalid:text-blue-600 invalid:border-blue-600 focus:text-blue-600 text-blue-800"
            v-model="userPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white rounded-lg py-4 w-100 transition duration-300 hover:bg-blue-600"
        >
          登入
        </button>
      </form>
    </div>
    <Modal>
      <section
        class="bg-white rounded-md shadow-md p-4 transition-all duration-500 ease-in-out translate-y-16"
      >
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-medium pl-4">登入失敗</h1>
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
        <h2>請確認您的帳號密碼</h2>
        <p>{{ loginErrorMessage }}</p>
      </section>
    </Modal>
  </main>
</template>

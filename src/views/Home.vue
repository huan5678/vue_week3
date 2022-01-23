<script>
import { useStore } from "../stores";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const { handlerIsLogin, handlerGetCookie } = store;
    const router = useRouter();
    const token = handlerGetCookie("token");
    onMounted(() => {
      token && handlerIsLogin();
      store.isAuthenticated ? router.push("/dashboard") : router.push("/login");
    });
  },
};
</script>

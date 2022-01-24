<script>
import { computed } from "vue";
import { useStore } from "../stores";
export default {
  setup() {
    const store = useStore();
    const { handlerModalControl } = store;

    function handlerBackdropClick(e) {
      // 點擊目標是svg跟path也就是按鈕的圖示 不做動作跳出要不會報錯沒有e.path[0]的屬性

      if (e.path[0].nodeName === "svg" || e.path[0].nodeName === "path") {
        return null;
      }
      e.path[0].className.match("backdrop") && handlerModalControl();
    }
    return {
      isOpenModal: computed(() => store.isOpenModal),
      handlerBackdropClick,
    };
  },
};
</script>

<template>
  <teleport to="body">
    <div
      class="absolute top-0 left-0 right-0 bottom-0 w-full min-h-screen bg-stone-700 bg-opacity-50 backdrop-blur-md backdrop"
      :class="isOpenModal ? '' : 'invisible -z-10'"
      @click="handlerBackdropClick"
    >
      <div
        class="container transition-all flex justify-center items-center backdrop"
        :class="
          isOpenModal
            ? 'ease-[cubic-bezier(.51,.24,.32,1.3)] duration-300'
            : 'scale-0 opacity-0 ease-[cubic-bezier(.31,1.09,1,.99)] duration-75'
        "
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

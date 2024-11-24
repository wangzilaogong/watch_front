<script setup>
//引入vue方法
import { ElConfigProvider } from "element-plus";
//中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { userStore } from "@/store/userStore.js";
import { useRoute } from "vue-router";
import { linkWallet } from "@/utils/common.js";
import { onMounted } from "vue";
const route = useRoute();
const store = userStore();
const locale = zhCn;
onBeforeMount(() => {
  if (localStorage.getItem("state")) {
    store.$state = JSON.parse(localStorage.getItem("state"));
  }
  window.addEventListener("beforeunload", () => {
    let state = JSON.stringify(store.$state);
    localStorage.setItem("state", state);
  });
});
</script>

<template>
  <!-- <el-config-provider :locale="locale">
    <slot name="app"></slot>
  </el-config-provider> -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <div :key="$route.path">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>

<style>
#app {
  background: #0a0e11;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

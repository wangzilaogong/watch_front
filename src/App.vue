<script setup>
//引入vue方法
import { ElConfigProvider } from "element-plus";
//中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { userStore } from "@/store/userStore.js";
import { useRoute } from "vue-router";
import { linkWallet } from "@/utils/common.js";
import { onMounted } from "vue";
import { getRelationship } from "@/api/base.js";
const route = useRoute();
const store = userStore();
const locale = zhCn;
const bindInviter = async () => {
  try {
    const url = window.location.search;
    const params = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_, key, value) {
      params[key] = decodeURIComponent(value);
    });
    if (!params.inviter) {
      return false;
    }
    await linkWallet();
    const accounts = await window.web3.eth.getAccounts();
    const result = await window.contract.methods["bindInviter"](
      params.inviter
    ).send({
      from: accounts[0],
    });
    console.log(result);
  } catch (error) {
    console.error("bindInviter failed:", error);
  }
};
const getRelationshipFun = async () => {
  await linkWallet();
  try {
    const accounts = await window.web3.eth.getAccounts();
    const { data } = await getRelationship({
      address: accounts[0],
    });
    if (!data.data.inviter) {
      bindInviter();
    }
  } catch (error) {
    console.log(error);
  }
};
onBeforeMount(() => {
  getRelationshipFun();
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

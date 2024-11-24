<template>
  <div class="head-com">
    <div class="head-level1 flex justify-content-between align-items-c">
      <div class="head-login" @click="router.push('/')">EdgeTime</div>
      <div class="head-operate flex justify-content-between align-items-c">
        <el-dropdown
          class="dropdown"
          popper-class="dropdown-menu"
          v-for="(item, index) in navList"
          :key="index"
        >
          <div>
            <img class="head-menu-icon--left" :src="item.icon" />
            <span class="head-menu">
              {{ item.label }}
              <el-icon class="head-menu-icon--right">
                <arrow-down class="arrow-down" />
              </el-icon>
            </span>
          </div>
          <template v-if="item.childNav[0]" #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item1, index1) in item.childNav"
                :key="index1"
                ><span @click="router.push(item1.url)">{{
                  item1.label
                }}</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <span v-if="walletAccount" class="wallet-account">{{ walletAccount }}</span>
      <el-button v-else class="link-wallet" @click="getRelationshipFun()"
        >连接钱包</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { linkWallet } from "@/utils/common.js";
import { getRelationship } from "@/api/base.js";
const router = useRouter();
const navList = ref([
  {
    label: "Product",
    icon: new URL("../assets/images/product.png", import.meta.url).href,
    childNav: [
      {
        label: "AgentNode",
        url: "",
      },
      {
        label: "Compute Device",
        url: "/watch",
      },
    ],
  },
  {
    label: "Solutions",
    icon: new URL("../assets/images/Solutions.png", import.meta.url).href,
    childNav: [],
  },
  {
    label: "Doc",
    icon: new URL("../assets/images/DOC.png", import.meta.url).href,
    childNav: [
      {
        label: "White Paper",
        url: "",
      },
    ],
  },
]);
const walletAccount = ref("");
const linkWalletFun = async () => {
  try {
    const accounts = await window.web3.eth.getAccounts();
    if (accounts[0]) {
      ElMessage.success("钱包已连接");
    } else {
      linkWallet();
    }
  } catch (error) {
    linkWallet();
  }
};
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
    walletAccount.value =
      accounts[0].substring(0, 4) +
      "****" +
      accounts[0].substr(accounts[0].length - 4);
    const { data } = await getRelationship({
      address: accounts[0],
    });
    if (!data.data.inviter) {
      bindInviter();
    } else {
      linkWalletFun();
    }
  } catch (error) {
    console.log(error);
  }
};
onBeforeMount(async () => {
  try {
    const accounts = await window.web3.eth.getAccounts();
    if (accounts[0]) {
      walletAccount.value =
        accounts[0].substring(0, 4) +
        "****" +
        accounts[0].substr(accounts[0].length - 4);
    }
  } catch (e) {
    walletAccount.value = "";
  }
});
</script>
<style lang="scss" scoped>
.head-com {
  width: 1420px;
  margin: 0 auto;
  .head-level1 {
    height: 120px;
    padding: 0 223px 0 0;
    .head-login {
      cursor: pointer;
      // background: yellow;
      line-height: 60px;
      text-align: center;
      font-size: 40px;
      color: #f2ba0c;
      width: 206px;
      height: 66px;
    }
    .head-operate {
      width: 570px;
      .head-menu-icon--left {
        margin: 0 15px 0 0;
        width: 22px;
        height: auto;
        vertical-align: middle;
      }
      .dropdown {
        &:hover {
          .head-menu-icon--right {
            transform: rotate(180deg);
          }
        }
      }
      .head-menu {
        font-weight: 400;
        font-size: 24px;
        color: #fff;
        .head-menu-icon--right {
          font-size: 16px;
        }
      }
    }
    .wallet-account {
      font-size: 30px;
      color: #f2ba0c;
    }
    .link-wallet {
      border: 0;
      width: 120px;
      height: 54px;
      background: #f0ba0f;
      border-radius: 10px;
      font-weight: 400;
      font-size: 20px;
      color: #1c1010;
      &:hover {
        color: rgba(235, 235, 235, 1);
      }
    }
  }
}
</style>
<style lang="scss">
.dropdown-menu {
  background: #1c2024 !important;
  border-radius: 2px !important;
  border: 1px solid #1c2024 !important;
  .el-dropdown-menu {
    background: #1c2024 !important;
    .el-dropdown-menu__item {
      color: #fff !important;
      &:focus {
        background: #1c2024 !important;
        color: rgba(240, 186, 15, 1) !important;
      }
    }
  }
  .el-popper__arrow {
    &:before {
      border: 1px solid #1c2024 !important;
      background: #1c2024 !important;
    }
  }
}
</style>

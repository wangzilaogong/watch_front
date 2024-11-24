<template>
  <div class="index-page">
    <div class="index-page-main">
      <div class="index-page-one flex justify-content-between">
        <div class="left-box">
          <div class="title">
            The First Web3 Watch on BNB Smart Chain<br />
          </div>
          <div class="content">
            A Web3 Watch that Promotes Health, Happiness, Fun, and Earn-as-You-Go! Purchase Now and Embrace the Future of Web3 Lifestyle!
          </div>
          <button class="next-link flex justify-content-c align-items-c" @click="router.push({path:'/watch'})">
            <span style="padding: 0 30px 0 0">Purchase Now</span>
            <el-icon :size="30"><Right /></el-icon>
          </button>
        </div>
        <div class="right-box">
          <img src="@/assets/images/index_block1_right.png" />
        </div>
      </div>
      <div class="index-page-two flex justify-content-between">
        <div class="left-box" @click="router.push({path:'/watch'})">
          <img src="@/assets/images/index_block2_left.png" />
        </div>
        <div class="right-box">
          <div class="download-btn">
            <img src="@/assets/images/Android.png" />
            <div class="download-content">
              <div class="download-title">Download it from</div>
              <div class="download-txt">ANDROID MARKET</div>
            </div>
          </div>
          <div class="download-btn">
            <img src="@/assets/images/iPhone.png" />
            <div class="download-content">
              <div class="download-title">Download it from</div>
              <div class="download-txt">APP STORE</div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-page-three flex justify-content-between">
        <div class="item-box">
          <div class="item-icon item-icon1"></div>
          <div class="item-title">RoadMap Phase 1</div>
          <div class="item-content">
            Design physical devices <br />
            Pre-sales and distribute devices <br />
            Build Community<br />
          </div>
        </div>
        <div class="item-box">
          <div class="item-icon item-icon2"></div>
          <div class="item-title">RoadMap Phase 2</div>
          <div class="item-content">
            Launch AgentNode <br />
            Airdop For Early Community<br />
            DepinNetwork TestNet Launch
          </div>
        </div>
        <div class="item-box">
          <div class="item-icon item-icon3"></div>
          <div class="item-title">RoadMap Phase 3</div>
          <div class="item-content">
            MainNet launch <br />
            Token launch <br />
            Community building <br />
          </div>
        </div>
      </div>
    </div>
    <div class="cooperation-list flex align-items-c">
      <div
        v-for="(item, index) in cooperationList"
        class="cooperation-item flex align-items-c"
        :key="index"
      >
        <img class="cooperation-icon" :src="item.icon" />
        <div class="cooperation-name">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Right } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const cooperationList = ref([
  {
    label: "BNB Smart Chain",
    icon: new URL("../../assets/images/BNB_Smart_Chain.png", import.meta.url)
      .href,
  },
  {
    label: "The Open Network",
    icon: new URL("../../assets/images/The_Open_Network.png", import.meta.url)
      .href,
  },
  {
    label: "Ethereum",
    icon: new URL("../../assets/images/ethereum.png", import.meta.url).href,
  },
  {
    label: "LayerZero",
    icon: new URL("../../assets/images/LayerZero.png", import.meta.url).href,
  },
  {
    label: "thirdweb",
    icon: new URL("../../assets/images/thirdweb.png", import.meta.url).href,
  },
]);
</script>
<style lang="scss" scoped>
.index-page {
  .index-page-main {
    width: 1420px;
    margin: 0 auto;
    .index-page-one {
      padding: 123px 0 0 0;
      .left-box {
        padding: 159px 0 0 0;
        width: 665px;
        .title {
          font-size: 48px;
          color: #f2ba0c;
        }
        .content {
          font-size: 30px;
          padding: 20px 0 107px 0;
          color: #fff;
          line-height: 50px;
        }
        .next-link {
          width: 400px;
          height: 70px;
          background: #f0ba0f;
          border-radius: 10px;
          color: #1c1010;
          font-size: 24px;
          border: 0;
          &:hover {
            color: rgba(235, 235, 235, 1);
          }
        }
      }
      .right-box {
        img {
          width: 753px;
          height: auto;
        }
      }
    }
    .index-page-two {
      width: 85%;
      padding: 297px 0 0 0;
      .left-box {
        img {
          width: 785px;
          height: auto;
        }
      }
      .right-box {
        padding: 0 0 0 -300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .download-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 22px;
          width: 381px;
          height: 101px;
          border-radius: 10px;
          border: 1px solid #f0ba0f;
          .download-content {
            padding: 0 0 0 56px;
            .download-title {
              font-weight: 300;
              font-size: 20px;
              line-height: 38px;
              color: #fff;
            }
            .download-txt {
              font-size: 24px;
              color: #fff;
            }
          }
        }
        & > :first-child {
          margin: 0 0 93px 0;
        }
        img:first-of-type {
          width: 55px;
          height: auto;
        }
        img:nth-of-type(2) {
          width: 46px;
          height: auto;
        }
      }
    }
    .index-page-three {
      // width: 85%;
      padding: 254px 0 0 0;
      .item-box {
        padding: 70px 0 0 0;
        width: 376px;
        height: 500px;
        background: url(../../assets/images/index_block3_bg.png);
        background-size: 100% 100%;
        .item-icon {
          margin: 0 auto;
          width: 90px;
          height: 90px;
          &.item-icon1 {
            background: url(../../assets/images/index_block3_icon1.png);
            background-size: 100% 100%;
          }
          &.item-icon2 {
            background: url(../../assets/images/index_block3_icon2.png);
            background-size: 100% 100%;
          }
          &.item-icon3 {
            background: url(../../assets/images/index_block3_icon3.png);
            background-size: 100% 100%;
          }
        }
        .item-title {
          padding: 0 0 0 90px;
          margin: 40px 0 0 0;
          font-weight: 400;
          font-size: 24px;
          color: #fff;
          line-height: 60px;
        }
        .item-content {
          padding: 0 0 0 90px;
          font-weight: 300;
          font-size: 20px;
          color: rgba(235, 235, 235, 1);
          line-height: 60px;
        }
      }
    }
  }
  .cooperation-list {
    margin: 125px 0 0 0;
    height: 200px;
    background: #0e1418;
    justify-content: center;
    .cooperation-item {
      margin: 0 40px;
      .cooperation-icon {
        width: 80px;
        height: auto;
      }
      .cooperation-name {
        margin: 0 0 0 20px;
        font-size: 32px;
        color: #fff;
      }
    }
  }
}
</style>

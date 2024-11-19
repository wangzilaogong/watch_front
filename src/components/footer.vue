<template>
  <div class="footer-com">
    <div class="footer-com-text">
      Welcome to join us and we will receive updated data，<br />
      will receive updated data
    </div>
    <div class="extension-list flex">
      <img class="extension-icon" src="../assets/images/x.png" />
      <img class="extension-icon" src="../assets/images/dog.png" />
      <img class="extension-icon" src="../assets/images/teleggram.png" />
    </div>
    <div class="footnotes">@2021-2024财富自由发展有限公司</div>
  </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.footer-com {
  padding: 64px 0 53px 0;
  width: 1420px;
  margin: 0 auto;
  .footer-com-text {
    font-weight: 300;
    font-size: 24px;
    color: #e7e9ec;
    line-height: 48px;
  }
  .extension-list {
    padding: 42px 0 53px 17px;
    .extension-icon {
      cursor: pointer;
      margin: 0 57px 0 0;
      width: 60px;
      height: auto;
    }
  }
  .footnotes {
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    color: #e7e9ec;
  }
}
</style>

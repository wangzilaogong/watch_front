<template>
  <el-dialog
    v-model="dialogVisible"
    title="Receiving information"
    width="700px"
    :destroy-on-close="true"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="Province" prop="province">
        <el-input v-model.trim="ruleForm.province" clearable />
      </el-form-item>
      <el-form-item label="City" prop="city">
        <el-input v-model.trim="ruleForm.city" clearable />
      </el-form-item>
      <el-form-item label="Area" prop="district">
        <el-input v-model.trim="ruleForm.district" clearable />
      </el-form-item>
      <el-form-item label="Street" prop="street">
        <el-input v-model.trim="ruleForm.street" clearable />
      </el-form-item>
      <el-form-item label="Address" prop="detailed_address">
        <el-input
          type="textarea"
          v-model.trim="ruleForm.detailed_address"
          clearable
        />
      </el-form-item>
      <el-form-item label="Name" prop="recipient_name">
        <el-input v-model.trim="ruleForm.recipient_name" clearable />
      </el-form-item>
      <el-form-item label="Phone number" prop="phone_number">
        <el-input v-model.trim="ruleForm.phone_number" clearable />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="ruleForm.email" clearable />
      </el-form-item>
      <el-form-item>
        <div style="text-align: center; width: 100%">
          <el-button
            type="primary"
            v-loading="purchaseLoading"
            @click="submitForm(ruleFormRef)"
          >
            Submit
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
  <div class="watch">
    <div class="watch-block1 flex justify-content-between">
      <img class="left-img" src="../../assets/images/watch_img.png" />
      <div class="right-box">
        <div class="title">Limited Edition Web3 Watch</div>
        <div class="txt">
          Heart Rate Monitor: Tracks your heart rate in real time<br />
          Step Counter: Records the number of steps you take<br />
          Sleep Tracker: Monitors your sleep patterns<br />
          Exercise Modes: Tracks specific activities like running, cycling, or
          swimming
        </div>
        <div class="price-box flex align-items-c justify-content-between">
          <div class="price-title">Price</div>
          <div class="price"><span class="price-num">399 </span>USDT</div>
        </div>
        <div class="operate-box flex align-items-c justify-content-between">
          <div
            class="botton flex align-items-c justify-content-c"
            v-loading="purchaseLoading"
            @click="buyWatch('399')"
          >
            Purchase
          </div>
          <div
            class="rebate-invitation flex align-items-c justify-content-between"
          >
            <img
              class="rebate-invitation-icon"
              src="../../assets/images/watch_telegram.png"
            />
            <div class="rebate-invitation-txt" @click="invitation()">
              Invite&Earn<span class="proportion">20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="watch-block2">
      <el-table :data="tableData" max-height="500" border style="width: 100%">
        <el-table-column type="index" align="center" label="No." width="214" />
        <el-table-column
          prop="address"
          align="center"
          label="Referrals"
          width="326"
        />
        <el-table-column prop="num" align="center" label="Pcs" width="214">
          <template #default="scope">
            <span>1</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipping_address"
          align="center"
          label="Address"
        />
      </el-table>
      <div v-if="form.total > 10" class="paging-box">
        <el-pagination
          :current-page="form.pageNum"
          :page-size="form.pageSize"
          :page-sizes="[10, 20]"
          :background="true"
          layout=" prev, pager, next"
          :total="form.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { linkWallet, tokenApprove } from "@/utils/common.js";
import { getOrderlist, updateAddress } from "@/api/base.js";
import { onBeforeMount } from "vue";
import { userStore } from "@/store/userStore.js";

const store = userStore();
const form = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
const handleSizeChange = (val) => {
  form.value.pageSize = val;
  handleCurrentChange(1);
};
const handleCurrentChange = (val) => {
  form.value.pageNum = val;
  getOrderlistFun();
};
const ruleForm = reactive({
  province: "",
  city: "",
  district: "",
  street: "",
  detailed_address: "",
  recipient_name: "",
  phone_number: "",
  email: "",
});
const dialogVisible = ref(false);
const ruleFormRef = ref();
const validatePhone = (rule, value, callback) => {
  const regex = /^1[3-9]\d{9}$/; //
  if (!regex.test(value)) {
    callback(new Error("Please enter the correct mobile phone number"));
  } else {
    callback();
  }
};
const rules = reactive({
  recipient_name: [
    { required: true, message: "Please enter recipient name", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  province: [
    { required: true, message: "Please enter province", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  city: [
    { required: true, message: "Please enter city", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  district: [
    { required: true, message: "Please enter the area", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  street: [
    { required: true, message: "Please enter street", trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  detailed_address: [
    {
      required: true,
      message: "Please enter detailed address",
      trigger: "blur",
    },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  phone_number: [
    {
      required: true,
      message: "Please enter the recipient's mobile phone number",
      trigger: "blur",
    },
    { validator: validatePhone, trigger: "blur" },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Please enter the recipient's email address",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please enter a correct email address",
      trigger: ["blur", "change"],
    },
    {
      min: 1,
      max: 100,
      message: "Please enter no more than 100 characters",
      trigger: "blur",
    },
  ],
});
const newOrderAddress = ref({});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      newOrderAddress.value = JSON.parse(JSON.stringify(ruleForm));
      purchase("399");
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
};
const tableData = ref([]);
const updateAddressFun = async (order_id) => {
  let params = newOrderAddress.value;
  params.order_id = order_id;
  await updateAddress(params);
  handleCurrentChange(1);
};
const getOrderlistFun = async () => {
  await linkWallet();
  const accounts = await window.web3.eth.getAccounts();
  const { data } = await getOrderlist({
    address: accounts[0],
    page: form.value.pageNum,
    limit: form.value.pageSize,
  });
  tableData.value = data.data.orders;
  form.value.total = data.data.total;
};
const purchaseLoading = ref(false);
const purchase = async (val) => {
  purchaseLoading.value = true;
  await linkWallet();
  try {
    await tokenApprove(val);
  } catch (error) {
    purchaseLoading.value = false;
    ElMessage.error("Authorization failed");
    return false;
  }
  try {
    const accounts = await window.web3.eth.getAccounts();
    const result = await window.contract.methods["purchase"](
      val + "000000000000000000"
    ).send({
      from: accounts[0],
    });
    ElMessage.success(
      "The transaction is successful, the order information will be updated later, please wait patiently！"
    );
    purchaseLoading.value = false;
    dialogVisible.value = false;
    console.log(result);
    let timer = setInterval(async () => {
      const { data } = await getOrderlist({
        address: accounts[0],
        page: 1,
        limit: 10,
      });
      const firstOrder = data.data.orders[0] || {};
      if (
        firstOrder.tx_hash == result.transactionHash &&
        !firstOrder.shipping_address
      ) {
        updateAddressFun(firstOrder.order_id);
        clearInterval(timer);
      }
    }, 10000);
  } catch (error) {
    purchaseLoading.value = false;
    ElMessage.error("Transaction failed");
    console.error("Contract method call failed:", error);
  }
};
const buyWatch = (amount) => {
  if (!window.contract) {
    alert("Please connect the wallet first");
    return false;
  }
  // ElMessageBox.prompt("请填写收货地址完成交易！", "提示", {
  //   confirmButtonText: "确定",
  //   cancelButtonText: "取消",
  //   inputPattern: /^(.+)$/,
  //   inputErrorMessage: "请输入收货地址",
  // })
  //   .then(({ value }) => {
  //     purchase(amount, value);
  //   })
  //   .catch(() => {});
  dialogVisible.value = true;
};
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      ElMessage.success("Sharing link copied successfully！");
    })
    .catch(function (err) {
      ElMessage.error("Sharing link copy failed");
    });
};
const invitation = async () => {
  if (!window.contract) {
    alert("Please connect the wallet first");
    return false;
  }
  await linkWallet();
  const accounts = await window.web3.eth.getAccounts();
  const url = `http://${window.location.href.split("/")[2]}?inviter=${
    accounts[0]
  }`;
  copyToClipboard(url);
};
const walletAccount = computed(async () => {
  return store.account;
});
watch(walletAccount, (newValue, oldValue) => {
  handleCurrentChange(1);
});
onBeforeMount(async () => {
  const accounts = await window.web3.eth.getAccounts();
  if (accounts[0]) {
    handleCurrentChange(1);
  }
});
</script>
<style lang="scss" scoped>
.watch {
  padding: 118px 0 0 0;
  width: 1420px;
  margin: 0 auto;
  .watch-block1 {
    .left-img {
      width: 664px;
      height: auto;
    }
    .right-box {
      padding: 0 0 0 30px;
      .title {
        font-weight: 400;
        font-size: 28px;
        color: #fff;
        line-height: 56px;
      }
      .txt {
        font-weight: 300;
        font-size: 18px;
        color: #fff;
        line-height: 36px;
      }
      .price-box {
        margin: 90px 0 68px 0;
        padding: 28px 40px;
        width: 500px;
        height: 80px;
        background: url(../../assets/images/watch_price_bg.png);
        background-size: 100% 100%;
        .price-title {
          font-weight: 300;
          font-size: 24px;
          color: #fff;
        }
        .price {
          font-weight: 300;
          font-size: 24px;
          color: #fff;
          .price-num {
            font-weight: bold;
            font-size: 36px;
            color: #fff;
          }
        }
      }
      .operate-box {
        width: 500px;
        .botton {
          cursor: pointer;
          width: 234px;
          height: 70px;
          background: #f2ba0c;
          border-radius: 10px;
          font-weight: 400;
          font-size: 28px;
          color: #010101;
          &:hover {
            color: rgba(235, 235, 235, 1);
          }
        }
        .rebate-invitation {
          cursor: pointer;
          padding: 0 18px;
          width: 234px;
          height: 70px;
          border-radius: 10px;
          border: 1px solid #f2ba0c;
          .rebate-invitation-icon {
            width: 25px;
            height: auto;
          }
          .rebate-invitation-txt {
            font-weight: 300;
            font-size: 24px;
            color: #fff;
            .proportion {
              color: rgba(227, 22, 22, 1);
            }
          }
        }
      }
    }
  }
  .watch-block2 {
    padding: 160px 0 0 0;
    :deep(.el-table) {
      background: rgba(23, 30, 35, 1);
      --el-table-border: 1px solid #26333c;
      --el-table-border-color: #26333c;
    }
    :deep(.el-table th.el-table__cell) {
      background: rgba(23, 30, 35, 1);
      border-right: 1px solid #26333c;
      border-bottom: 1px solid #26333c;
      font-size: 20px;
      font-weight: 300;
      color: #f2ba0c;
    }
    :deep(.el-table--border .el-table__cell) {
      background: #12191e;
      border-right: 1px solid #26333c;
      border-bottom: 1px solid #26333c;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
    }
  }
  .paging-box {
    // width: 85%;
    padding: 22px 0;
    display: flex;
    justify-content: center;
    :deep(.btn-prev) {
      background: #12191e;
      border: 1px solid #26333c;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
      &:hover {
        color: #f2ba0c;
      }
    }
    :deep(.btn-next) {
      background: #12191e;
      border: 1px solid #26333c;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
      &:hover {
        color: #f2ba0c;
      }
    }
    :deep(.el-pager li) {
      background: #12191e;
      border: 1px solid #26333c;
      font-weight: 300;
      font-size: 18px;
      color: #fff;
      &:hover {
        color: #f2ba0c;
      }
      &.is-active {
        background: #f2ba0c;
        color: #010101;
        &:hover {
          color: #010101;
        }
      }
    }
  }
}
</style>

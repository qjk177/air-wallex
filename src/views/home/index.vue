<template>
  <div class="home">
    <header>
      {{ Constant.BrandName }}
    </header>
    <div class="container">
      <h1>A better way</h1>
      <h1>to enjoy every day.</h1>
      <p>Be the first to know when we launch.</p>
      <el-button type="primary" @click="createInvite">
        Request an invite
      </el-button>
    </div>
    <footer>
      <p>Made with in Melbourne</p>
      <p>@ 2021 {{ Constant.BrandName }} All rights reserved</p>
    </footer>
    <form-dialog v-if="state.showDialog" v-model:show="state.showDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import * as Constant from "@/constant/index";
import formDialog from "./components/form-dialog.vue";

export default defineComponent({
  name: "home-page",
  components: {
    formDialog,
  },
  setup() {
    const state = reactive({
      showDialog: false,
    });
    const createInvite = () => {
      state.showDialog = true;
    };
    return {
      Constant,
      state,
      createInvite,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 100px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  footer {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ccc;
  }
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      margin: 0;
    }
    p {
      margin: 20px 0;
    }
  }
}
</style>

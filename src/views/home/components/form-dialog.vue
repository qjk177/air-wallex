<template>
  <el-dialog
    v-model="state.visible"
    :title="state.isSuccess ? 'All Done!' : 'Request an invite'"
    width="500px"
    destroy-on-close
    :show-close="false"
    :before-close="onClose"
  >
    <template v-if="state.isSuccess">
      <p>
        You will be one of the first to experience {{ Constant.BrandName }} when
        we launch.
      </p>
      <el-button type="primary" @click="onClose">OK</el-button>
    </template>
    <template v-else>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="fullname">
          <el-input
            v-model.trim="form.fullname"
            placeholder="Full Name"
            maxlength="20"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model.trim="form.email"
            placeholder="Email"
            maxlength="30"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmEmail">
          <el-input
            v-model.trim="form.confirmEmail"
            placeholder="Confirm Email"
            maxlength="30"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-button type="primary" :disabled="state.isSending" @click="send">
          {{ state.isSending ? "Sending, please wait" : "Send" }}
        </el-button>
        <p v-show="state.errorMsg" class="error-msg">{{ state.errorMsg }}</p>
      </el-form>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { postCreateInvite } from "../apis";
import * as Constant from "@/constant/index";

export default defineComponent({
  name: "form-dialog",
  props: {
    show: Boolean,
  },
  setup(props, ctx) {
    const state = reactive({
      isSuccess: false,
      isSending: false,
      errorMsg: "",
      visible: props.show,
    });
    const form = reactive({
      fullname: "",
      email: "",
      confirmEmail: "",
    });
    const btnDisabled = computed(() => {
      return state.isSending;
    });
    const validateConfirmEmail = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("please input confirm email"));
      } else if (value !== form.email) {
        callback(new Error("email is not match!"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      fullname: [
        {
          required: true,
          message: "Please input Full name",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "Please input Email",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Please input correct Email",
          trigger: "blur",
        },
      ],
      confirmEmail: [
        {
          validator: validateConfirmEmail,
          trigger: "blur",
        },
      ],
    });
    const formRef = ref();
    const send = () => {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          request();
        }
      });
    };
    // 请求接口
    const request = () => {
      state.isSending = true;
      postCreateInvite({
        name: form.fullname,
        email: form.email,
      })
        .then((res) => {
          // 显示错误原因
          if (res === "Registered") {
            state.isSuccess = true;
          } else {
            state.errorMsg = res.errorMessage || "network error";
          }
        })
        .finally(() => {
          state.isSending = false;
        });
    };
    const onClose = () => {
      ctx.emit("update:show", false);
    };
    return {
      state,
      form,
      rules,
      btnDisabled,
      formRef,
      Constant,
      send,
      onClose,
    };
  },
});
</script>
<style lang="less" scoped>
.error-msg {
  color: red;
}
.el-button {
  width: 100%;
}
</style>

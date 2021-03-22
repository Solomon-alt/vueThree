<template>
  <div>
    <div class="background">
      <!-- 登录 -->
      <div class="login">
        <img src="../../../assets/logo.png" />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="form"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model.trim="ruleForm.username"
              placeholder="请输入账号"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model.trim="ruleForm.password"
              placeholder="请输入密码"
              type="password"
              clearable
            ></el-input>
          </el-form-item>
          <div style="display: flex; justify-content: space-between">
            <div style="width: 135px">
              <el-form-item prop="verify">
                <el-input
                  v-model.trim="ruleForm.verify"
                  placeholder="请输入验证码"
                  clearable
                ></el-input>
              </el-form-item>
            </div>
            <div
              style="width: 100px; height: 40px"
              @click="verify"
              v-html="captcha"
            ></div>
          </div>

          <!-- 登录按钮 -->
          <div>
            <el-button type="primary" style="width: 100%" @click="login"
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Rules } from "../../../types";
import { ElMessage } from "element-plus";
import api from "@/http/api";
import { useRouter } from "vue-router";

export interface Model {
  username: string;
  password: string;
  verify: string;
}

export interface Rule {
  username: Rules[];
  password: Rules[];
  verify: Rules[];
}
export default defineComponent({
  name: "login",
  props: {},
  components: {},
  setup() {
    let form = ref<any>(null);
    let router = useRouter(); //跳路由

    // onMounted =============================================================
    onMounted(() => {
      //进入页面获取验证码=================================================================
      api
        .verify()
        .then((res: any) => {
          captcha.value = res.data;
          console.log(res.data);
          
        })
        .catch((err: any) => {
          console.log(err);
        });
    });

    // 验证码的值 =============================================================
    let captcha = ref<string>("");
    const ruleForm = ref<Model>({
      username: "",
      password: "",
      verify: "",
    });
    let checkUsername = (_: any, value: any, callback: any) => {
      if (value === "") {
        callback(Error("用户名不能为空"));
      } else {
        if (
          /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
            value
          )
        ) {
          callback(Error("用户名手机格式错误"));
        }
      }
      callback();
    };

    const rules = ref<Rule>({
      username: [
        {
          trigger: "blur",
          validator: checkUsername,
          required: true,
        },
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur",
        },
      ],
      verify: [
        {
          required: true,
          message: "验证码不能为空",
          trigger: "blur",
        },
      ],
    });

    //点击获取验证码=================================================================
    let verify = (): void => {
      api
        .verify()
        .then((res: any) => {
          captcha.value = res.data;
          console.log(res.data);
          
        })
        .catch((err: any) => {
          console.log(err);
        });
    };
    //登录===========================================================================
    let login = (): void => {
      form.value.validate((valid: boolean) => {
        if (valid) {
          api
            .login({
              username: ruleForm.value.username,
              password: ruleForm.value.password,
            })
            .then((res: any) => {
              if (res.code === 200) {
                //存用户名==========================================
                localStorage.setItem(
                  "username",
                  JSON.stringify({ name: res.data.username })
                );
                //存token===========================================

                // 跳路由 =============================================================
                router.push('/')
                // 提示信息 =============================================================
                ElMessage.success("登陆成功");
              }else if(res.code ===500){
                ElMessage.error(res.msg);
              }
            });
        } else {
          ElMessage.error("表单验证有误");
        }
      });
    };
    return {
      form,
      ruleForm,
      rules,
      checkUsername,
      verify,
      captcha,
      login,
    };
  },
});
</script>

<style scoped lang='scss'>
.background {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../../../assets/login.jpg);
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 270px;
  height: 378px;
  border: 1px solid #000;
  padding: 33px 55px 25px;
}
img {
  display: block;
  margin: auto;
  margin-bottom: 20px;
}
</style>
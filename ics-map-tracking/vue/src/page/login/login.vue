<style lang="scss" scoped>
.main-login {
  width: 100%;
  height: 100vh;
  min-height: 480px;
  position: relative;
  // background-image: url(/static/images/new/login1/background.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.bigtitle {
  position: absolute;
  left: 8vw;
  top: 6vh;
  z-index: 10;
}
.login-box {
  overflow: hidden;
  width: 21vw;
  position: relative;
  left: 64%;
  top: 23%;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.5);
  &:before {
    content: "";
    position: absolute;
    width: 82px;
    background: rgba(109, 156, 212, 1);
    top: -51px;
    right: -4px;
    height: 86px;
    border-radius: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    top: -9px;
    right: -52px;
    width: 80px;
    background: rgba(56, 139, 211, 0.8);
    height: 84px;
    border-radius: 100%;
  }
  .login-form1 {
    width: 90%;
    margin: 0 auto;
    margin-top: 1vw;
    padding-bottom: 1vw;
    p {
      font-size: 15px;
    }
  }
  .iconImg {
    width: 1.1vw;
    height: 1.1vw;
  }
}
.grad {
  background: #0f5eae;
  height: 3vw;
  border: none;
  font-size: 16px;
  &:hover {
    background: rgba(15, 94, 174, 0.6);
  }
  span {
    letter-spacing: 20px;
  }
}
.codeBtn {
  height: 98%;
  width: 28%;
  font-size: 18px;
  letter-spacing: 3px;
  color: #053d84;
  background: white;
  margin: 0 0 0 0;
  position: absolute;
  right: 0;
  top: 1px;
  outline: none;
  cursor: pointer;
}

.inputCode {
  width: 69% !important;
  margin-right: 80px;
}
.footer {
  position: absolute;
  font-size: 14px;
  color: #010039;
  width: 100%;
  text-align: center;
  bottom: 4vh;
}
.c {
  text-align: center; // border-right: 1px solid gray;
  padding: 0 5px;
  // font-weight: 600;
  letter-spacing: 1px;
  &:last-child {
    border-right: 0px solid gray;
  }
}
// 大屏
@media screen and (min-width: 1681px) {
  .login-box {
    top: 28%;
    &:before {
      width: 100px;
    }
    &:after {
      height: 102px;
    }
  }
}
</style>

<template>
  <div>
    <!-- <img src="/static/images/new/login1/logo.png" alt="logo" class="bigtitle"> -->
    <div class="main-login">
      <div class="login-box">
        <div class="login-form1">
          <Form ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="0"
                autocomplete="off">
            <Form-item label=""
                       prop="userName">
              <div class="logininfo">
                <i-input v-model="formValidate.userName"
                         placeholder="请输入账号"
                         size="large"
                         autocomplete="off"
                         @on-blur="nameBlur(formValidate.userName)"
                         @keyup.enter.native="enterKey($event, 'formValidate', 'userName')"
                         :maxlength="16">
                  <span slot="prepend">
                    <!-- <Icon :size="22" type="ios-person-outline" color="black"></Icon> -->
                    <img src="/static/images/new/login1/username.png"
                         class="iconImg" />
                  </span>
                </i-input>
              </div>
            </Form-item>
            <Form-item label=""
                       prop="password">
              <div class="logininfo">
                <i-input v-model="formValidate.password"
                         placeholder="请输入密码"
                         size="large"
                         type="password"
                         autocomplete="off"
                         @keyup.enter.native="enterKey($event, 'formValidate')"
                         :maxlength="16">
                  <span slot="prepend">
                    <!-- <Icon :size="22" type="ios-locked-outline" color="black"></Icon> -->
                    <img src="/static/images/new/login1/password.png"
                         class="iconImg" />
                  </span>
                </i-input>
              </div>
            </Form-item>
            <!-- <Form-item label=""
                       v-if="isShow"
                       prop="verCode">
              <div class="logininfo verCode">
                <i-input placeholder="请输入验证码"
                         size="large"
                         class="inputCode"
                         style=""
                         v-model="formValidate.verCode"
                         v-if="isShow">
                         <span slot="prepend">
                    <img src="/static/images/new/login1/confirm.png"
                         class="iconImg" />
                  </span>
                         </i-input>
                <input type="button"
                       id="code"
                       class="codeBtn"
                       @click="createCode"
                       v-model="checkCode"
                       v-if="isShow" />
              </div>
            </Form-item>
            <Form-item style="margin-bottom:0px;">
              <Checkbox size="large">记住密码</Checkbox>
            </Form-item> -->
          </Form>
          <i-button type="primary"
                    size="large"
                    class="grad"
                    long
                    :loading="modal_loading"
                    @click="handleSubmit('formValidate')"
                    id="loginBtn">
            <span>登录</span>
          </i-button>
        </div>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="name-font">
        <span class="c"> 门户网站 |</span>
        <span class="c">联系我们 |</span>
        <span class="c">数据接口 &nbsp;&nbsp;中华人民共和国交通部 |</span>
        <span class="c">
          <a href="http://www.miibeian.gov.cn"
             target="_blank"
             style="margin-left:5px;">鄂
             京ICP备14009783</a>
        </span>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapState([])
  },
  data() {
    return {
      isShow: true,
      verCode: "",
      loginModal: true,
      checkCode: "",
      modal_loading: false,
      count: "",
      code: "",
      formValidate: {
        userName: "",
        password: "",
        verCode: ""
      },
      password: "",
      ruleValidate: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" }
        ],
        verCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ]
      },
      menuTree: [],
      codeInfo: { count: 0, starTime: "", endTime: "" }
    };
  },
  mounted() {
    this.createCode();
  },
  methods: {
    // input监控事件
    enterKey(event, name) {
      if (event) {
        if (event.keyCode === 13) {
          this.handleSubmit(name);
        }
      }
    },
    // 用户名输入框失去焦点
    nameBlur(userName) {
      let cookieUserName = this._hyTool.getCookie(userName);
      if (cookieUserName) cookieUserName = JSON.parse(cookieUserName);
      if (cookieUserName && cookieUserName.count > 2) {
        this.isShow = true;
      } else {
        // this.isShow = false;
        this.formValidate.verCode = "";
      }
    },
    // login
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal_loading = true;
          let loginInfo = {};
          loginInfo.userName = this.formValidate.userName;
          loginInfo.timeZone = "CCT";
          if (
            this.formValidate.userName === "admin" &&
            this.formValidate.password === "123qwe"
          ) {
            this.$router.push("/main/home");
            this.modal_loading = false;
          } else {
            this.modal_loading = false;
            this.$Notice.error({
              title: "账户密码错误"
            });
          }
          // 多次错误登录
          let cookieUserName = this._hyTool.getCookie(loginInfo.userName);
          // console.log(cookieUserName);
          if (cookieUserName) {
            cookieUserName = JSON.parse(cookieUserName);
          } else {
            cookieUserName = { count: 0, starTime: "", endTime: "" };
            this.codeInfo = { count: 0, starTime: "", endTime: "" };
          }
        } else {
          // this.$Notice.error({
          //   title: '请输入用户名、密码'
          // });
        }
      });
    },
    // 验证码
    createCode() {
      // 首先默认code为空字符串
      let checkCode = "";
      // 设置长度，这里看需求，我这里设置了4
      let codeLength = 4;
      // 设置随机字符
      let random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      // 循环codeLength 我设置的4就是循环4次
      for (let i = 0; i < codeLength; i++) {
        // 设置随机数范围,这设置为0 ~ 36
        let index = Math.floor(Math.random() * 36);
        // 字符串拼接 将每次随机的字符 进行拼接
        checkCode += random[index];
      }
      // 将拼接好的字符串赋值给展示的Value
      this.checkCode = checkCode;
    }
  }
};
</script>

<template>
  <div id="Login">
    <siteMenu></siteMenu>
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="login-form">
            <div class="form-head">
              <div class="d-flex justify-content-center">
                <img
                  alt="acculade logo"
                  src="../../../public/register_Logo.png"
                  style="display:block"
                >
              </div>
              <h6>ایجاد حساب کاربری</h6>
              <span class="register">
                قبلا ثبت نام کرده اید؟
                <router-link to="/login">ورود</router-link>
              </span>
            </div>

            <div class="form-body" v-if="!success">
              <div class="d-flex flex-column justify-content-center align-content-center">
                <div class="input">
                  <input
                    type="text"
                    name="name"
                    placeholder="نام"
                    class="form-control"
                    v-model="user.name"
                    style="text-align:center;"
                    @keyup="name"
                    @blur="name"
                    autocomplete="off"
                  >
                  <span style="font-size:0.8rem; color:red; ">{{err.name}}</span>
                </div>
                <div class="input">
                  <input
                    type="text"
                    name="email"
                    placeholder="ایمیل"
                    class="form-control input"
                    v-model="user.email"
                    @keyup="email"
                    @blur="email"
                    autocomplete="off"
                  >
                  <span style="font-size:0.8rem; color:red;">{{err.email}}</span>
                </div>
                <div class="input">
                  <input
                    type="text"
                    name="username"
                    placeholder="نام کاربری"
                    class="form-control input"
                    v-model="user.username"
                    @keyup="username"
                    @blur="username"
                    autocomplete="off"
                  >
                  <span style="font-size:0.8rem; color:red;">{{err.username}}</span>
                </div>
                <div class="input">
                  <input
                    id="pass-1"
                    type="password"
                    name="password"
                    placeholder="رمز ورود"
                    class="form-control input"
                    v-model="user.password"
                    @keyup="password(); confirmpassword();"
                    @blur="password(); confirmpassword();"
                    autocomplete="off"
                  >
                  <span style="font-size:0.8rem; color:red;">{{err.password}}</span>
                </div>
                <div class="input">
                  <input
                    id="pass-2"
                    type="password"
                    name="confirm-password"
                    placeholder="تایید رمز ورود"
                    class="form-control input"
                    v-model="user.confirmpassword"
                    @keyup="confirmpassword"
                    @blur="confirmpassword"
                    autocomplete="off"
                  >
                  <span style="font-size:0.8rem; color:red;">{{err.confirmpassword}}</span>
                </div>

                <button class="btn btn-login btn-secondary btn-block" @click="register">
                  <span class="spinner-border spinner-border-md" v-if="loading"></span>

                  <span v-if="!loading">ثبت نام</span>
                </button>
              </div>
            </div>
            <div class="err" v-if="invalidInput">
              <span>خطایی رخ داده</span>
              <br>
              <span v-for="err in servererror" :key="err">
                {{err}}
                <br>
              </span>
            </div>
            <div class="seccess" v-if="success">
              <span>ثبت نام شما با موفقیت انجام شد</span>
            </div>

            <div class="form-footer">
              <span>
                راهنمایی نیاز دارید؟ ایمیل بزنید
                <br>mosa5445 [at] gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-login {
  border-color: #346667;
}
.btn-login:hover {
  background-color: #346667;
}
.login-form {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.form-head {
  padding: 10px;
  text-align: center;
  color: #000000;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.form-body {
  padding: 35px;
}
.input {
  margin: 5px 0;
  direction: ltr;
}
.register {
  color: grey;
  font-size: 0.7rem;
}
.register a {
  color: #37474f;
}
.form-footer {
  background-color: #fafafa;
  padding: 10px;
  text-align: center;
  font-size: 0.8rem;
  -webkit-border-bottom-right-radius: 5px;
  -webkit-border-bottom-left-radius: 5px;
  -moz-border-radius-bottomright: 5px;
  -moz-border-radius-bottomleft: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  color: #9e9e9e;
}

.form-control {
  border: 1px solid #f5f5f5;
}
.err {
  text-align: center;
  background-color: #d32f2f;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  margin: 0 30px;
  font-size: 0.9rem;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  text-align: right !important;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: right !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  text-align: right !important;
}
.seccess {
  text-align: center;
  background-color: #4caf50;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  margin: 10px 30px;
  font-size: 0.9rem;
}
</style>

<script>
import axios from "axios";

import { async } from "q";
import { type } from "os";
import { setTimeout } from "timers";
import { validation } from "@/Mixing/register/validation.js";

import siteMenu from "@/components/menu.vue";
export default {
  components: {
    siteMenu
  },
  mixins:[validation],
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("auth");
    if (token) next("/");
    else next();
  },

  data() {
    return {
      user: {
        name: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
      },
      err: {
        name: "",
        email: "",
        username: "",
        password: "",
        confirmpassword: ""
      },
      invalidInput: false,
      cansubmit: false,
      servererror: [],
      success: false,
      loading: false
    };
  },
  methods: {
    async register() {
      this.loading = true;
      await this.name();
      await this.email();
      await this.username();
      await this.password();
      await this.confirmpassword();
      if (
        !this.err.name &&
        !this.err.username &&
        !this.err.email &&
        !this.err.password &&
        !this.err.confirmpassword
      ) {
        this.invalidInput = false;
        try {
          const token = await localStorage.getItem("auth");
          if (token) this.$router.push("/");
          let res = await axios({
            method: "post",
            url: "http://localhost:4000/register",
            data: {
              name: this.user.name,
              email: this.user.email,
              username: this.user.username,
              password: this.user.password,
              token
            }
          });

          this.success = true;
        } catch (err) {
          this.invalidInput = true;
          this.servererror = [];
          if (err.response) this.servererror = err.response.data.err;
        }
      }
      this.loading = false;
    }
  }
};
</script>
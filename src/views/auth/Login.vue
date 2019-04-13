<template>
  <div id="Login">
    <siteMenu></siteMenu>
    <div class="container-fluid">
      
      <div class="d-flex justify-content-center align-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="login-form">
            <div class="form-head">
              <div class="d-flex justify-content-center">
                <img alt="acculade logo" src="../../../public/Logo.png" style="display:block">
              </div>
              <h6>برای استفاده از امکانات ابتدا وارد شوید</h6>
              <span class="register">
                کاربر جدید هستید؟
                <router-link to="/singup" tag="a">ثبت نام</router-link>
              </span>
            </div>

            <div class="form-body">
              <div class="d-flex flex-column justify-content-center align-content-center">
                <input
                  type="text"
                  name="username"
                  placeholder="نام کاربری یا ایمیل"
                  class="form-control input"
                  v-model="user.username"
                  autocomplete="false"
                  autofocus
                >
                <input
                  type="password"
                  name="password"
                  placeholder="رمز ورود"
                  class="form-control input"
                  v-model="user.password"
                >
                <button class="btn btn-login btn-secondary btn-block" @click="login">ورود</button>
              </div>
            </div>
            <div class="err" v-if="err">
              <span>نام کاربری یا رمز عبور نادرست است</span>
            </div>

            <div class="form-footer">
              <router-link to="/reset-password">رمز عبورت رو فراموش کردی؟</router-link>
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
  margin: 10px 0;
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
}
.form-footer > a {
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
</style>

<script>
import {event} from '@/main.js'
import axios from "axios";
import { async } from "q";
import { type } from "os";
import siteMenu from '@/components/menu.vue'
export default {
  components: {
    siteMenu
  },
  beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("auth");
    if (token) next("/");
    else next();
  },
  data() {
    return {
      user: { username: "", password: "" },
      err: false,
    };
  },
  methods: {
    async login() {
      let res;
      try {
        const token = localStorage.getItem("auth");
        if (token) this.$router.push("/");
        res = await axios({
          method: "post",
          url: "http://localhost:4000/login",
          data: {
            username: this.user.username,
            password: this.user.password,
            token
          }
        });
        this.auth = true;
        localStorage.setItem("auth", res.data.token);
        this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.err = true;
        setTimeout(() => (this.err = false), 2000);
      }
    }
  }
};
</script>
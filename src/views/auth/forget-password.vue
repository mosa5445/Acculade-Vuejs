<template>
  <div id="Login">
    <siteMenu></siteMenu>
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="login-form">
            <div class="form-head">
              <h4>بازیابی رمز ورود</h4>
              <h6>برای تغییر رمز عبور ایمیل خود را وارد کنید</h6>
              <span class="register">
                <router-link to="/login">بازگشت به صفحه ورود</router-link>
              </span>
            </div>

            <div class="form-body" v-if="!success">
              <div class="d-flex flex-column justify-content-center align-content-center">
                <input
                  type="text"
                  name="email"
                  placeholder="ایمیل"
                  class="form-control input"
                  v-model="email"
                >
                <button class="btn btn-login btn-secondary btn-block" @click="reset">
                  <span class="spinner-border spinner-border-md" v-if="loading"></span>

                  <span v-if="!loading">ارسال ایمیل بازیابی</span>
                </button>
              </div>
            </div>
            <div class="err" v-if="err">
              <span>{{msg}}</span>
            </div>
            <div class="success" v-if="success">
              <span>لینک بازیابی رمز عبور به ایمیل شما ارسال شد ، لطفا پوشه اسپم را نیز کنترل کنید</span>
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
.success {
  text-align: center;
  background-color: #4caf50;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  margin: 10px 30px;
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
import axios from "axios";
import { async } from "q";
import { type } from "os";
import siteMenu from "@/components/menu.vue";
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
      email: "",
      err: false,
      success: false,
      loading: false,
      msg: ""
    };
  },
  methods: {
    async reset() {
      this.loading = true;
      try {
        const token = localStorage.getItem("auth");
        if (token) this.$router.push("/");

        let res = await axios({
          method: "post",
          url: "http://localhost:4000/reset-password",
          data: {
            email: this.email,
            token
          }
        });
        this.success = true;
      } catch (err) {
        this.err = true;
        this.msg = "";
        if (err.response) {
          if (err.response.status == 500)
            this.msg = "خطایی رخ داده لطفا بعدا دوباره امتحان کنید";
          if (err.response.status == 404)
            this.msg = "این ایمیل در قبلا ثبت نام نکرده است";
        } else this.msg = "خطایی رخ داده لطفا بعدا دوباره امتحان کنید";
        setTimeout(() => (this.err = false), 2000);
      }
      this.loading = false;
    }
  }
};
</script>
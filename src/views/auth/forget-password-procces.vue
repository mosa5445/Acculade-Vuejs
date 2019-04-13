<template>
  <div id="Login">
    <siteMenu></siteMenu>
    <div class="container-fluid">
      <div class="d-flex justify-content-center align-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
          <div class="login-form">
            <div class="form-head">
              <h4>بازیابی رمز ورود</h4>
              <h6>رمز جدید خود را انتخاب کنید</h6>
              <span class="register">
                <router-link to="/login">بازگشت به صفحه ورود</router-link>
              </span>
            </div>

            <div class="form-body" v-if="!err">
              <div v-if="!firstloading">
                <div
                  class="d-flex flex-column justify-content-center align-content-center"
                  v-if="!success"
                >
                  <div class="input">
                    <input
                      type="password"
                      name="password"
                      placeholder="رمز عبور جدید"
                      class="form-control"
                      v-model="password"
                      @blur="Password()"
                      @keyup="Password(); confirmPassword();"
                    >
                    <span style="font-size:0.8rem; color:red;">{{errors.password}}</span>
                  </div>
                  <div class="input">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="تکرار رمز عبور جدید"
                      class="form-control"
                      v-model="confirmpassword"
                      @blur="confirmPassword()"
                      @keyup="confirmPassword()"
                    >
                    <span style="font-size:0.8rem; color:red;">{{errors.confirmpassword}}</span>
                  </div>
                  <button class="btn btn-login btn-secondary btn-block" @click="reset">
                    <span class="spinner-border spinner-border-md" v-if="loading"></span>
                    <span v-if="!loading">تغییر رمز</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="loading" v-if="firstloading">
              <span class="spinner-border spinner-border-md"></span>
            </div>
            <div class="success" v-if="success">
              <span>رمز ورود شما با موفقیت تغییر کرد</span>
            </div>
            <div class="err" v-if="err">
              <span>{{serverErr}}</span>
              <br>
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
.loading {
  text-align: center;

  border-radius: 5px;
  color: #000;
  padding: 10px;
  margin: 10px 30px;
  font-size: 0.9rem;
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
import { setTimeout } from "timers";
import validator from "validator";
export default {
  components: {
    siteMenu
  },
  async beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("auth");
    if (token) next("/");
    else next();
  },

  data() {
    return {
      password: "",
      confirmpassword: "",
      err: false,
      errors: { password: "", confirmpassword: "" },
      loading: false,
      firstloading: true,
      success: false,
      serverErr: ""
    };
  },
  methods: {
    async reset() {
      this.loading = true;
      await this.Password();
      await this.confirmPassword();
      if (!this.errors.password && !this.errors.confirmpassword) {
        try {
          const token = localStorage.getItem("auth");
          if (token) this.$router.push("/");

          let res = await axios({
            method: "post",
            url: `http://localhost:4000/reset-password/${
              this.$route.params.token
            }`,
            data: {
              password: this.password,
              token
            }
          });
          this.success = true;
        } catch (err) {
          this.err = true;
          this.serverErr = "";
          this.serverErr =
            "فرایند تغییر رمز ورود شما با خطا مواجه شد ، لطفا بعدا دوباره امتحان کنید";
        }
      }
      this.loading = false;
    },
    Password() {
      if (validator.isEmpty(this.password))
        this.errors.password = "این فیلد نباید خالی باشد";
      else if (!validator.isLength(this.password, { min: 8, max: 16 }))
        this.errors.password = "رمز ورود باید حداقل 8 و حداکثر 16 حرف باشد";
      else this.errors.password = "";
    },
    confirmPassword() {
      if (this.password !== this.confirmpassword)
        this.errors.confirmpassword =
          "این مقدار با مقدار رمز ورود شما یکسان نیست";
      else this.errors.confirmpassword = "";
    }
  },
  async created() {
    try {
      let res = await axios({
        method: "post",
        url: `http://localhost:4000/reset-password-check/${
          this.$route.params.token
        }`
      });
    } catch (err) {
      this.err = true;
      this.serverErr = "";
      this.serverErr = "توکن شما منقضی شده لطفا مجدد همین فرایند را انجام دهید";
      setTimeout(() => {
        this.err = false;
        this.serverErr = "";
        this.$router.push("/reset-password");
      }, 10000);
    }
    this.firstloading = false;
  }
};
</script>
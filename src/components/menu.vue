<template>
  <nav id="nav">
    <div class="d-flex flex-wrap align-items-center justify-content-between">
      <div class="items">
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div id="logo">
            <router-link to="/">
              <img src="../../public/siteMenu_Logo.png" alt="آکولاد">
            </router-link>
          </div>
          <button class="category">
            <i class="fas fa-bars"></i>
            <span style="margin-right:10px;">دسته بندی</span>

            <div class="menu">
              <a href="#" class="d-flex justify-content-between" id="programming">
                <div class="d-flex align-items-center">
                  <i class="fas fa-code ml-3"></i>
                  <span>برنامه نویسی</span>
                </div>
                <i class="fas fa-chevron-left mr-5"></i>
                <!--Starting  sub menu-->
                <div class="sub-menu" id="sub-programming">
                  <a href="#" class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <i class="fab fa-node ml-3"></i>
                      <span>nodejs</span>
                    </div>
                    <i class="far fa-circle mr-5"></i>
                  </a>
                  <a href="#" class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <i class="fas fa-code ml-3"></i>
                      <span>++c</span>
                    </div>
                    <i class="far fa-circle mr-5"></i>
                  </a>
                </div>
              </a>
              <a href="#" class="d-flex justify-content-between" id="graphic">
                <div class="d-flex align-items-center">
                  <i class="fas fa-pen ml-3"></i>
                  <span>طراحی و گرافیک</span>
                </div>
                <i class="fas fa-chevron-left mr-5"></i>

                <!--Starting  sub menu-->
                <div class="sub-menu" id="sub-graphic">
                  <a href="#" class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <i class="fab fa-adobe ml-3"></i>
                      <span>فتوشاپ</span>
                    </div>
                    <i class="far fa-circle mr-5"></i>
                  </a>
                  <a href="#" class="d-flex justify-content-between">
                    <div class="d-flex align-items-center">
                      <i class="fab fa-adobe ml-3"></i>
                      <span>Illustrator</span>
                    </div>
                    <i class="far fa-circle mr-5"></i>
                  </a>
                </div>
              </a>
              <a href="#" class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="fas fa-film ml-3"></i>
                  <span>تدوین</span>
                </div>
                <i class="fas fa-chevron-left mr-5"></i>
              </a>
              <a href="#" class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="fas fa-microchip ml-3"></i>
                  <span>سخت افزار</span>
                </div>
                <i class="fas fa-chevron-left mr-5"></i>
              </a>
              <a href="#" class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                  <i class="fas fa-tv ml-3"></i>
                  <span>نرم افزار</span>
                </div>
                <i class="fas fa-chevron-left mr-5"></i>
              </a>
            </div>
          </button>
        </div>
      </div>
      <div v-if="!auth">
        <router-link to="/login" tag="a" id="login">ورود</router-link>
        <router-link to="/singup" tag="a">ثبت نام</router-link>
      </div>
      <div v-if="auth">
        <router-link to="/profile" tag="a" id="login">حساب کاربری</router-link>

        <button @click="logout">خروج</button>
      </div>
    </div>
  </nav>
</template>


<style scoped>
.category:focus .menu {
  display: block;
}
.menu {
  color: #000 !important;
  position: absolute;
  background-color: #fff;
  display: none;
  margin-top: 24px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
}
.menu::before {
  border: 8px solid transparent;
  border-bottom-color: rgba(27, 31, 35, 0.15);
}
.menu a {
  text-align: center;
  padding: 12px !important;
  list-style: none;
  color: #000 !important;
}
.menu a:hover {
  background-color: #f5f5f5;
}
.sub-menu {
  display: none;
  right: 205px;
  position: absolute;
  color: #000000 !important;
  background-color: #fff !important;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
}
#graphic:hover #sub-graphic {
  display: block;
}
#programming:hover #sub-programming {
  display: block;
}
.category {
  background: none;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  color: #fdfdfd;
  outline: none;
  transition: all 0.2s;
}
.category:focus {
  background-color: #377475;
}
#nav {
  background-color: #346667;
  font-size: 0.9rem;
}
#nav a,
button {
  padding: 30px;
  text-decoration: none;
  color: #fff;
  transition: all 0.2s;
  background: none;
  border: none;
}
#login {
  padding: 10px 30px !important;
  border: 2px solid #fdfdfd !important;
  border-radius: 5px;
}
#login:hover {
  background-color: #fff;
  color: #346667;
}
</style>

<script>
import { event } from "@/main.js";
import axios from "axios";
export default {
  data() {
    return {
      auth: false
    };
  },
  methods: {
    async logout() {
      let token = await localStorage.getItem("auth");
      if (token) {
        try {
          let res = await axios({
            method: "post",
            url: "http://localhost:4000/logout",
            data: {
              token
            }
          });
        } catch (err) {}
        this.auth = false;
        localStorage.removeItem("auth");
      } else this.$router.push("/");
    }
  },
  created() {
    let token = localStorage.getItem("auth");
    if (token) this.auth = true;
  }
};
</script>


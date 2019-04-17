<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="com-lg-8 col-md-10 col-sm-12">
          <p>داشبورد</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import adminMenu from "@/components/admin-menu.vue";
import adminTopMenu from "@/components/admin-top-menu.vue";
import { async } from "q";
import axios from "axios";
import paginate from "vuejs-paginate";
export default {
  components: { adminMenu, adminTopMenu, paginate },
  async beforeRouteEnter(to, from, next) {
    const token = localStorage.getItem("auth");
    if (!token) next("/login");
    else {
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost:4000/admin",
          data: {
            token
          }
        });
        if (res.status == 200) next();
      } catch (err) {
        if (err.response.status === 401) next("/login");
        else next("/");
      }
    }
  }
};
</script>

<style scope>
.msg {
  color: grey;
  margin-top: 25vh;
  text-align: center !important;
}

.newcourse {
  padding: 5px 20px;
  border: none;
  border-radius: 50px;
  background-color: #7cb342;
  margin: 5vh 0;
  color: #fff;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.5s;
}
.newcourse:hover {
  background-color: #82c53b;
}
</style>

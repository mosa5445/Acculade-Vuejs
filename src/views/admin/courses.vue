<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="com-lg-8 col-md-10 col-sm-12" id="list">
          <router-link tag="button" class="newcourse" to="/">ایجاد دوره جدید</router-link>
          <div class="course" v-for="course in courses" :key="course._id">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div
                class="d-flex align-items-center justify-content-around flex-wrap col-lg-10 col-12"
              >
                <div class="item col-md-4 col-sm-12">
                  <div class="d-flex flex-column">
                    <span class="title">نام دوره</span>
                    <span class="info">{{course.title}}</span>
                  </div>
                </div>

                <div class="item col-md-2 col-sm-4">
                  <div class="d-flex flex-column">
                    <span class="title">نوع دوره</span>
                    <span class="info">{{ course.type }}</span>
                  </div>
                </div>

                <div class="item col-md-3 col-sm-4">
                  <div class="d-flex flex-column">
                    <span class="title">زمان دوره</span>
                    <span class="info">{{ course.time }}</span>
                  </div>
                </div>

                <div class="item col-md-3 col-sm-4">
                  <div class="d-flex flex-column">
                    <span class="title">بازدید دوره</span>
                    <span class="info">{{ course.viewCount }}</span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-around btnbox flex-fill flex-wrap">
                <router-link to="#" tag="button" id="edit" class="mybtn">ویرایش دوره</router-link>
                <router-link to="#" tag="button" id="remove" class="mybtn">حذف دوره</router-link>
              </div>
            </div>
          </div>
          <p v-if="!courses" class="msg">دوره ای برای نمایش وجود ندارد</p>
          <p v-if="err" class="msg">خطا در برقراری ارتباط با سرور</p>
          <p v-if="loading" class="msg">
          <paginate
          v-if="!loading && courses"
            :page-count="totalPages"
            :click-handler="page"
            :prev-text="'قبلی'"
            :next-text="'بعدی'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :page-link-class="'page-item-link'"
            :prev-class="'prev-class'"
            :prev-link-class="'prev-link-class'"
            :next-class="'next-class'"
            :next-link-class="'next-link-class'"
            :disabled-class="'disabled-class'"
          >
            <span slot="prevContent">Changed previous button</span>
            <span slot="nextContent">Changed next button</span>
            <span slot="breakViewContent">
              <svg width="16" height="4" viewBox="0 0 16 4">
                <circle fill="#999999" cx="2" cy="2" r="2"></circle>
                <circle fill="#999999" cx="8" cy="2" r="2"></circle>
                <circle fill="#999999" cx="14" cy="2" r="2"></circle>
              </svg>
            </span>
            >
          </paginate>
            <span class="spinner-border spinner-border-md"></span>
          </p>
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
  data() {
    return {
      courses: [],
      Page: 1,
      totalPages: 1,
      loading: false,
      err: false
    };
  },
  methods: {
    async page(page) {
      let token = localStorage.getItem("auth");
      this.loading = true;
      let res = await axios({
        method: "post",
        url: "http://localhost:4000/admin/courses-info",
        data: {
          token,
          page
        }
      });
      this.courses = res.data.courses.docs;
      this.loading = false;
    }
  },
  async created() {
    this.loading = true;
    try {
      let token = localStorage.getItem("auth");
      const res = await axios({
        method: "post",
        url: "http://localhost:4000/admin/courses-info",
        data: {
          token
        }
      });
      this.courses = res.data.courses.docs;
      this.totalPages = res.data.courses.totalPages;
    } catch (err) {
      console.log(err.response);
      this.err = true;
    }
    this.loading = false;
  }
};
</script>

<style>
.pagination {
  margin: 20px auto;
  justify-content: center;
}
.page-item {
  background-color: #fdfdfd;
  padding: 10px 20px;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
}

.page-item-link {
  color: #000;
  outline: none;
  text-decoration: none;
}

.page-item.active {
  background-color: #7cb342;
  box-shadow: none;
}
.page-item.active a {
  color: #fff;
  box-shadow: none;
}

.prev-class {
  background-color: #fdfdfd;
  padding: 10px 30px;
  -webkit-border-top-right-radius: 5px;
  -webkit-border-bottom-right-radius: 5px;
  -moz-border-radius-topright: 5px;
  -moz-border-radius-bottomright: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
}

.prev-link-class {
  color: #000;
}

.next-class {
  background-color: #fdfdfd;
  padding: 10px 30px;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-bottom-left-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-bottomleft: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.03);
}
.next-link-class {
  color: #000;
}
.disabled-class {
  filter: blur(1px);
}
</style>

<style scope>
.msg {
  color: grey;
  margin-top: 25vh;
  text-align: center !important;
}
#list {
  margin: auto;
}
.course {
  background-color: #fdfdfd;
  margin: 2px 10px;
  padding: 10px;
  border-radius: 5px;
  border-right: 5px solid #7cb342;
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
.mybtn {
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #fff;
  outline: none;
}
#remove {
  background-color: #ef5350 !important;
  margin-top: 5px !important;
}
#remove:hover {
  background-color: #f3423f !important;
}
#edit {
  background-color: #00acc1 !important;
  margin-top: 5px !important;
}
#edit:hover {
  background-color: rgb(4, 188, 212) !important;
}
.item {
  text-align: right !important;
  padding: 5px;
  /* margin: 0 20px; */
}
.title {
  color: grey;
  font-size: 0.8rem;
}
.info {
  color: #000;
  font-size: 0.9rem;
}
</style>

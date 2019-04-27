<template>
  <div class="home">
    <siteMenu></siteMenu>
    <div class="header">
      <img src="@/../public/homePageLogo.png" alt="آکولاد" class="logo-main">
    </div>
    <div class="container">
      <div class="my-3">
        <div>
          دوره های بروز شده
          <hr>
        </div>
        <div style="text-align:center;">
          <span v-if="!loading && err">خطا در برقراری ارتباط با سرور</span>
          <span v-if="courses.length == 0 && !err && !loading">هیچ دوره ای یافت نشد</span>
          <!-- <span class="spinner-border spinner-border-md" v-if="loading"></span> -->
          <div v-if="loading" class="d-flex flex-wrap mt-3 mb-5">
            <div class="col-lg-4 col-sm-12">
              <div class="pre-course">
                <div class="pre-image-place"></div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12">
              <div class="pre-course">
                <div class="pre-image-place"></div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-12">
              <div class="pre-course">
                <div class="pre-image-place"></div>
              </div>
            </div>
          </div>
        </div>
        <section class="d-flex flex-wrap p-2" v-if="!loading">
          <div class="col-lg-4 col-md-6 col-sm-12" v-for="course in courses" :key="course._id">
            <div class="course">
              <div class="imagePlace">
                <router-link :to="`/courses/${course.slug}`" tag="a">
                  <img
                    :src="`http://localhost:4000/${course.images[480]}`"
                    :alt="courses.title"
                    class="course-image"
                  >
                </router-link>
              </div>
              <div class="course-content">
                <header class="course-title">
                  <router-link :to="`/courses/${course.slug}`" tag="a">
                    <h5>{{course.title}}</h5>
                  </router-link>
                </header>
                <div class="course-content-main" style="font-size:0.9rem; color: #424242; ">
                  <p>{{course.content.substr(0 , 150)}} ...</p>
                </div>
                <footer>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center my-3">
                    <div style="font-size:0.8rem; color: grey; " class="ml-2 mr-3 d-flex flex-column">
                      <span style=" text-align: center;">{{course.viewCount}}</span>
                      <span>بازدید</span>
                    </div>

                    <div class="virtual-line"></div>

                    <div style="font-size:0.8rem; color: grey; " class="mx-1 d-flex flex-column">
                      <span style=" text-align: center;">{{course.commentCount}}</span>
                      <span>دیدگاه</span>
                    </div>

                    <div class="virtual-line"></div>

                    <div style="font-size:0.8rem; color: green; " class="mx-1">
                      <div v-if="course.type == 'sale'" class="d-flex flex-column">
                        <span style=" text-align: center;">{{course.price}}</span>
                        <span>تومان</span>
                      </div>
                      <div v-if="course.type == 'vip'" class="d-flex flex-column">
                        <span style=" text-align: center;">VIP</span>
                        <span style="text-align:center;">نوع دوره</span>
                      </div>
                      <div v-if="course.type == 'free'" class="d-flex flex-column">
                        <span style=" text-align: center;">رایگان</span>
                      </div>
                    </div>

                    <div class="virtual-line"></div>

                    <div style="font-size:0.8rem; color: grey; " class="ml-3 mr-2 d-flex flex-column">
                      <span style=" text-align: center;">{{course.time}}</span>
                      <span style="text-align:center;">طول دوره</span>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pre-course {
  height: 300px;
  background-color: #eeeeee;
  border-radius: 5px;
  overflow: hidden;
}
.pre-image-place {
  width: 100%;
  height: 60%;
  background-color: #e0e0e0;
}
a {
  text-decoration: none;
  color: #000;
  transition: all 0.2s;
}
a:hover {
  color: #346667;
  text-decoration: none;
}
.virtual-line {
  border-left: solid 1px grey;
  height: 35px;
  opacity: 0.3;
}
.header {
  text-align: center;
  width: 100%;
  height: 50vh;
  background: rgb(52, 102, 103);
  background: -moz-radial-gradient(
    circle,
    rgba(52, 102, 103, 1) 0%,
    rgba(0, 137, 123, 1) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(52, 102, 103, 1) 0%,
    rgba(0, 137, 123, 1) 100%
  );
  background: radial-gradient(
    circle,
    rgba(52, 102, 103, 1) 0%,
    rgba(0, 137, 123, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#346667",endColorstr="#00897b",GradientType=1);
}
.logo-main {
  width: 50%;
  height: 100%;
  object-fit: cover;
}
.course {
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  margin: 10px;
  overflow: hidden;
}

.imagePlace {
  width: 100%;
  height: 20vh;
}
.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.course-content {
  background-color: #fdfdfd;
  padding: 10px 10px 1px 10px;
}
</style>


<script>
import siteMenu from "@/components/menu.vue";
import axios from "axios";
export default {
  name: "home",
  components: {
    siteMenu
  },
  data() {
    return {
      courses: [],
      totalPages: 0,
      err: false,
      loading: false
    };
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:4000/course"
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



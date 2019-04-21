<template>
  <div class="singlePage">
    <siteMenu></siteMenu>
    <div class="container my-5">
      <main>
        <div class="flex flex-wrap">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <div class="content">
              <header>
                <div
                  id="title"
                  class="px-3 py-2 mb-2 d-flex justify-content-between align-items-center flex-wrap"
                  style="font-family: 'Yekan' , 'iranSans';"
                >
                  <div class="d-flex flex-column">
                    <h3>دوره آموزشی کوفت</h3>
                    <div style="color:grey; font-size: 0.8rem;" class="d-flex align-items-center">
                      <span class="ml-2">شما اینجا هستید:</span>
                      <router-link to="/" class="ml-2">اکولاد</router-link>
                      <i class="fas fa-angle-left ml-2"></i>
                      <router-link to="/courses" class="ml-2">دوره ها</router-link>
                      <i class="fas fa-angle-left ml-2"></i>
                      <span>دوره آموزشی کوفت</span>
                    </div>
                  </div>
                  <span
                    style="font-family: 'iranSans'; font-size: 0.8rem;"
                    class="my-2"
                  >امتیاز دوره : 4.5/5</span>
                </div>
                <div class="imgPlace">
                  <img :src="`http://localhost:4000/${course.images[720]}`" alt class="post-image">
                </div>
                <div class="p-3 my-3" id="info">
                  <div
                    class="d-flex justify-content-around align-items-center"
                    style="color:grey;font-size:0.8rem;"
                  >
                    <div class="d-flex flex-column" style="text-align:center;">
                      <span>مدرس</span>
                      <span>محمد صادقیان</span>
                    </div>

                    <div class="d-flex flex-column" style="text-align:center;">
                      <span>اخرین بروز رسانی</span>
                      <span>2 اردیبهشت 98</span>
                    </div>

                    <div class="d-flex flex-column" style="text-align:center;">
                      <span>قسمت های منتشر شده</span>
                      <span>{{course.episodes.length}} قسمت</span>
                    </div>
                  </div>
                </div>
              </header>
              <div class="my-2">
                <div class="d-flex align-items-stretch my-2" id="selectors">
                  <button class="btn btn-success" style="width: 50%;">توضیحات</button>
                  <button class="btn" style="width: 50%;">نمایش قسمت ها</button>
                </div>
                <article id="description" class="my-2">{{course.content}}</article>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-2 col-sm-12">
            <aside></aside>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #000;
  transition: all 0.2s;
  
}
a:hover {
  color: #346667;
  text-decoration: none;
}
.content {
  border-radius: 5px;
}
.content > header {
  width: 100%;
  height: 600px;
}
#title {
  width: 100%;
  background-color: #fdfdfd;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
  color: #212121;
}
.imgPlace {
  height: 70%;
}
.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
}
#info {
  background-color: #fdfdfd;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
}
#selectors {
  background-color: #fdfdfd;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  
}
#description {
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  line-height: 2rem;
  
  color: #212121;
  font-family: "Yekan"
}
#description > p {
  
  font-size: 0.95rem;
  
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
      course: {},
      err: false,
      loading: false
    };
  },
  async created() {
    this.loading = true;
    try {
      let slug = this.$route.params.slug;
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/course/${slug}`
      });
      this.course = res.data;
    } catch (err) {
      console.log(err.response);
      this.err = true;
    }
    this.loading = false;
  }
};
</script>



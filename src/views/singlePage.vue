<template>
  <div class="singlePage">
    <siteMenu></siteMenu>
    <div class="container my-5">
      <main>
        <div class="d-flex flex-wrap">
          <div class="col-lg-8 col-sm-12">
            <div class="content" v-if="!loading">
              <header>
                <div
                  id="title"
                  class="px-3 py-2 mb-2 d-flex justify-content-between align-items-center flex-wrap"
                  style="font-family: 'Yekan' , 'iranSans';"
                >
                  <div class="d-flex flex-column">
                    <h3>{{course.title}}</h3>
                    <div
                      style="color:grey; font-size: 0.8rem;"
                      class="d-flex align-items-center flex-wrap"
                    >
                      <span class="ml-2">شما اینجا هستید:</span>
                      <router-link to="/" class="ml-2">اکولاد</router-link>
                      <i class="fas fa-angle-left ml-2"></i>
                      <router-link to="/courses" class="ml-2">دوره ها</router-link>
                      <i class="fas fa-angle-left ml-2"></i>
                      <span>{{course.title}}</span>
                    </div>
                  </div>
                  <span
                    style="font-family: 'iranSans'; font-size: 0.8rem;"
                    class="my-2"
                  >امتیاز دوره : 4.5/5</span>
                </div>
                <div class="imgPlace">
                  <img
                    :src="`http://localhost:4000/${course.images[720]}`"
                    :alt="course.title"
                    class="post-image"
                  >
                </div>
                <div class="p-3 my-3 d-felx flex-wrap" id="info">
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
                      <span>3 اردیبهشت 1398</span>
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
                  <button
                    class="btn"
                    :class="{'btn-success' : !episode}"
                    style="width: 50%;"
                    @click="episode = false"
                  >توضیحات</button>
                  <button
                    class="btn"
                    :class="{'btn-success' : episode}"
                    style="width: 50%;"
                    @click="episode = true"
                  >نمایش قسمت ها</button>
                </div>
                <article class="description my-2" v-if="!episode">{{course.content}}</article>

                <!-- Episodes -->
                <section class="episodes" v-if="episode">
                  <div v-for="(episode , index) in course.episodes" :key="episode._id">
                    <div class="episode d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <div class="No mx-2 my-1">{{index}}</div>
                        <span>{{episode.title}}</span>
                      </div>
                      <div>
                        <span v-if="episode.preview" class="mx-5">پیش نمایش</span>
                        <span>
                          {{episode.time}}
                          <i class="far fa-clock mx-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-sm-12">
            <aside>
              <div class="side-object">
                <div class="d-flex justify-content-around my-2 side-bar-option">
                  <span>وضعیت دوره</span>
                  <span style="color:#000;">{{course.status ? 'تکمیل شده' : 'در حال برگزاری'}}</span>
                </div>

                <div class="d-flex justify-content-around my-2 side-bar-option" v-if="course.type == 'vip'">
                  <span>نوع دوره</span>
                  <span style="color:#000;">VIP</span>
                </div>
                
                <div class="d-flex justify-content-around my-2 side-bar-option" v-if="course.type == 'sale'">
                  <span>نوع دوره</span>
                  <span style="color:#000;">نقدی</span>
                </div>

                <div class="d-flex justify-content-around my-2 side-bar-option" v-if="course.type == 'free'">
                  <span>نوع دوره</span>
                  <span style="color:#000;">رایگان</span>
                </div>

                <div class="d-flex justify-content-around my-2 side-bar-option" v-if="course.type == 'sale'">
                  <span>هزینه دوره</span>
                  <span style="color:#000;">{{course.price}}</span>
                </div>

                <div class="mt-2 side-bar-option" style="text-align:center;" v-if="course.type == 'vip'">
                  <span>این دوره فقط برای کاربران دارای عضویت ویژه قابل دسترسی می باشد ، لطفا اکانت خود را ارتقا دهید</span>
                </div>

                <div class="mt-2 side-bar-option" style="text-align:center;" v-if="course.type == 'sale'">
                  <span>پس از پرداخت مبلغ {{ course.price }} تومان ، به طور کامل به این دوره دسترسی خواهید داشت</span>
                </div>

                <div class="mt-2 side-bar-option" style="text-align:center;" v-if="course.type == 'free'">
                  <span>این دوره رایگان است ، با خیال راحت دانلود کنید و به اشتراک بگذارید ;)</span>
                </div>
                <button class="btn btn-success btn-block mt-2" v-if="course.type == 'free'">بدون محدودیت دانلود کنید</button>
                <button class="btn btn-success btn-block mt-2" v-if="course.type == 'vip'">ارتقا به حساب VIP</button>
                <button class="btn btn-success btn-block mt-2" v-if="course.type == 'sale'">پرداخت و دانلود</button>
              </div>

              <div class="side-object my-3 d-flex flex-column align-items-center">
                <div class="my-1 side-bar-option">
                  <i class="fas fa-wallet mx-3"></i>
                  <span>امکان بازگشت وجه</span>
                </div>
                <div class="my-1 side-bar-option">
                  <i class="fas fa-envelope mx-3"></i>
                  <span>ارتباط مستقیم با مدرس</span>
                </div>
                <div class="my-1 side-bar-option">
                  <i class="fas fa-key mx-3"></i>
                  <span>دسترسی راحت</span>
                </div>
              </div>
            </aside>
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
.description {
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
  opacity: 0.9;
  text-align: justify;
}
#description > p {
  font-size: 0.95rem;
}
.side-bar-option {
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  background-color: #f5f5f5;
  color: grey;
  font-size: 0.8rem;
}
.side-object {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
}
.No {
  width: 43px;
  height: 43px;
  border-radius: 50%;
  border: solid 2px #28a745;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "iranSans";
}
.episode {
  font-family: "Yekan", "iranSans";
  padding: 10px;
  background-color: #fdfdfd;
  border-radius: 5px;
  margin: 10px 0;
  -webkit-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.03);
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
      loading: true,
      episode: false
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



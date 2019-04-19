<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex page">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="col-lg-8 col-md-10 col-sm-12" id="list">
          <form v-if="!nextPage" @submit.prevent="next">
            <h3 class="my-4">انتشار دوره در آکولاد</h3>

            <div class="input-group my-3">
              <input
                type="text"
                class="form-control text-left"
                placeholder="ادرس دوره"
                v-model="slug"
                @keyup="hasWhiteSpace"
                @blur="hasWhiteSpace"
              >
              <div class="input-group-prepend">
                <span class="input-group-text">/www.accolade.ir/courses</span>
              </div>
            </div>
            <p v-if="err.slug" class="my-3" style="color:red;font-size:0.8rem;">{{err.slug}}</p>
            <input
              type="text"
              class="form-control"
              placeholder="عنوان"
              v-model="title"
              @keyup="checktitle"
              @blur="checktitle"
            >
            <p v-if="err.title" class="my-3" style="color:red;font-size:0.8rem;">{{err.title}}</p>
            <textarea
              style="text-align:right !important;"
              name
              id
              cols="30"
              rows="10"
              class="form-control my-3"
              placeholder="توضیحات دوره"
              v-model="content"
              @keyup="contentcheck"
              @blur="contentcheck"
            ></textarea>
            <p v-if="err.content" class="my-3" style="color:red;font-size:0.8rem;">{{err.content}}</p>
            <span class="my-3 text-left" style="text-align: left !important;">تصویر دوره</span>
            <input
              type="file"
              class="form-control-file border my-3"
              @change="fileChange"
              ref="image"
            >
            <p v-if="err.file" class="mb-3" style="color:red;font-size:0.8rem;">{{err.file}}</p>
            <input type="text" class="form-control my-3" placeholder="برچسب ها" v-model="tag">
            <select name="cars" class="custom-select" v-model="type">
              <option selected>نوع دوره</option>
              <option value="free">رایگان</option>
              <option value="vip">مخصوص اعضای ویژه</option>
              <option value="sale">برای فروش</option>
            </select>

            <div class="input-group my-3" v-if="type == 'sale'">
              <div class="input-group-prepend">
                <span class="input-group-text">هزار تومان</span>
              </div>
              <input
                type="number"
                min="0"
                class="form-control text-left"
                placeholder="قیمت"
                v-model="price"
                @keyup="checkprice"
                @blur="checkprice"
              >
            </div>
            <p v-if="err.price" class="my-3" style="color:red;font-size:0.8rem;">{{err.price}}</p>
            <button class="newcourse my-5">مرحله بعد</button>
          </form>
          <div v-if="nextPage">
            <button class="newcourse" @click="nextPage = false">مرحله قبلی</button>
            <button class="newcourse mx-2" @click="newEpisode">افزودن قسمت جدید</button>
            <div>
              <div v-for="(episode , index) in episodes" :key="index" class="episode">
                <form class="d-flex flex-wrap my-3" @submit.prevent>
                  <input
                    type="text"
                    class="form-control col-lg-12 my-2"
                    placeholder="عنوان قسمت"
                    v-model="episode.title"
                  >
                  <input
                    type="text"
                    class="form-control col-lg-6"
                    placeholder="ادرس ویدئو دوره"
                    v-model="episode.url"
                  >
                  <div class="form-control col-lg-6">
                    <input
                      type="number"
                      max="59"
                      min="0"
                      name="sec"
                      class="time col-3"
                      placeholder="ثانیه"
                      v-model="episode.sec"
                    >
                    <span>:</span>
                    <input
                      type="number"
                      max="59"
                      min="0"
                      name="min"
                      class="time col-4"
                      placeholder="دقیقه"
                      v-model="episode.min"
                    >
                    <span>:</span>
                    <input
                      type="number"
                      max="1"
                      min="0"
                      name="hour"
                      class="time col-4"
                      placeholder="ساعت"
                      v-model="episode.hour"
                    >
                  </div>
                  <div class="custom-control custom-switch mx-auto mt-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      :id="index"
                      v-model="episode.preview"
                    >
                    <label class="custom-control-label" :for="index">پیش نمایش؟</label>
                  </div>
                  <br>
                </form>
                <button
                  class="btn btn-outline-danger btn-block mt-3"
                  @click="removeEpisode(index)"
                >حذف</button>
              </div>
              <div class="err-box" v-if="serverErr">
                <span>{{msg}}</span>
              </div>
              <div class="success-box" v-if="serverSuccess">
                <span>{{msg}}</span>
              </div>
              <button class="newcourse" @click="submit" type="submit">انتشار دوره</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import adminMenu from "@/components/admin-menu.vue";
import adminTopMenu from "@/components/admin-top-menu.vue";
import axios from "axios";
export default {
  components: { adminMenu, adminTopMenu },
  data() {
    return {
      nextPage: false,
      episodes: [
        {
          title: "",
          url: "",
          time: "",
          sec: "",
          min: "",
          hour: "",
          preview: false
        }
      ],
      slug: "",
      title: "",
      content: "",
      image: "",
      type: "free",
      price: "",
      tag: "",
      err: { slug: "", title: "", content: "", file: "", price: "" },
      serverErr: false,
      serverSuccess: false,
      msg: ""
    };
  },
  methods: {
    fileChange() {
      this.image = this.$refs.image.files[0];
      this.checkfile();
    },
    checkfile() {
      if (this.image.size > 1024 * 1024 * 2)
        this.err.file = "بیشترین حجم مجاز 2 مگابایت است";
      else if (this.image == "")
        this.err.file = "لطفا یک عکس برای دوره انتخاب کنید";
      else this.err.file = "";
    },
    hasWhiteSpace() {
      if (this.slug.indexOf(" ") >= 0)
        this.err.slug = "ادرس دوره نباید شامل فاصله خالی باشد";
      else if (this.slug == "")
        this.err.slug = "وارد کردن آدرس دوره الزامی است";
      else this.err.slug = "";
    },

    contentcheck() {
      if (this.content == "")
        this.err.content = "لطفا محتوای دوره را وارد کنید";
      else this.err.content = "";
    },

    checktitle() {
      if (this.title == "") this.err.title = "عنوان دوره نباید خالی بماند";
      else this.err.title = "";
    },

    checkprice() {
      if (this.type == "sale" && this.price == "")
        this.err.price = "قیمت دوره نباید خالی بماند";
      else this.err.price = "";
    },
    newEpisode() {
      this.episodes.push({
        title: "",
        url: "",
        time: "",
        sec: "",
        min: "",
        hour: "",
        preview: false
      });
    },

    removeEpisode(index) {
      this.episodes.splice(index, 1);
    },
    async next() {
      await this.checkfile();
      await this.hasWhiteSpace();
      await this.contentcheck();
      await this.checktitle();
      await this.checkprice();
      if (
        this.err.price == "" &&
        this.err.title == "" &&
        this.err.slug == "" &&
        this.err.content == "" &&
        this.err.file == ""
      ) {
        this.nextPage = true;
      }
    },
    async submit() {
      const token = localStorage.getItem("auth");

      //concat hour min sec in time
      this.episodes.forEach(episode => {
        episode.time = "";
        if (episode.min.length == 1) episode.min = "0" + episode.min;

        if (episode.sec.length == 1) episode.sec = "0" + episode.sec;

        if (episode.hour == "") episode.time = episode.min + ":" + episode.sec;
        else
          episode.time = episode.hour + ":" + episode.min + ":" + episode.sec;
      });
      let err = false;
      for (let i = 0; i < this.episodes.length && !err; i++) {
        if (
          !this.episodes[i].title ||
          !this.episodes[i].url ||
          !this.episodes[i].time
        )
          err = true;
      }
      if (err) {
        this.msg = "";
        this.serverErr = true;
        this.msg = "لطفا تمام موارد خواسته شده را وارد کنید";
      } else {
        this.serverErr = false;
        this.msg = "";
        let jsonEpisodes = await JSON.stringify(this.episodes);

        let formData = new FormData();
        formData.append("image", this.image);
        formData.append("title", this.title);
        formData.append("type", this.type);
        formData.append("price", this.price);
        formData.append("content", this.content);
        formData.append("tag", this.tag);
        formData.append("slug", this.slug);
        formData.append("episodes", jsonEpisodes);
        formData.append("token", token);
        try {
          let res = await axios({
            method: "post",
            url: "http://localhost:4000/admin/submit-new-course",
            headers: {
              token: token
            },
            data: formData
          });
          this.serverErr = false;
          this.msg = "";
          this.serverSuccess = true;
          this.msg = res.data.msg;
        } catch (err) {
          this.serverSuccess = false;
          this.msg = "";
          this.serverErr = true;
          if (err.response.data.err) this.msg = err.response.data.err;
          else if (err.response.status == 401)
            this.msg = "لطفا دوباره وارد سایت شوید";
          else this.msg = "به نظر میاد که یه مشکلی هست ، لطفا دوباره امتحان کن";
          console.log("err", err, " ", err.response.data);
        }
      }
    }
  }
};
</script>


<style scoped>
.form-control {
  text-align: center;
}
.episode {
  border: 1px solid #eeeeee;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #fdfdfd;
  -webkit-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.02);
  -moz-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.02);
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.02);
}
.time {
  border: none;
  text-align: center;
  outline: none;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  text-align: center !important;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: center !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  text-align: center !important;
}
#list {
  margin: auto;
}
.newcourse {
  padding: 5px 20px;
  border: none;
  border-radius: 50px;
  background-color: #7cb342;
  margin: 5vh 0;
  color: #fff !important;
  -webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.5s;
}
.newcourse:hover {
  background-color: #82c53b;
}
.blur {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.err-box {
  text-align: center;
  background-color: #d32f2f;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  margin: 0 30px;
  font-size: 0.9rem;
}
.success-box {
  text-align: center;
  background-color: #4caf50;
  border-radius: 5px;
  color: #fff;
  padding: 10px;
  margin: 10px 30px;
  font-size: 0.9rem;
}
.page {
  height: 93vh;
}
</style>



<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="col-lg-8 col-md-10 col-sm-12" id="list">
          <div class="err-box my-4" v-if="serverErr">
            <span>{{msg}}</span>
          </div>
          <div class="success-box my-4" v-if="serverSuccess">
            <span>{{msg}}</span>
          </div>
          <form @submit.prevent :class="{blur : serverSuccess}" v-if="!episodePage ">
            <h3 class="mt-4">ویرایش دوره</h3>
            <button class="newcourse" type="submit" @click="submit">ذخیره تغییرات</button>
            <button class="newcourse mx-2" @click="episodePage = true">ویرایش قسمت های دوره</button>
            <br>
            <span class="my-3 text-left" style="text-align: left !important;">تصویر دوره</span>
            <div class="d-flex flex-column">
              <img :src="thumbnail" alt="تصویر دوره" class="my-3" style="object-fit:cover;">
              <input
                v-if="imageChanged"
                type="file"
                class="form-control-file border my-3"
                @change="fileChange"
                ref="image"
              >
              <p
                v-if="err.file && imageChanged"
                class="mb-3"
                style="color:red;font-size:0.8rem;"
              >{{err.file}}</p>
              <a
                class="btn"
                :class="[!imageChanged ? 'btn-success' : 'btn-danger' ]"
                @click="imageHandler"
                style="color:#fff;  cursor: pointer;"
              >{{changePictureBtnMsg}}</a>
            </div>
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
              name
              id
              style="text-align:right;"
              cols="30"
              rows="10"
              class="form-control my-3"
              placeholder="توضیحات دوره"
              v-model="content"
              @keyup="contentcheck"
              @blur="contentcheck"
            ></textarea>
            <p v-if="err.content" class="my-3" style="color:red;font-size:0.8rem;">{{err.content}}</p>
            <input type="text" class="form-control my-2" placeholder="برچسب ها" v-model="tag">

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

            <select name="cars" class="custom-select mt-2 mb-5" v-model="type">
              <option selected>نوع دوره</option>
              <option value="free">رایگان</option>
              <option value="vip">مخصوص اعضای ویژه</option>
              <option value="sale">برای فروش</option>
            </select>
          </form>

          <form
            class="mb-5"
            :class="{blur : serverSuccess}"
            v-if="episodePage "
            @submit.prevent
            disabled
          >
            <h3 class="my-3">ویرایش اطلاعات قسمت ها</h3>
            <button class="newcourse mx-2" @click="episodePage = false">صفحه قبلی</button>
            <button class="newcourse mx-auto" @click="newEpisode">افزودن قسمت جدید</button>
            <div v-for="(episode , index) in episodes" :key="index" class="d-flex flex-wrap my-3">
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
              <a class="btn btn-outline-danger btn-block mt-3" @click="removeEpisode(index)">حذف</a>
            </div>
            <button class="newcourse mx-auto btn-block" @click="newEpisode">افزودن قسمت جدید</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

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
#list {
  margin: auto;
}
.newcourse {
  padding: 5px 20px;
  border: none;
  border-radius: 50px;
  background-color: #7cb342;
  margin: 2vh 0;
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
  margin-top: 50vh !important;
  position: absolute;
  font-size: 0.9rem;
  z-index: 1000;
  width: 100%;
  -webkit-box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.03);
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.03);
}
.blur {
  -webkit-filter: blur(8px);
  -moz-filter: blur(8px);
  -o-filter: blur(8px);
  -ms-filter: blur(8px);
  filter: blur(8px);
}
</style>

<script>
import adminMenu from "@/components/admin-menu.vue";
import adminTopMenu from "@/components/admin-top-menu.vue";
import { data } from "@/Mixing/edit-course/data.js";
import { episode } from "@/Mixing/edit-course/episode.js";
import { validation } from "@/Mixing/edit-course/validation.js";
import { submit } from "@/Mixing/edit-course/submit.js";
import { created } from "@/Mixing/edit-course/created.js";
export default {
  components: { adminMenu, adminTopMenu },
  mixins: [data, episode, validation, submit, created]
};
</script>
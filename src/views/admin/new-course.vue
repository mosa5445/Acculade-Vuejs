<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="col-lg-8 col-md-10 col-sm-12" id="list">
          <form @submit.prevent="submit">
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
            <button class="newcourse">انتشار دوره تازه</button>
          </form>
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
      slug: "",
      title: "",
      content: "",
      image: "",
      type: "free",
      price: "",
      tag: "",
      err: { slug: "", title: "", content: "", file: "", price: "" }
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
    async submit() {
      const token = localStorage.getItem("auth");
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
        let formData = new FormData();
        formData.append("image", this.image);
        formData.append("title", this.title);
        formData.append("type", this.type);
        formData.append("price", this.price);
        formData.append("content", this.content);
        formData.append("tag", this.tag);
        formData.append("slug", this.slug);
        formData.append("token", token);
        try {
          let res = await axios({
            method: "post",
            url: "http://localhost:4000/admin/submit-new-course",
            data: formData
          });
          console.log("res", res.data);
        } catch (err) {
          console.log("err", err, " ", err.response);
        }
      } 
    }
  }
};
</script>


<style scoped>
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

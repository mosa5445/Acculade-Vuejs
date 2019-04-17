<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="col-lg-8 col-md-10 col-sm-12" id="list">
          <form @submit.prevent="submit" :class="{blur : serverSuccess}">
            <h3 class="my-4">ویرایش دوره</h3>

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
            <div class="d-flex flex-column">
              <img :src="thumbnail" alt="تصویر دوره" class="my-3" style="object-fit:cover;">
              <button
                class="btn"
                :class="[!imageChanged ? 'btn-success' : 'btn-danger' ]"
                @click="imageHandler"
              >{{changePictureBtnMsg}}</button>
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
            </div>

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
            <button class="newcourse">ذخیره تغییرات</button>
          </form>
          <div class="err-box" v-if="serverErr">
            <span>{{msg}}</span>
          </div>
          <div class="success-box" v-if="serverSuccess">
            <span>{{msg}}</span>
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
      slug: "",
      title: "",
      content: "",
      image: "",
      type: "free",
      price: "",
      tag: "",
      changePictureBtnMsg: "میخوام تصویر را ویرایش کنم",
      thumbnail: "",
      imageChanged: false,
      err: { slug: "", title: "", content: "", file: "", price: "" },
      serverErr: false,
      serverSuccess: false,
      msg: ""
    };
  },
  methods: {
    imageHandler() {
      this.imageChanged = !this.imageChanged;
      if (this.imageChanged) this.changePictureBtnMsg = "منصرف شدم";
      else this.changePictureBtnMsg = "میخواهم تصویر را ویرایش کنم";
    },
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

      //if image was changed
      if (this.imageChanged) {
        if (
          this.err.price == "" &&
          this.err.title == "" &&
          this.err.slug == "" &&
          this.err.content == "" &&
          this.err.file == ""
        ) {
          let formData = new FormData();
          formData.append("id", this.$route.params.id);
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
              method: "put",
              url: "http://localhost:4000/admin/edit-course",
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
            else
              this.msg = "به نظر میاد که یه مشکلی هست ، لطفا دوباره امتحان کن";
            console.log("err", err, " ", err.response.data);
          }
        }      
      }

      //if image wasnt changed
      else {
        if (
          this.err.price == "" &&
          this.err.title == "" &&
          this.err.slug == "" &&
          this.err.content == ""           
        ) {
          try {
            let res = await axios({
              method: "put",
              url: "http://localhost:4000/admin/edit-course",
              data: {
                id: this.$route.params.id,
                title : this.title,
                type :  this.type,
                price : this.price,
                content : this.content,
                tag : this.tag,
                slug : this.slug,
                token
              }
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
            else
              this.msg = "به نظر میاد که یه مشکلی هست ، لطفا دوباره امتحان کن";
            console.log("err", err, " ", err.response.data);
          }
        }      
      }
    }
  },
  async created() {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:4000/course/${this.$route.params.slug}`
      });

      this.slug = res.data.slug;
      this.title = res.data.title;
      this.content = res.data.content;
      this.type = res.data.type;
      this.thumbnail = "http://localhost:4000/" + res.data.images[480];
      this.price = res.data.price;
      this.tag = res.data.tag;
    } catch (err) {
      alert(err);
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
.blur {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
</style>

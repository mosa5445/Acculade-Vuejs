<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="com-lg-8 col-md-10 col-sm-12" id="list">
          <router-link  tag="button" class="newcourse" to="/">ایجاد دوره جدید</router-link>
          <button class="newcourse" @click="page(2)">2</button>
          <div class="course" v-for="course in courses" :key="course._id">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div
                class="d-flex align-items-center justify-content-around  flex-wrap col-lg-10 col-12"
              >
                <div class="item col-3">
                  <div class="d-flex flex-column">
                    <span class="title">نام دوره</span>
                    <span class="info">{{course.title}}</span>
                  </div>
                </div>

                <div class="item col-2">
                  <div class="d-flex flex-column">
                    <span class="title">نوع دوره</span>
                    <span class="info">{{ course.type }}</span>
                  </div>
                </div>

                <div class="item col-2">
                  <div class="d-flex flex-column">
                    <span class="title">زمان دوره</span>
                    <span class="info">{{ course.time }}</span>
                  </div>
                </div>

                <div class="item 2">
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

          <h6 v-if="!courses" class="msg">دوره ای برای نمایش وجود ندارد</h6>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import adminMenu from "@/components/admin-menu.vue";
import adminTopMenu from "@/components/admin-top-menu.vue";
import { async } from 'q';
import axios from 'axios'
export default {
  components: { adminMenu, adminTopMenu },
  data(){
    return {
      courses : []
    }
  },
  methods:{
    async page(page) {
     let token = localStorage.getItem('auth');
     let res = await axios({
        method: 'post',
        url : 'http://localhost:4000/admin/courses-info',
        data: {
         token,
         page
       }
      })
      this.courses = res.data.courses.docs;
      console.log(res.data.courses);
    }
  },
  async created(){
   try {
     let token = localStorage.getItem('auth');
     const res = await axios({
       method :'post',
       url : 'http://localhost:4000/admin/courses-info',
       data: {
         token
       }
     }) 
     this.courses = res.data.courses.docs;
     console.log(res.data.courses);
   } catch (err) {
      console.log(err.response)
   }
 }
};
 
</script>


<style scoped>
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
  border-right: 5px solid green;

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

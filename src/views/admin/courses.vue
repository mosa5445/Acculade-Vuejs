<template>
  <div id="courses">
    <adminTopMenu></adminTopMenu>
    <div class="d-flex">
      <adminMenu></adminMenu>
      <div class="container-fluid">
        <div class="com-lg-8 col-md-10 col-sm-12" id="list">
          <router-link to tag="button" class="newcourse">ایجاد دوره جدید</router-link>

          <div class="course">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div
                class="d-flex align-items-center justify-content-around flex-fill flex-wrap col-lg-10 col-12"
              >
                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">نام دوره</span>
                    <span class="info">دوره آموزش کوفت</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">مدرس دوره</span>
                    <span class="info">ممد صادقیان</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ انتشار</span>
                    <span class="info">28/7/1397</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ اخرین اپدیت</span>
                    <span class="info">12/1/1398</span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-around btnbox flex-fill">
                <router-link to="#" tag="button" id="edit" class="mybtn">ویرایش دوره</router-link>
                <router-link to="#" tag="button" id="remove" class="mybtn">حذف دوره</router-link>
              </div>
            </div>
          </div>

          <div class="course">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div
                class="d-flex align-items-center justify-content-around flex-fill flex-wrap col-lg-10 col-12"
              >
                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">نام دوره</span>
                    <span class="info">دوره آموزش کوفت</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">مدرس دوره</span>
                    <span class="info">ممد صادقیان</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ انتشار</span>
                    <span class="info">28/7/1397</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ اخرین اپدیت</span>
                    <span class="info">12/1/1398</span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-around btnbox flex-grow-1">
                <router-link to="#" tag="button" id="edit" class="mybtn">ویرایش دوره</router-link>
                <router-link to="#" tag="button" id="remove" class="mybtn">حذف دوره</router-link>
              </div>
            </div>
          </div>

          <div class="course">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div
                class="d-flex align-items-center justify-content-around flex-fill flex-wrap col-lg-10 col-12"
              >
                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">نام دوره</span>
                    <span class="info">دوره آموزش کوفت</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">مدرس دوره</span>
                    <span class="info">ممد صادقیان</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ انتشار</span>
                    <span class="info">28/7/1397</span>
                  </div>
                </div>

                <div class="item">
                  <div class="d-flex flex-column">
                    <span class="title">تاریخ اخرین اپدیت</span>
                    <span class="info">12/1/1398</span>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-around btnbox flex-grow-1">
                <router-link to="#" tag="button" id="edit" class="mybtn">ویرایش دوره</router-link>
                <router-link to="#" tag="button" id="remove" class="mybtn">حذف دوره</router-link>
              </div>
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

export default {
  components: { adminMenu, adminTopMenu }
};
</script>


<style scoped>
.msg {
  color: grey;
  margin-top: 50vh;
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

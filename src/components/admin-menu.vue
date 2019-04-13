<template>
  <div id="admin-menu">
    <nav id="nav" class="p-1">
      <div id="admin-info">
        <i class="fas fa-user-secret fa-6x my-5"></i>
        <div>
          <span>محمد صادقیان</span>
          <br>
          <span style="color:#E0E0E0; font-size:0.8rem;">سطح دسترسی: ادمین</span>
        </div>
      </div>
      <ul class="my- px-0">
        <!-- item 1 -->
        <li class="item">
          <router-link to="#">
            <div class="d-flex justify-content-between px-4">
              <div>
                <i class="fas fa-home"></i>
                <span class="mr-4">داشبورد</span>
              </div>
              <i class="fas fa-chevron-left"></i>
            </div>
          </router-link>
        </li>

        <!-- item 2 -->
        <li class="item">
          <router-link to="/admin/courses">
            <div class="d-flex justify-content-between px-4">
              <div>
                <i class="fas fa-chalkboard-teacher"></i>
                <span class="mr-4">دوره ها</span>
              </div>
              <i class="fas fa-chevron-left"></i>
            </div>
          </router-link>
        </li>

        <!-- item 3 -->
        <li class="item">
          <router-link to="/">
            <div class="d-flex justify-content-between px-4">
              <div>
                <i class="fas fa-book-open"></i>
                <span class="mr-4">مقالات</span>
              </div>
              <i class="fas fa-chevron-left"></i>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
#admin-menu {
  bottom: 0px;
}
#nav {
  right: 0px;
  background-color: #fdfdfd;
  width: 15vw;
  min-width: 250px;
  font-size: 0.9rem;
  overflow: hidden;
  height: 92vh;
  -webkit-box-shadow: -1px 0px 5px 1px rgba(0, 0, 0, 0.03);
  -moz-box-shadow: -1px 0px 5px 1px rgba(0, 0, 0, 0.03);
  box-shadow: -1px 0px 5px 1px rgba(0, 0, 0, 0.03);
}
#nav a {
  color: #000;
  text-decoration: none;
}
#nav ul {
  list-style: none;
}
#admin-info {
  background-image: linear-gradient(
    -135deg,
    #21254e,
    #232c58 19%,
    #232c58 0,
    #232c58 0,
    #232d5a 23%,
    #232d5a 0,
    #24305d 40%,
    #24305d 0,
    #24305d 0,
    #2b4a83 87%
  );
  text-align: center;
  position: relative;
  top: -73px;
  width: 140%;
  height: 330px;
  margin-right: -20%;
  margin-bottom: -50px;
  padding-top: 65px;
  border-radius: 700px/251px;
  color: #fff;
}

.item {
  padding: 10px 0;
  cursor: pointer;
  border-radius: 5px;
}
.item:hover {
  background-color: #f5f5f5;
}
</style>

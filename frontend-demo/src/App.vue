<template>
  <div>
    <!-- Nav bar -->
    <div v-if="loggedIn">
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              src="./assets/logo.png"
              alt=""
              width="40"
              height="40"
              class="d-inline-block align-center"
            />
            Bestbeds
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse text-end"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="/"
                  ><i class="fas fa-home"></i> หน้าแรก</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/findbeds"
                  ><i class="fas fa-procedures"></i> ค้นหาเตียง</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/beds"
                  ><i class="fas fa-clipboard-list"></i> การจองเตียง</a
                >
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown dropstart">
                <a
                  class="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fas fa-user-circle fa-lg mx-1"></i> {{ info.fname }}
                  {{ info.lname }}
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a class="dropdown-item" href="/profile">ข้อมูลส่วนตัว</a>
                  </li>
                  <li>
                    <div class="dropdown-divider"></div>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/addbedsforsell"
                      >ฉันต้องการลงเตียง</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click="logout()"
                      ><span class="text-danger">ออกจากระบบ</span></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div v-else>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              src="./assets/logo.png"
              alt=""
              width="40"
              height="40"
              class="d-inline-block align-center"
            />
            Bestbeds
          </a>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="$route.name == 'login'">
              <a class="nav-link" href="/register">ลงทะเบียนเข้าใช้งาน</a>
            </li>
            <li
              class="nav-item"
              v-if="$route.name == 'index' || $route.name == 'register'"
            >
              <a class="nav-link" href="/login">ลงชื่อเข้าใช้งาน</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- Body -->
    <div class="container my-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      info: null,
    };
  },
  methods: {
    login(data) {
      let myJSON = JSON.stringify(data.info);
      localStorage.setItem("info", myJSON);
      this.$router.push("/");
    },
    logout() {
      localStorage.removeItem("info");
      this.loggedIn = false;
      this.info = null;
      this.$router.push("/login");
    },
  },
};
</script>

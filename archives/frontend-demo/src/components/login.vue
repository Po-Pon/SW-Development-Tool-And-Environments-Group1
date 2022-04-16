<template>
  <br /><br /><br />
  <div>
    <!-- Login Section -->
    <h3>ลงชื่อเข้าใช้งาน</h3>
    <br />
    <div class="content m-auto col-lg-8">
      <label class="form-label">อีเมล</label>
      <input
        type="email"
        class="form-control mb-3"
        placeholder="อีเมล"
        v-model="email"
      />
      <span v-if="v$.email.$error" style="color: red">
        <p>โปรดใส่ Email ให้ถูกต้อง</p>
      </span>
      <label class="form-label">รหัสผ่าน</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="รหัสผ่าน"
        v-model="pass"
      />
      <span v-if="v$.pass.$error" style="color: red">
        <p>โปรดใส่รหัสผ่านให้ถูกต้อง</p>
      </span>
      <p class="text-center">
        <button class="btn btn-primary" @click="loginValidate()">
          ลงชื่อเข้าใช้
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_IP, PORT } from "../assets/server/serverIP";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      pass: "",
    };
  },

  validations() {
    return {
      email: { required, email },
      pass: {
        required,
        minLength: minLength(5),
      },
    };
  },
  methods: {
    login() {
      let formData = {
        email: this.email,
        pass: this.pass,
      };
      axios
        .post(`https://${SERVER_IP}:${PORT}/login`, formData)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.$root.login(data);
            this.$router.push("/");
          } else {
            this.pass = "";
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    loginValidate() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        this.login();
      } else {
        alert("โปรดกรอกข้อมูลให้ถูกต้อง");
      }
    },
    authentication() {
      let info = JSON.parse(localStorage.getItem("info"));
      if (info != null) {
        this.$root.info = info;
        this.$root.loggedIn = true;
        this.$router.push("/");
      } else {
        this.loggedIn = false;
      }
    },
  },
  created() {
    this.authentication();
  },
};
</script>

<style scoped></style>

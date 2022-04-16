<template>
  <br /><br /><br />
  <div>
    <h3>ลงทะเบียนเข้าใช้งาน</h3>
    <br />
    <div class="content m-auto col-lg-8">
      <div class="row mb-3 g-2">
        <div class="col">
          <label class="form-label">ชื่อ</label>
          <input
            type="text"
            class="form-control"
            placeholder="ชื่อ"
            v-model="fname"
          />
          <span v-if="v$.fname.$error" style="color: red">
            <p>โปรดกรอก ชื่อจริง ให้ถูกต้อง(ไม่เกิน50ตัวอักษร)</p>
          </span>
        </div>
        <div class="col">
          <label class="form-label">นามสกุล</label>
          <input
            type="text"
            class="form-control"
            placeholder="นามสกุล"
            v-model="lname"
          />
          <span v-if="v$.lname.$error" style="color: red">
            <p>โปรดกรอก นามสกุล ให้ถูกต้อง(ไม่เกิน50ตัวอักษร)</p>
          </span>
        </div>
      </div>
      <label class="form-label">รหัสบัตรประชาชน</label>
      <input
        type="text"
        class="form-control"
        placeholder="รหัสบัตรประชาชน"
        v-model="idcard"
      />
      <span v-if="v$.idcard.$error" style="color: red">
        <p>โปรดกรอก รหัสบัตรประชาชน ให้ถูกต้อง(13หลัก)</p>
      </span>
      <label class="form-label">เบอร์ติดต่อ</label>
      <input
        type="text"
        class="form-control"
        placeholder="เบอร์ติดต่อ"
        v-model="phone"
      />
      <span v-if="v$.phone.$error" style="color: red">
        <p>โปรดกรอก เบอร์ติดต่อ ให้ถูกต้อง(10หลัก)</p>
      </span>
      <label class="form-label">อีเมล</label>
      <input
        type="email"
        class="form-control mb-3"
        placeholder="อีเมล"
        v-model="email"
      />
      <span v-if="v$.email.$error" style="color: red">
        <p>โปรดกรอก Email ให้ถูกต้อง(ความยาวไม่เกิน 50 ตัว)</p>
      </span>
      <label class="form-label">รหัสผ่าน</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="รหัสผ่าน"
        v-model="pass"
      />
      <span v-if="v$.pass.$error" style="color: red">
        <p>
          โปรดกรอก รหัสผ่าน ให้ถูกต้อง(ประกอบไปด้วย ตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก
          ตัวเลข และมีความยาวตั้งแต่ 6-18 ตัว)
        </p>
      </span>
      <label class="form-label">ยืนยันรหัสผ่าน</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="ยืนยันรหัสผ่าน"
        v-model="repass"
      />
      <span v-if="v$.repass.$error" style="color: red">
        <p>โปรดยืนยันรหัสผ่านให้ตรงกัน</p>
      </span>
      <p class="text-center">
        <button class="btn btn-success" @click="registerValidate()">
          ลงทะเบียน
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_IP, PORT } from "../assets/server/serverIP";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
      email: "",
      pass: "",
      repass: "",
      fname: "",
      lname: "",
      idcard: "",
      phone: "",
      lineid: "",
    };
  },

  validations() {
    return {
      email: { required, email, maxLength: maxLength(50) },
      pass: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(18),
        containsUppercase: function (value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function (value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function (value) {
          return /[0-9]/.test(value);
        },
      },
      repass: { required, sameAs: sameAs(this.pass) },
      fname: {
        required,
        maxLength: maxLength(50),
        Thai: function (value) {
          return /^[ก-ฮ a-z A-Z]/.test(value);
        },
        Nonum: function (value) {
          return !/[0-9]/.test(value);
        },
      },
      lname: {
        required,
        maxLength: maxLength(50),
        Thai: function (value) {
          return /^[ก-ฮ a-z A-Z]/.test(value);
        },
        Nonum: function (value) {
          return !/[0-9]/.test(value);
        },
      },
      idcard: {
        required,
        minLength: minLength(13),
        maxLength: maxLength(13),
        numeric,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
    };
  },

  methods: {
    register() {
      let formData = {
        email: this.email,
        pass: this.pass,
        fname: this.fname,
        lname: this.lname,
        idcard: this.idcard,
        phone: this.phone,
        lineid: this.lineid, // not required
      };
      axios
        .post(`https://${SERVER_IP}:${PORT}/register`, formData)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.$router.push("/login");
          } else {
            this.pass = "";
            this.repass = "";
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    registerValidate() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        this.register();
      } else {
        alert("โปรดกรอกข้อมูลทุกส่วนให้ถูกต้อง");
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

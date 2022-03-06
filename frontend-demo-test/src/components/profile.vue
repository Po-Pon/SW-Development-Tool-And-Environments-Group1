<template>
  <br /><br /><br />
  <div v-if="this.user != null">
    <h3><i class="fas fa-user-circle"></i> ข้อมูลผู้ใช้</h3>
    <br />

    <!-- ChangePass Section -->
    <div class="content m-auto col-lg-8" v-if="showChangePass">
      <label class="form-label">รหัสผ่านเดิม</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="รหัสผ่านเดิม"
        v-model="oldpass"
      />
      <label class="form-label">รหัสผ่านใหม่</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="รหัสผ่านใหม่"
        v-model="pass"
      />
      <label class="form-label">ยืนยันรหัสผ่านใหม่</label>
      <input
        type="password"
        class="form-control mb-3"
        placeholder="ยืนยันรหัสผ่านใหม่"
        v-model="repass"
      />
      <p class="text-center">
        <button class="btn btn-warning" @click="changePass()">
          เปลี่ยนรหัสผ่าน
        </button>
      </p>
    </div>
    
    <!-- ChangeInfo Section -->
    <div class="content m-auto col-lg-8" v-else>
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
      <label class="form-label">รหัสบัตรประชาชน 13 หลัก</label>
      <input
        type="text"
        class="form-control"
        placeholder="รหัสบัตรประชาชน 13 หลัก"
        v-model="idcard"
        readonly
      />
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
        readonly
      />
      <label class="form-label">LINE ID</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="LINE ID"
        v-model="lineid"
      />
      <span v-if="v$.lineid.$error" style="color: red">
        <p>โปรดกรอก LineId ไม่เกิน30ตัวอักษร</p>
      </span>
      <p class="text-center">
        <button class="btn btn-info mx-1" @click="updateValidate()">
          บันทึก
        </button>
        <a class="mx-1 link-secondary" @click="changePassPage()"
          >เปลี่ยนรหัสผ่าน</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_IP, PORT } from "../assets/server/serverIP";
import useValidate from "@vuelidate/core";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      oldpass: "",
      pass: "",
      repass: "",
      user: null,
      olddatauser: null,
      showChangePass: false,
      fname: "",
      lname: "",
      idcard: "",
      phone: "",
      email: "",
      lineid: "",
    };
  },
  validations() {
    return {
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
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      lineid: { maxLength: maxLength(30) },
    };
  },
  methods: {
    getUser() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/users/${this.olddatauser._id}`)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.user = data.info;
            this.fname = data.info.fname;
            this.lname = data.info.lname;
            this.idcard = data.info.idcard;
            this.phone = data.info.phone;
            this.email = data.info.email;
            this.lineid = data.info.lineid;
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateValidate() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // if ANY fail validation
        this.update();
      } else {
        alert("โปรดกรอกข้อมูลให้ถูกต้อง");
      }
    },
    update() {
      let formData = {
        fname: this.fname,
        lname: this.lname,
        idcard: this.idcard,
        phone: this.phone,
        email: this.email,
        lineid: this.lineid,
      };
      axios
        .put(`https://${SERVER_IP}:${PORT}/users/${this.user._id}`, formData)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            alert(data.message);
            this.$router.push("/profile");
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changePassPage() {
      alert("Demo");
      // this.showChangePass = true
    },
    changePass() {
      console.log("do changePass");
      this.$router.push("/");
    },
    authentication() {
      let info = JSON.parse(localStorage.getItem("info"));
      if (info != null) {
        this.$root.info = info;
        this.$root.loggedIn = true;
        this.olddatauser = info;
      } else {
        this.loggedIn = false;
        alert("โปรดลงชื่อเข้าใช้งาน");
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.authentication();
    this.getUser();
  },
};
</script>

<style scoped></style>

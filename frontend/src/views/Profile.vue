<template>
  <div v-if="user">
    <h2>ข้อมูลผู้ใช้</h2>
    <hr />
    <br />
    <div class="col-lg-7 mx-auto mb-5 content">
      <form @submit.prevent="validateProfile()">
        <div class="row g-2 mb-3">
          <div class="col">
            <label class="form-label">ชื่อ</label>
            <input
              type="text"
              v-model="profile.fname"
              class="form-control"
              :class="{ 'is-invalid': v$.profile.fname.$error }"
              placeholder="ชื่อ"
              maxlength="100"
              name="fname"
              aria-describedby="fname"
            />
            <div v-if="v$.profile.fname.$error" class="my-2 text-danger">
              โปรดป้อนชื่อให้ถูกต้อง
            </div>
          </div>
          <div class="col">
            <label class="form-label">นามสกุล</label>
            <input
              type="text"
              v-model="profile.lname"
              class="form-control"
              :class="{ 'is-invalid': v$.profile.lname.$error }"
              placeholder="นามสกุล"
              maxlength="100"
              name="lname"
              aria-describedby="lname"
            />
            <div v-if="v$.profile.lname.$error" class="my-2 text-danger">
              โปรดป้อนนามสกุลให้ถูกต้อง
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="idcard">รหัสบัตรประชาชน</label>
          <input
            type="text"
            v-model="profile.idcard"
            class="form-control"
            placeholder="รหัสบัตรประชาชน"
            maxlength="13"
            name="idcard"
            aria-describedby="idcard"
            readonly
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="phone">เบอร์ติดต่อ</label>
          <input
            type="text"
            v-model="profile.phone"
            class="form-control"
            :class="{ 'is-invalid': v$.profile.phone.$error }"
            placeholder="เบอร์ติดต่อ"
            maxlength="10"
            name="phone"
            aria-describedby="phone"
          />
          <div v-if="v$.profile.phone.$error" class="my-2 text-danger">
            โปรดป้อนเบอร์ติดต่อให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="email">อีเมล</label>
          <input
            type="email"
            v-model="profile.email"
            class="form-control"
            placeholder="อีเมล"
            maxlength="100"
            name="email"
            aria-describedby="email"
            readonly
          />
        </div>
        <div class="mb-3">
          <label class="form-label" for="lineid">LINE ID</label>
          <input
            type="text"
            v-model="profile.lineid"
            class="form-control"
            :class="{ 'is-invalid': v$.profile.lineid.$error }"
            placeholder="LINE ID"
            maxlength="100"
            name="lineid"
            aria-describedby="lineid"
          />
          <div v-if="v$.profile.lineid.$error" class="my-2 text-danger">
            โปรดป้อน LINE ID ให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-info">บันทึก</button>
        </div>
        <div class="mb-3 text-center">
          <router-link to="/changepassword">เปลี่ยนรหัสผ่าน</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, numeric } from "@vuelidate/validators"

export default {
  name: "Profile",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      profile: {
        fname: "",
        lname: "",
        idcard: "",
        phone: "",
        email: "",
        lineid: "",
      },
    }
  },
  validations() {
    return {
      profile: {
        fname: { required, maxLength: maxLength(100) },
        lname: { required, maxLength: maxLength(100) },
        idcard: {},
        phone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric,
        },
        email: {},
        lineid: {
          required,
          maxLength: maxLength(100),
        },
      },
    }
  },
  methods: {
    submitProfile() {
      let profile = {
        firstname: this.profile.fname,
        lastname: this.profile.lname,
        phone: this.profile.phone,
        lineid: this.profile.lineid,
      }
      axios_mod
        .put(`/users/profile`, profile)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.getMe()
            })
          } else {
            Swal.fire({
              title: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateProfile() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitProfile()
      }
    },
    getMe() {
      axios_mod
        .get("/users/me")
        .then((res) => {
          this.profile.fname = res.data.firstname
          this.profile.lname = res.data.lastname
          this.profile.idcard = res.data.idcard
          this.profile.phone = res.data.phone
          this.profile.email = res.data.email
          this.profile.lineid = res.data.lineid
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getMe()
  },
}
</script>

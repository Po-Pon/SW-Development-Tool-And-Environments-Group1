<template>
  <div>
    <h2>เปลี่ยนรหัสผ่าน</h2>
    <hr />
    <br />
    <div class="col-lg-7 mx-auto mb-5 content">
      <form @submit.prevent="validateChangepassword()">
        <div class="mb-3">
          <label class="form-label" for="oldpassword">รหัสผ่านเดิม</label>
          <input
            type="password"
            v-model="oldpassword"
            class="form-control"
            :class="{ 'is-invalid': v$.oldpassword.$error }"
            placeholder="รหัสผ่านเดิม"
            maxlength="20"
            name="oldpassword"
          />
          <div v-if="v$.oldpassword.$error" class="my-2 text-danger">
            โปรดป้อนรหัสผ่านเดิมให้ถูกต้อง (5 - 20 ตัวอักษร)
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่านใหม่</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': v$.password.$error }"
            placeholder="รหัสผ่านใหม่"
            maxlength="20"
            name="password"
          />
          <div v-if="v$.password.$error" class="my-2 text-danger">
            โปรดป้อนรหัสผ่านใหม่ให้ถูกต้อง (5 - 20 ตัวอักษร)
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="c_password">ยืนยันรหัสผ่านใหม่</label>
          <input
            type="password"
            v-model="c_password"
            class="form-control"
            :class="{ 'is-invalid': v$.c_password.$error }"
            placeholder="ยืนยันรหัสผ่านใหม่"
            maxlength="20"
            name="c_password"
          />
          <div v-if="v$.c_password.$error" class="my-2 text-danger">
            โปรดป้อนยืนยันรหัสผ่านใหม่ให้ถูกต้อง (เหมือนกับรหัสผ่านใหม่)
          </div>
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-warning">เปลี่ยนรหัสผ่าน</button>
        </div>
        <div class="mb-3 text-center">
          <router-link to="/profile">ย้อนกลับ</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators"

export default {
  name: "Changepassword",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      loaded: false,

      oldpassword: "",
      password: "",
      c_password: "",
    }
  },
  validations() {
    return {
      oldpassword: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
      password: { required, minLength: minLength(5), maxLength: maxLength(20) },
      c_password: { required, sameAs: sameAs(this.password) },
    }
  },
  methods: {
    submitChangepassword() {
      let passBody = {
        oldpassword: this.oldpassword,
        password: this.password,
        c_password: this.c_password,
      }
      axios_mod
        .put(`/users/changepassword`, passBody)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$root.logout()
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
    validateChangepassword() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitChangepassword()
      }
    },
  },
  created() {},
}
</script>

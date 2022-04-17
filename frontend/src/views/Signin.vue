<template>
  <div>
    <h2>ลงชื่อเข้าใช้งาน</h2>
    <hr />
    <br />
    <div class="col-lg-7 mx-auto mb-5 content">
      <form @submit.prevent="validateSignin()">
        <div class="mb-3">
          <label class="form-label" for="email">อีเมล</label>
          <input
            type="email"
            v-model="signin.email"
            class="form-control"
            :class="{ 'is-invalid': v$.signin.email.$error }"
            placeholder="อีเมล"
            maxlength="50"
            name="email"
            aria-describedby="email"
          />
          <div v-if="v$.signin.email.$error" class="my-2 text-danger">
            โปรดป้อนอีเมลให้ถูกต้อง
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="password">รหัสผ่าน</label>
          <input
            type="password"
            v-model="signin.password"
            class="form-control"
            :class="{ 'is-invalid': v$.signin.password.$error }"
            placeholder="รหัสผ่าน"
            maxlength="18"
            name="password"
          />
          <div v-if="v$.signin.password.$error" class="my-2 text-danger">
            โปรดป้อนรหัสผ่านให้ถูกต้อง (5 - 18 ตัวอักษร)
          </div>
        </div>
        <div class="mb-3 text-center">
          <button type="submit" class="btn btn-primary">
            ลงชื่อเข้าเข้าใช้งาน
          </button>
        </div>
        <div class="mb-3 text-center">
          ไม่ได้เป็นสมาชิกใช่ไหม คลิกที่นี่เพื่อ
          <router-link to="/signup">ลงทะเบียน</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, email, minLength, maxLength } from "@vuelidate/validators"
import Nprogress from "nprogress"
export default {
  name: "Signin",
  data() {
    return {
      v$: useVuelidate(),
      signin: {
        email: "",
        password: "",
      },
    }
  },
  validations() {
    return {
      signin: {
        email: { required, email },
        password: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(18),
        },
      },
    }
  },
  methods: {
    submitSignin() {
      Nprogress.start()
      axios
        .post(`http://159.223.45.216:6481/users/signin`, this.signin)
        .then((res) => {
          Nprogress.done()
          if (res.data.status) {
            localStorage.setItem("token", res.data.token)
            this.$emit("auth-change")
            this.$router.push("/")
          } else {
            Swal.fire({
              title: "ไม่สำเร็จ",
              text: res.data.message,
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            })
            this.signin.password = ""
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    validateSignin() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitSignin()
      }
    },
  },
}
</script>

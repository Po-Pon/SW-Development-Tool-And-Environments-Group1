<template>
  <div v-if="bed">
    <h2>แก้ไขสถานที่ จำนวนเตียง</h2>
    <hr />
    <br />
    <div class="col-lg-6 col-md-6 col-sm-12 m-auto">
      <form @submit.prevent="validateUpdateBedAmount()">
        <div class="mb-3">
          <label class="form-label" for="amount">จำนวนเตียง</label>
          <input
            type="number"
            v-model="bed.amount"
            class="form-control"
            :class="{ 'is-invalid': v$.bed.amount.$error }"
            placeholder="9999"
            min="0"
            max="9999"
            name="amount"
            aria-describedby="amount"
          />
          <div v-if="v$.bed.amount.$error" class="my-2 text-danger">
            โปรดป้อนจำนวนเตียงให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="address">ที่อยู่</label>
          <input
            type="text"
            :value="bed.address"
            class="form-control"
            name="address"
            aria-describedby="address"
            readonly
          />
          <div v-if="v$.bed.amount.$error" class="my-2 text-danger">
            โปรดป้อนจำนวนเตียงให้ถูกต้อง
          </div>
        </div>
        <div class="mb-3 text-center">
          <button class="btn btn-info" type="submit">บันทึก</button>
          <router-link :to="{ path: '/bededitaddress/' + bed.id }">
            <button class="btn btn-warning ms-2" type="button">
              แก้ไขที่อยู่
            </button>
          </router-link>
          <span class="ms-3">
            <router-link to="/bedsmanage"
              ><a class="text-secondary">ยกเลิก</a></router-link
            >
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import useVuelidate from "@vuelidate/core"
import { required, minValue, maxValue } from "@vuelidate/validators"
export default {
  name: "Bededit",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      bed: null,
    }
  },
  validations() {
    return {
      bed: {
        amount: { required, minValue: minValue(0), maxValue: maxValue(9999) },
      },
    }
  },
  methods: {
    submitUpdateBedAmount() {
      let bed = {
        amount: this.bed.amount,
      }
      axios_mod
        .put(`/bed/amount/${this.$route.params.id}`, bed)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.getBed()
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
    validateUpdateBedAmount() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitUpdateBedAmount()
      }
    },
    getBed() {
      axios_mod
        .get(`/bed/${this.$route.params.id}`)
        .then((res) => {
          this.bed = res.data.bed
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getBed()
  },
}
</script>
<style>
.pac-icon {
  display: none;
}
.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: #ececec;
}
.pac-item-query {
  font-size: 16px;
}
#map {
  background-color: #ffffff;
  height: 600px;
}
</style>

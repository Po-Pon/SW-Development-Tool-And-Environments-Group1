<template>
  <div>
    <h2>ข้อมูลผู้จอง</h2>
    <hr />
    <br />
    <div class="m-auto content col-lg-8 col-md-8 col-sm-12 mb-5" v-if="bed">
      <div class="mb-2 text-end">
        <span class="badge bg-success" v-if="bed.state">เปิด</span>
        <span class="badge bg-secondary" v-else>ปิด</span>
      </div>
      <div class="h5 mb-2">
        <i class="fa-solid fa-location-dot me-2"></i>
        {{ bed.address }}
      </div>
      <br />
      <div class="text-center">
        <button type="button" class="btn btn-primary mb-3">
          จำนวนเตียงคงเหลือ
          <span class="badge bg-white text-dark">{{
            bed.amount.toLocaleString()
          }}</span>
          เตียง
        </button>
      </div>
    </div>

    <div
      class="content animate__animated animate__fadeIn"
      v-if="customers.length"
    >
      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <td class="text-center"><b>วันที่ทำรายการ</b></td>
            <td class="text-center"><b>ชื่อ</b></td>
            <td class="text-center"><b>เบอร์ติดต่อ</b></td>
            <td class="text-center"><b>วันที่จะเข้าพักอาศัย</b></td>
            <td class="text-center"><b>ตรวจสอบ</b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <td class="text-center">
              {{ convertDate(customer.timestamp) }}
            </td>
            <td class="text-center">
              {{ customer.firstname }} {{ customer.lastname }}
            </td>
            <td class="text-center">{{ customer.phone }}</td>
            <td class="text-center">
              <span class="badge badge-lg text-dark bg-warning">{{
                convertDate(customer.date)
              }}</span>
            </td>
            <td class="text-center">
              <div v-if="customer.state === 1">
                <span class="badge bg-success"> ยืนยันแล้ว </span>
              </div>
              <div v-else-if="isAvailableDate(customer.date)">
                <button
                  class="btn btn-sm btn-outline-success"
                  @click="submitDeal(customer.bedsdealing_id)"
                >
                  ยืนยันผู้ใช้นี้เข้าพัก
                </button>
              </div>
              <div v-else>
                <span class="badge bg-secondary"> ยังไม่ถึงวันเข้าพัก </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="my-3 h4 text-center" v-else>ยังไม่มีผู้จอง</div>
  </div>
</template>
<script>
import moment from "moment"
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
const _ = require("lodash")
export default {
  name: "Customers",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      bed: null,
      customers: [],
    }
  },
  methods: {
    submitDeal(cus_id) {
      Swal.fire({
        title: `คุณต้องการยืนยันผู้ใช้รายนี้ เข้าพักใช่ไหม`,
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#157347",
        cancelButtonColor: "#6C757D",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios_mod
            .put(`/bedsdealing/customer/${cus_id}`)
            .then((res) => {
              if (res.data.status) {
                Swal.fire({
                  title: "สำเร็จ",
                  text: res.data.message,
                  icon: "success",
                  timer: 3000,
                  showConfirmButton: false,
                })
                this.getCustomers()
              } else {
                Swal.fire({
                  title: "ไม่สำเร็จ",
                  text: res.data.message,
                  icon: "error",
                  timer: 3000,
                  showConfirmButton: false,
                })
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
    isAvailableDate(rawDate) {
      const currDate = moment(new Date()).format("YYYY-MM-DD")
      const startDate = rawDate
      if (currDate >= startDate) {
        return true
      } else {
        return false
      }
    },
    convertDate(date) {
      moment.locale("th")
      return moment(date).format("LL")
    },
    getCustomers() {
      axios_mod
        .get(`/bedsdealing/customer/${this.$route.params.id}`)
        .then((res) => {
          this.bed = res.data.bed
          this.customers = _.orderBy(
            res.data.customers,
            ["state", "date"],
            ["asc", "asc"]
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getCustomers()
  },
}
</script>

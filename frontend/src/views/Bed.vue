<template>
  <div class="" v-if="user">
    <h2><i class="fa-solid fa-map-location-dot"></i> รายละเอียดเลือกจอง</h2>
    <hr />
    <div class="mb-3">
      <div id="map" class="m-auto my-5 w-100"></div>
    </div>
    <div class="m-auto content col-lg-8 col-md-8 col-sm-12 mb-5" v-if="bed">
      <div class="h5 mb-2">
        <i class="fa-solid fa-phone me-2"></i> {{ bed.phone }}
      </div>
      <div class="mb-2">
        <i class="fa-solid fa-face-smile-wink me-2"></i
        ><span class="text-secondary"
          >{{ bed.firstname }} {{ bed.lastname }}</span
        >
      </div>
      <div class="mb-2" v-if="bed.lineid">
        <i class="fa-brands fa-line me-2"></i
        ><span class="text-secondary">LINE ID {{ bed.lineid }}</span>
      </div>
      <div class="mb-4">
        <i class="fa-solid fa-location-dot me-2"></i
        ><span class="text-secondary">{{ bed.address }}</span>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-primary">
          พร้มจอง
          <span class="badge bg-white text-dark">{{
            bed.amount.toLocaleString()
          }}</span>
          เตียง
        </button>
      </div>
    </div>
    <!-- Buy -->
    <div
      class="mb-5"
      v-if="
        user.id !== bed?.user_id && bed?.amount !== 0 && !bedsdealingExisted
      "
    >
      <div class="h4 text-center">วันที่จะเข้าพักอาศัย</div>
      <div class="m-auto mb-3" id="buy">
        <div class="row">
          <div class="col">
            <input
              v-model="bedsdealing.date"
              type="date"
              class="form-control me-5"
              :class="{ 'is-invalid': v$.bedsdealing.date.$error }"
              :min="minDate()"
            />
          </div>
          <div class="col">
            <button
              class="btn btn-success"
              @click="validateCreateBedsdealing()"
            >
              จอง
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="v$.bedsdealing.date.$error"
        class="text-center my-2 text-danger"
      >
        โปรดป้อนจำนวนเตียงให้ถูกต้อง
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment"
import Swal from "sweetalert2"
import axios_mod from "@/plugins/axios"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
export default {
  name: "Bed",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      bed: null,
      bedsdealing: {
        date: "",
        bed_id: "",
        user_id: "",
      },
      bedsdealingExisted: false,
    }
  },
  validations() {
    return {
      bedsdealing: {
        date: {
          required,
        },
        bed_id: { required },
        user_id: { required },
      },
    }
  },
  methods: {
    submitCreateBeds() {
      axios_mod
        .post(`/bedsdealing`, this.bedsdealing)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "สำเร็จ",
              text: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/beds")
            })
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
    },
    validateCreateBedsdealing() {
      this.v$.$validate()
      if (!this.v$.$error) {
        moment.locale("th")
        let verifyDate = moment(this.bedsdealing.date).format("LL")
        Swal.fire({
          title: `คุณต้องการจองในวันที่ <span class="badge text-dark rounded-pill" style="background-color: #EAEAEA;">${verifyDate}</span> ใช่ไหม`,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#157347",
          cancelButtonColor: "#6C757D",
          confirmButtonText: "ยืนยันจอง",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitCreateBeds()
          }
        })
      }
    },
    minDate() {
      return moment(new Date()).add(1, "days").format("YYYY-MM-DD")
    },
    getBedsdealingByUserAndCheckIfExisted() {
      axios_mod
        .get(`/bedsdealingByUser`)
        .then((res) => {
          const bedsdealing = res.data.bedsdealing
          for (let i = 0; i < bedsdealing.length; i++) {
            let bed = bedsdealing[i]
            if (bed.beds_id === this.bed.id) {
              this.bedsdealingExisted = true
              break
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getBed() {
      axios_mod
        .get(`/bed/${this.$route.params.id}`)
        .then((res) => {
          this.bed = res.data.bed
          this.bedsdealing.bed_id = res.data.bed.id
          this.bedsdealing.user_id = this.user.id
          this.showUserLocationOnTheMap(res.data.bed.lat, res.data.bed.lng)
          this.getBedsdealingByUserAndCheckIfExisted()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showUserLocationOnTheMap(lat, lng) {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
      })
    },
  },
  created() {
    this.getBed()
  },
}
</script>
<style scoped>
#map {
  background-color: #ffffff;
  height: 600px;
}
#buy {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

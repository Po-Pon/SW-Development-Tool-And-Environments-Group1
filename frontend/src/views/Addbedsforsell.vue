<template>
  <div>
    <h2>เพิ่มสถานที่</h2>
    <hr />
    <br />
    <div class="col-lg-6 col-md-6 col-sm-12 m-auto">
      <form @submit.prevent="validateCreateBeds()">
        <div class="mb-3">
          <label class="form-label" for="amount">จำนวนเตียง</label>
          <input
            type="number"
            v-model="beds.amount"
            class="form-control"
            :class="{ 'is-invalid': v$.beds.amount.$error }"
            placeholder="9999"
            min="1"
            max="9999"
            name="amount"
            aria-describedby="amount"
          />
          <div v-if="v$.beds.amount.$error" class="my-2 text-danger">
            โปรดป้อนจำนวนเตียงให้ถูกต้อง
          </div>
        </div>
        <div class="row mb-3 g-2">
          <div class="col">
            <label class="form-label" for="fname">ชื่อ</label>
            <input
              type="text"
              class="form-control"
              placeholder="ชื่อ"
              maxlength="100"
              readonly
              name="fname"
              aria-describedby="fname"
              :value="profile.fname"
            />
          </div>
          <div class="col">
            <label class="form-label" for="lname">นามสกุล</label>
            <input
              type="text"
              class="form-control"
              placeholder="นามสกุล"
              maxlength="100"
              readonly
              name="lname"
              aria-describedby="lname"
              :value="profile.lname"
            />
          </div>
        </div>
        <div class="mb-4">
          <label class="form-label" for="phone">เบอร์ติดต่อ</label>
          <input
            type="text"
            class="form-control"
            placeholder="นามสกุล"
            maxlength="100"
            readonly
            name="phone"
            aria-describedby="phone"
            :value="profile.phone"
          />
        </div>
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="beds.address"
            class="form-control"
            :class="{ 'is-invalid': v$.beds.address.$error }"
            placeholder="ป้อนที่อยู่เพื่อค้นหา"
            aria-describedby="button-addon2"
            id="autocomplete"
          />
          <button
            @click="locatorButtonPressed()"
            class="btn btn-outline-danger"
            type="button"
            id="button-addon2"
          >
            <i class="fa-solid fa-location-crosshairs"></i>
          </button>
        </div>
        <div v-if="v$.beds.address.$error" class="my-2 text-danger">
          โปรดป้อนที่อยู่ให้ถูกต้อง
        </div>
        <div
          v-if="v$.beds.lat.$error || v$.beds.lng.$error"
          class="my-2 text-danger"
        >
          พิกัดไม่ถูกต้อง โปรดป้อนที่อยู่อีกครั้ง
        </div>
        <div class="text-center mb-3">
          <button class="btn btn-success" type="submit">
            เพิ่มสถานที่เดี๋ยวนี้
          </button>
          <span class="ms-3">
            <router-link to="/bedsmanage"
              ><a class="text-secondary">ยกเลิก</a></router-link
            >
          </span>
        </div>
      </form>
    </div>

    <div class="" v-show="beds.lat && beds.lng">
      <div id="map" class="m-auto my-5 w-100"></div>
    </div>
  </div>
</template>
<script>
const API_KEY = "AIzaSyALC4_1XPkHu7nZ82vQ0Uv1F5ZtGpJJe4M"
import Swal from "sweetalert2"
import axios_mod from "@/plugins/axios"
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required, minValue, maxValue } from "@vuelidate/validators"
export default {
  name: "Addbedsforsell",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      beds: {
        amount: 1,
        address: "",
        lat: "",
        lng: "",
      },
      profile: {
        fname: "",
        lname: "",
        phone: "",
      },
    }
  },
  validations() {
    return {
      beds: {
        amount: { required, minValue: minValue(1), maxValue: maxValue(9999) },
        address: { required },
        lat: { required },
        lng: { required },
      },
    }
  },
  methods: {
    submitCreateBeds() {
      axios_mod
        .post(`/beds`, this.beds)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "สำเร็จ",
              text: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/bedsmanage")
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
    validateCreateBeds() {
      this.v$.$validate()
      if (!this.v$.$error) {
        Swal.fire({
          title: "ยืนยันข้อมูลถูกต้อง",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#6C757D",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "กลับไปแก้ไข",
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitCreateBeds()
          }
        })
      }
    },
    locatorButtonPressed() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.getAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          )
          this.showUserLocationOnTheMap(
            position.coords.latitude,
            position.coords.longitude
          )
        })
      } else {
        Swal.fire({
          title: "Your browser does not support Geolocation",
          icon: "error",
          timer: 5000,
          showConfirmButton: false,
        })
      }
    },
    getAddressFrom(lat, lng) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&region=TH&language=th`
        )
        .then((res) => {
          this.beds.address = res.data.results[0].formatted_address
          this.beds.lat = lat
          this.beds.lng = lng
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: "Too many requests. Please be patient and try again",
            icon: "warning",
            timer: 10000,
            showConfirmButton: false,
          })
        })
    },
    showUserLocationOnTheMap(lat, lng) {
      let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
      })
    },
    getMe() {
      axios_mod
        .get("/users/me")
        .then((res) => {
          this.profile.fname = res.data.firstname
          this.profile.lname = res.data.lastname
          this.profile.phone = res.data.phone
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    let autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(13.736717, 100.523186)
        ),
      }
    )
    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace()
      this.beds.lat = place.geometry.location.lat()
      this.beds.lng = place.geometry.location.lng()
      this.beds.address = place.formatted_address
      this.showUserLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      )
    })
  },
  created() {
    this.getMe()
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

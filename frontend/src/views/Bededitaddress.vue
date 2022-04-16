<template>
  <div>
    <h2>แก้ไขสถานที่ ที่อยู่</h2>
    <hr />
    <br />
    <div class="mb-3">
      <div class="col-lg-6 col-md-6 col-sm-12 m-auto">
        <form @submit.prevent="validateUpdateBedAddress()">
          <div class="mb-3">
            <span class="text-secondary"
              ><i class="fa-solid fa-location-dot"></i> ที่อยู่ปัจจุบัน</span
            >
            {{ bed?.address }}
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              v-model="address"
              class="form-control"
              :class="{ 'is-invalid': v$.address.$error }"
              placeholder="ป้อนที่อยู่ใหม่เพื่อค้นหา"
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
          <div v-if="v$.address.$error" class="my-2 text-danger">
            โปรดป้อนที่อยู่ให้ถูกต้อง
          </div>
          <div v-if="v$.lat.$error || v$.lng.$error" class="my-2 text-danger">
            พิกัดไม่ถูกต้อง โปรดป้อนที่อยู่อีกครั้ง
          </div>
          <div class="text-center mb-3">
            <button class="btn btn-info" type="submit">บันทึก</button>
            <span class="ms-3">
              <router-link to="/bedsmanage"
                ><a class="text-secondary">ยกเลิก</a></router-link
              >
            </span>
          </div>
        </form>
      </div>

      <div class="" v-show="lat && lng">
        <div id="map" class="m-auto my-5 w-100"></div>
      </div>
    </div>
  </div>
</template>
<script>
const API_KEY = "AIzaSyALC4_1XPkHu7nZ82vQ0Uv1F5ZtGpJJe4M"
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"
import axios from "axios"
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
export default {
  name: "Bededitaddress",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      v$: useVuelidate(),
      bed: null,
      address: "",
      lat: "",
      lng: "",
    }
  },
  validations() {
    return {
      address: { required },
      lat: { required },
      lng: { required },
    }
  },
  methods: {
    submitUpdateBedAddress() {
      let bed = {
        address: this.address,
        lat: this.lat,
        lng: this.lng,
      }
      axios_mod
        .put(`/bed/address/${this.$route.params.id}`, bed)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: res.data.message,
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            }).then(() => {
              this.$router.push("/bedsmanage")
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
    validateUpdateBedAddress() {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.submitUpdateBedAddress()
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
          this.address = res.data.results[0].formatted_address
          this.lat = lat
          this.lng = lng
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
      this.lat = place.geometry.location.lat()
      this.lng = place.geometry.location.lng()
      this.address = place.formatted_address
      this.showUserLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      )
    })
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

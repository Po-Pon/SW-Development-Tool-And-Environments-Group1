<template>
  <div>
    <h2 class="me-10 mb-3">
      <i class="fas fa-search" style="color: DodgerBlue"></i> ค้นหาเตียง
    </h2>
    <hr />
    <br />
    <div class="mb-3" v-if="!sr">
      <span class="text-secondary"
        ><i class="fa-solid fa-location-dot"></i> ที่อยู่ปัจจุบัน</span
      >
      <b>{{ " " + currAddress }}</b>
    </div>
    <div class="mb-3" v-else>&nbsp;</div>

    <div class="row mb-3">
      <div class="col-lg-5 col-md-7 col-sm-12">
        <div class="input-group mb-3">
          <input
            v-model="sr"
            type="text"
            class="form-control"
            placeholder="ค้นหา"
            aria-describedby="inputGroup-sizing-default"
            @input="searching()"
          />
          <span class="input-group-text" id="inputGroup-sizing-default"
            ><i class="fas fa-search"></i
          ></span>
        </div>
      </div>
    </div>

    <div class="mb-3 px-3" v-if="!isLoading">
      <b
        >ค้นพบ
        <span class="text-primary">{{ beds.length.toLocaleString() }}</span>
        สถานที่<span v-show="!sr">ใกล้เคียง</span>
      </b>
    </div>

    <div class="row" v-if="!isLoading" id="test-bedplace">
      <div
        class="col-lg-6 col-md-6 col-sm-12 mb-3"
        v-for="(bed, index) in beds"
        :key="index"
      >
        <div
          class="border p-3 px-5 m-auto h-100 animate__animated animate__fadeInUp"
          style="border-radius: 20px"
        >
          <div class="text-end text-secondary h6">
            {{ bed.distance.toFixed(1).toLocaleString() }}กม.
          </div>
          <!-- one -->
          <div class="mb-3">
            <button type="button" class="btn btn-primary">
              พร้มจอง
              <span class="badge bg-white text-dark">{{
                bed.amount.toLocaleString()
              }}</span>
              เตียง
            </button>
          </div>
          <!-- two -->
          <div class="row mb-3" id="two">
            <div class="col-4 text-center p-auto">
              <h1>
                <i class="fa-solid fa-map-location-dot"></i>
              </h1>
            </div>
            <div class="col-8 fs-5">
              {{ bed.address }}
            </div>
          </div>
          <!-- three -->
          <div class="mb-2 text-center">
            <router-link :to="{ path: '/bed/' + bed.id }">
              <button class="btn btn-success">ดูรายละเอียด</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <br /><br /><br />
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- BedsMore -->
    <div class="my-4" v-if="bedsMore.length > 0 && beds.length > 0">
      <h3>สถานที่เพิ่มเติม</h3>
      <br />
      <div class="row">
        <div
          class="col-lg-6 col-md-6 col-sm-12 mb-3"
          v-for="(bed, index) in bedsMore"
          :key="index"
        >
          <div
            class="border p-3 px-5 m-auto h-100 animate__animated animate__fadeInUp"
            style="border-radius: 20px"
          >
            <div class="text-end text-secondary h6">
              {{ bed.distance.toFixed(1).toLocaleString() }}กม.
            </div>
            <!-- one -->
            <div class="mb-3">
              <button type="button" class="btn btn-primary">
                พร้มจอง
                <span class="badge bg-white text-dark">{{
                  bed.amount.toLocaleString()
                }}</span>
                เตียง
              </button>
            </div>
            <!-- two -->
            <div class="row" id="two">
              <div class="col-4 text-center p-auto">
                <h1>
                  <i class="fa-solid fa-map-location-dot"></i>
                </h1>
              </div>
              <div class="col-8 fs-5">
                {{ bed.address }}
              </div>
            </div>
            <!-- three -->
            <div class="mb-2 text-center">
              <router-link :to="{ path: '/bed/' + bed.id }">
                <button class="btn btn-success">ดูรายละเอียด</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const API_KEY = "AIzaSyALC4_1XPkHu7nZ82vQ0Uv1F5ZtGpJJe4M"
import Swal from "sweetalert2"
import axios_mod from "@/plugins/axios"
import axios from "axios"
const _ = require("lodash")
export default {
  name: "Findbeds",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      currAddress: "",
      sr: "",
      delaySearch: null,
      delayClear: null,
      beds: [],
      currPos: {
        lat: 0,
        lng: 0,
      },
      isLoading: false,
      bedsMore: [],
    }
  },
  methods: {
    deg2rad(deg) {
      return deg * (Math.PI / 180)
    },
    getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
      let R = 6371 // รัศมีของโลกกม.
      let dLat = this.deg2rad(lat2 - lat1) // ดีกรี -> เรเดียน
      let dLng = this.deg2rad(lng2 - lng1)
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2)
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      let d = R * c // ระยะทางกม.
      return d
    },
    convertDistance(raw) {
      let d
      raw.forEach((pos, index) => {
        d = this.getDistanceFromLatLonInKm(
          this.currPos.lat,
          this.currPos.lng,
          pos.lat,
          pos.lng
        )
        raw[index] = { ...raw[index], distance: d }
      })
      return _.orderBy(raw, ["distance"], ["asc"])
    },
    getBedsByAvailable() {
      axios_mod
        .get(`/beds/available`)
        .then((res) => {
          let beds = this.convertDistance(res.data.beds)
          this.beds = _.filter(beds, (bed) => bed.distance <= 70)
          this.bedsMore = _.filter(beds, (bed) => !(bed.distance <= 70))
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getBedsBySearch() {
      axios_mod
        .get(`/beds/search`, {
          params: {
            search: this.sr,
          },
        })
        .then((res) => {
          this.bedsMore = []
          this.beds = this.convertDistance(res.data.beds)
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    searching() {
      if (this.sr === "") {
        clearTimeout(this.delayClear)
        this.delaySearch = setTimeout(() => {
          this.getBedsByAvailable()
        }, 300)
        return
      }
      this.isLoading = true
      this.bedsMore = []
      clearTimeout(this.delaySearch)
      this.delaySearch = setTimeout(() => {
        this.getBedsBySearch()
      }, 300)
    },
    getAddressFrom(lat, lng) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&region=TH&language=th`
        )
        .then((res) => {
          this.currAddress = res.data.results[0].formatted_address
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
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currPos.lat = position.coords.latitude
        this.currPos.lng = position.coords.longitude
        this.getAddressFrom(position.coords.latitude, position.coords.longitude)
        this.getBedsByAvailable()
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
  created() {},
}
</script>
<style scoped>
#two {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

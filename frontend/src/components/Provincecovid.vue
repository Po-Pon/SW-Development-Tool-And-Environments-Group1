<template>
  <div v-if="rawData">
    <div class="row mb-3">
      <div class="col">
        <h2>รายงานสถานการณ์ Covid-19 ประจำวันของแต่ละจังหวัด</h2>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-5 col-md-7 col-sm-12 m-auto">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="ใส่ชื่อจังหวัดที่ต้องการค้นหาที่นี่"
            aria-describedby="basic-addon1"
            v-model="sr"
            @input="searching()"
          />
          <span class="input-group-text"><i class="fas fa-search"></i> </span>
        </div>
      </div>
    </div>
    <div class="row h5 mb-5">
      <div class="col-lg-3 col-md-3 col-sm-6">
        <span class="h2 me-2">
          <i class="fa-solid fa-map-location-dot text-danger"></i>
        </span>
        มีผู้ติดเชื้อมากกว่า 900 คน
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6">
        <span class="h2 me-2">
          <i class="fa-solid fa-map-location-dot text-warning"></i>
        </span>
        มีผู้ติดเชื้อ 301-900 คน
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6">
        <span class="h2 me-2">
          <i class="fa-solid fa-map-location-dot text-info"></i>
        </span>
        มีผู้ติดเชื้อ 1-300 คน
      </div>
      <div class="col-lg-3 col-md-3 col-sm-6">
        <span class="h2 me-2">
          <i class="fa-solid fa-map-location-dot text-success"></i>
        </span>
        ไม่มีผู้ติดเชิ้อ
      </div>
    </div>
    <div v-show="noData" class="text-center h2 my-5">
      ไม่พบจังหวัดที่คุณค้นหา
    </div>
    <div class="row">
      <div
        class="col-lg-6 col-md-6 col-sm-12 mb-3"
        v-for="data in provinceResult"
        :key="data.province"
      >
        <div
          class="border p-3 px-5 m-auto h-100 animate__animated animate__fadeInUp"
          style="border-radius: 20px"
        >
          <div class="text-start h4">
            {{ data.province }}
          </div>
          <div class="row mb-3">
            <div class="col-4 text-center m-auto">
              <h1 :class="areaLevel(data.new_case_excludeabroad)">
                <i class="fa-solid fa-map-location-dot"></i>
              </h1>
            </div>
            <div class="col-8 fs-5">
              <p>
                ผู้ป่วยสะสม
                <span class="text-primary">{{
                  data.total_case.toLocaleString()
                }}</span>
                คน<br />
                ผู้เสียชีวิตสะสม
                <span class="text-primary">{{
                  data.total_death.toLocaleString()
                }}</span>
                คน<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      rawData: null,
      provinceResult: [],
      provinceSearch: "",
      sr: "",
      noData: false,
    }
  },
  methods: {
    areaLevel(infected_people) {
      let color = ""
      if (infected_people == 0) {
        color = "text-success"
      } else if (0 < infected_people && infected_people <= 300) {
        color = "text-info"
      } else if (300 < infected_people && infected_people <= 900) {
        color = "text-warning"
      } else if (infected_people > 900) {
        color = "text-danger"
      }
      console.log(color)
      console.log(infected_people)
      return color
    },
    searching() {
      if (this.sr === "") {
        this.noData = false
        this.provinceResult = this.rawData
        return
      }
      this.provinceResult = this.rawData.filter((data) => {
        return data.province.search(this.sr) != -1
      })
      if (this.provinceResult.length === 0) {
        this.noData = true
      } else {
        this.noData = false
      }
    },
    getProvinceData() {
      axios
        .get(
          "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces"
        )
        .then((res) => {
          this.provinceResult = res.data
          this.rawData = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getProvinceData()
  },
}
</script>

<template>
  <div>
    <h2 class="text-center">สถิติผู้ติดเชื้อโควิด-19 ในไทย</h2>
    <div class="text-center" v-if="covidData">
      <div class="text-secondary mb-3">
        ข้อมูลอัปเดตล่าสุด {{ convertDate(covidData.update_date) }}
      </div>
      <div class="text-center mb-5">
        <span
          class="badge bg-primary"
          style="font-size: 15px"
          v-if="stage == 'daily'"
          >ประจำวัน</span
        >
        <span class="link-primary" v-else @click="stage = 'daily'"
          >ประจำวัน</span
        >
        -
        <span
          class="badge bg-primary"
          style="font-size: 15px"
          v-if="stage == 'total'"
          >ทั้งหมด</span
        >
        <span class="link-primary" v-else @click="stage = 'total'"
          >ทั้งหมด</span
        >
        -
        <span
          class="badge bg-primary"
          style="font-size: 15px"
          v-if="stage == 'graphStats'"
          >กราฟสถิติข้อมูล</span
        >
        <span class="link-primary" v-else @click="stage = 'graphStats'"
          >กราฟสถิติข้อมูล</span
        >
        -
        <span
          class="badge bg-primary"
          style="font-size: 15px"
          v-if="stage == 'province'"
          >รายงานประจำจังหวัด</span
        >
        <span class="link-primary" v-else @click="stage = 'province'"
          >รายงานประจำจังหวัด</span
        >
      </div>
      <div v-if="stage === 'daily'">
        <div class="text-center" style="font-size: 30px">ติดเชื้อรายใหม่:</div>
        <div
          class="text-center text-secondary mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.new_case.toLocaleString() }}
        </div>
        <div class="text-center mb-1" style="font-size: 30px">ตาย:</div>
        <div
          class="text-center mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.new_death.toLocaleString() }}
        </div>
        <div class="text-center mb-1" style="font-size: 30px">รักษาหาย:</div>
        <div
          class="text-center text-info mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.new_recovered.toLocaleString() }}
        </div>
        <div class="my-3">
          <Chart></Chart>
        </div>
      </div>
      <div v-else-if="stage === 'total'">
        <div class="text-center" style="font-size: 30px">ติดเชื้อสะสม:</div>
        <div
          class="text-center text-secondary mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.total_case.toLocaleString() }}
        </div>
        <div class="text-center mb-1" style="font-size: 30px">ตายสะสม:</div>
        <div
          class="text-center mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.total_death.toLocaleString() }}
        </div>
        <div class="text-center mb-1" style="font-size: 30px">
          รักษาหายสะสม:
        </div>
        <div
          class="text-center text-info mb-5 animate__animated animate__fadeIn"
          style="font-size: 50px"
        >
          {{ covidData.total_recovered.toLocaleString() }}
        </div>
      </div>
      <div v-else-if="stage === 'graphStats'">
        <div class="my-3">
          <Chart2></Chart2>
        </div>
      </div>
      <div v-else-if="stage === 'province'">
        <div class="my-3">
          <Province></Province>
        </div>
      </div>
    </div>
    <div class="text-center" v-else>
      <br /><br /><br />
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <br /><br /><br />
    </div>
    <div class="text-end text-secondary">ข้อมูลโดย covid19.ddc.moph.go.th</div>
    <h3><i class="fas fa-procedures"></i> ค้นหาเตียง</h3>
    <p>
      จำนวนเตียงว่างทั้งหมด
      <span class="text-success"
        ><b class="fs-5">{{ amountBedsAvailable.toLocaleString() }}</b></span
      >
      เตียง
    </p>
    <div class="content mb-5">
      <p class="text-center">
        <router-link to="/findbeds">
          <button class="btn col-12 col-lg-4 btn-info text-white">
            <i class="fas fa-search-location fa-lg"></i> ค้นหาเตียง
          </button>
        </router-link>
      </p>
      <p class="text-center">
        <router-link to="/beds">
          <button class="btn col-12 col-lg-4 btn-success">
            <i class="fas fa-clipboard-list fa-lg"></i> การจองเตียง
          </button>
        </router-link>
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import axios_mod from "../plugins/axios"
import moment from "moment"
import Chart from "@/components/Chartdaily.vue"
import Chart2 from "@/components/Chartstats.vue"
import Province from "@/components/Provincecovid.vue"
export default {
  name: "Home",
  components: {
    Chart,
    Chart2,
    Province,
  },
  props: {
    user: { type: Object },
  },
  data() {
    return {
      covidData: null,
      stage: "daily",
      amountBedsAvailable: 0,
    }
  },
  methods: {
    getBedsAvailable() {
      axios_mod
        .get("/beds/available")
        .then((res) => {
          this.amountBedsAvailable = res.data.beds.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.amount,
            0
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
    convertDate(date) {
      moment.locale("TH")
      return `${moment(date).format("LL")} | ${moment(date).format("hh:mm")}`
    },
    getCovidData() {
      let url = "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
      axios
        .get(url)
        .then((res) => {
          this.covidData = res.data[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getCovidData()
    this.getBedsAvailable()
  },
}
</script>
<style scoped></style>

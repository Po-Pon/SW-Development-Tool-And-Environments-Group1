<template>
  <div v-if="covidData != null">
    <br /><br />
    <h3>สถิติผู้ติดเชื้อโควิด-19 ในไทย</h3>

    <!-- CovidDaily Section -->
    <p>ข้อมูลอัปเดตล่าสุด: {{ convertToThaiDate(covidData.updated) }}</p>
    <div class="row">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="box bg-danger">
          <p class="fs-5">ติดเชื้อเพิ่มขึ้น</p>
          <p class="fs-1 text-center">
            +{{ covidData.todayCases.toLocaleString() }}
          </p>
          <p class="text-end fs-5">
            สะสม {{ covidData.cases.toLocaleString() }}
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="box bg-dark">
          <p class="fs-5">เสียชีวิตเพิ่มขึ้น</p>
          <p class="fs-1 text-center">+{{ covidData.todayDeaths }}</p>
          <p class="text-end fs-5">
            สะสม {{ covidData.deaths.toLocaleString() }}
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="box bg-info">
          <p class="fs-5">รักษาตัวอยู่ใน รพ.</p>
          <p class="fs-1 text-center">
            {{ covidData.active.toLocaleString() }}
          </p>
          <p class="text-end fs-5">สะสมทั้งหมด</p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="box bg-success">
          <p class="fs-5">หายแล้วเพิ่มขึ้น</p>
          <p class="fs-1 text-center">
            +{{ covidData.todayRecovered.toLocaleString() }}
          </p>
          <p class="text-end fs-5">
            สะสม {{ covidData.recovered.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
    <p class="text-end text-secondary">ข้อมูลโดย disease.sh</p>

    <!-- Chart Section -->
    <div class="my-3">
      <CovidChart />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import CovidChart from "./Charts/covidChart.vue";

export default {
  components: {
    CovidChart,
  },
  data() {
    return {
      covidData: null,
    };
  },
  methods: {
    GetcovidData() {
      let apiCovid19Today = "https://corona.lmao.ninja/v2/countries/TH";
      axios
        .get(apiCovid19Today)
        .then((res) => {
          this.covidData = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    convertToThaiDate(rawDate) {
      moment.locale("th");
      return moment(rawDate).format(`Do MMMM YYYY | HH:mm น.`);
    },
  },
  created() {
    this.GetcovidData();
  },
};
</script>
<style scoped>
.box {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  border-radius: 12px;
  margin-bottom: 10px;
  color: #ffffff;
}
.box p {
  margin: 10px;
}
</style>

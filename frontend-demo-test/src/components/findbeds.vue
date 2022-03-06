<template>
  <br /><br /><br />
  <div>
    <!-- FindBeds Section -->
    <h3 class="my-3"><i class="fas fa-search"></i> ค้นหาเตียง</h3>
    <div class="row g-2">
      <div class="col-lg-4 col-3"></div>
      <div class="col-lg-4 col-6">
        <select class="form-select" v-model="province">
          <option
            v-for="(province, index) in allProvinceTH"
            :key="index"
            :value="province"
          >
            {{ province }}
          </option>
        </select>
      </div>
      <div class="col-lg-4 col-3">
        <button class="btn btn-info" @click="findBedsbyProvince()">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <br />

    <!-- Result Section -->
    <div>
      <p class="col-lg-8 m-auto my-3">
        ค้นพบ
        <span class="text-primary">{{ beds.length.toLocaleString() }}</span>
        สถานที่
      </p>
      <div
        class="content col-lg-8 m-auto mb-3"
        v-for="bed in beds"
        :key="bed._id"
      >
        <p>
          <button type="button" class="btn btn-success btn-sm">
            พร้อมจอง
            <span class="badge bg-white text-dark">{{ bed.amount }}</span> เตียง
          </button>
        </p>
        <div class="row my-3">
          <div class="col-2 text-center m-auto">
            <p class="h4"><i class="fas fa-map-marker-alt fa-lg"></i></p>
          </div>
          <div class="col-10">
            <p class="h5">{{ bed.province }}</p>
            <p class="h5">{{ bed.hno }} {{ bed.lane }}</p>
            <p class="text-secondary">
              {{
                `ตำบล/แขวง ${bed.district} อำเภอ/เขต ${bed.area} ${bed.province} ประเทศไทย ${bed.zipcode} `
              }}
            </p>
          </div>
        </div>
        <p class="text-center">
          <a :href="'/buybeds/' + bed._id"
            ><button class="btn btn-primary btn-sm">ดูรายละเอียด</button></a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { provinceTH } from "../assets/js/province.js";
import { SERVER_IP, PORT } from "../assets/server/serverIP";

export default {
  data() {
    return {
      allProvinceTH: [],
      province: "",
      beds: [],
      bedsReady: [],
      amountBedsReady: 0,
    };
  },
  methods: {
    findBedsbyProvince() {
      if (this.province == "ทุกจังหวัด") {
        this.beds = this.bedsReady;
      } else {
        this.beds = this.bedsReady.filter(
          (array) => array.province == this.province
        );
      }
    },
    getBedsReady() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/bedsready`)
        .then((res) => {
          const data = res.data;
          this.amountBedsReady = data.info.reduce(function (prev, curr) {
            return prev + curr.amount;
          }, 0);
          this.bedsReady = data.info;
          this.findBedsbyProvince();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    authentication() {
      let info = JSON.parse(localStorage.getItem("info"));
      if (info != null) {
        this.$root.info = info;
        this.$root.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
  },
  created() {
    this.authentication();
    this.allProvinceTH = ["ทุกจังหวัด", ...provinceTH];
    this.province = this.allProvinceTH[0];
    this.getBedsReady();
  },
};
</script>

<style scoped></style>
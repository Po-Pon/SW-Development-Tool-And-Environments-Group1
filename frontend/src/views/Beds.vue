<template>
  <div>
    <h2>การจองเตียง</h2>
    <hr />
    <br />
    <div class="mb-3 text-end">
      <router-link to="/findbeds">
        <button class="btn btn-success">ค้นหาและจองเตียง</button>
      </router-link>
    </div>
    <div
      class="content animate__animated animate__fadeIn"
      v-if="bedsdealing.length"
    >
      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <td class="text-center"><b>วันที่ทำรายการ</b></td>
            <td class="text-center"><b>เจ้าที่</b></td>
            <td class="text-center"><b>เบอร์ติดต่อ</b></td>
            <td class="text-center"><b>วันที่จะเข้าพักอาศัย</b></td>
            <td class="text-center"><b>สถานะ</b></td>
            <td class="text-center"><b>Actions</b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(beddealing, index) in bedsdealing" :key="index">
            <td class="text-center">
              {{ convertDate(beddealing.timestamp) }}
            </td>
            <td class="text-center">
              {{ beddealing.firstname }} {{ beddealing.lastname }}
            </td>
            <td class="text-center">{{ beddealing.phone }}</td>
            <td class="text-center">
              <span class="badge bg-primary">{{
                convertDate(beddealing.date)
              }}</span>
            </td>
            <td class="text-center">
              <span
                class="badge rounded-pill bg-secondary"
                v-if="!beddealing.state"
                >ดำเนินการ</span
              >
              <span class="badge rounded-pill bg-success" v-else
                >เสร็จสิ้น</span
              >
            </td>
            <td class="text-center">
              <router-link :to="{ path: '/bed/' + beddealing.beds_id }">
                <button class="btn btn-sm btn-outline-info">
                  <i class="fa-solid fa-location-dot"></i>
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="content text-center fs-4 animate__animated animate__fadeIn"
      v-else
    >
      ยังไม่มีการจอง
    </div>
  </div>
</template>
<script>
import moment from "moment"
import axios_mod from "../plugins/axios"
const _ = require("lodash")
export default {
  name: "Beds",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      bedsdealing: [],
    }
  },
  methods: {
    convertDate(date) {
      moment.locale("th")
      return moment(date).format("LL")
    },
    getBedsdealing() {
      axios_mod
        .get("/bedsdealingByUser")
        .then((res) => {
          this.bedsdealing = _.orderBy(
            res.data.bedsdealing,
            ["beddealings_id"],
            ["desc"]
          )
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getBedsdealing()
  },
}
</script>

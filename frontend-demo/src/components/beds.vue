<template>
  <div>
    <br /><br /><br />

    <!-- History Section -->
    <h3 class="my-3">
      <i class="fas fa-clipboard-list fa-lg"></i> การจองเตียง
    </h3>

    <div class="content" v-if="showHistory">
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <td><b>วันที่จะเข้าพักอาศัย</b></td>
            <td><b>สถานที่</b></td>
            <td><b>วันที่จอง</b></td>
            <td><b>สถานะ</b></td>
            <td><b></b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="beddealing in bedsdealingbyusers" :key="beddealing._id">
            <!-- <td>{{ convertToThaiDate(beddealing.date) }}</td> -->
            <td>Demo Date</td>
            <td>Demo</td>
            <td>Demo</td>
            <td>
              <span class="badge rounded-pill bg-secondary badge-secondary"
                >Demo</span
              >
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="viewBedsDealingPage()"
              >
                ดูข้อมูล
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content" v-else>
      <p class="text-center fs-4">ยังไม่มีการจองเตียง</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { SERVER_IP, PORT } from "../assets/server/serverIP";

export default {
  data() {
    return {
      bedsdealingbyusers: [],
      user: null,
      showHistory: false,
    };
  },
  methods: {
    viewBedsDealingPage() {
      alert("Demo");
    },
    convertToThaiDate(rawDate) {
      moment.locale("th");
      return moment(rawDate).format(`LL`);
    },
    getBedsDealingbyUsers() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/bedsdealingbyusers/${this.user._id}`)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.bedsdealingbyusers = data.info;
            this.showHistory = true;
          } else {
            this.showHistory = false;
          }
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
        this.user = info;
      } else {
        this.loggedIn = false;
        alert("โปรดลงชื่อเข้าใช้งาน");
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.authentication();
    this.getBedsDealingbyUsers();
  },
};
</script>

<style scoped>
.table td {
  text-align: center;
}
</style>

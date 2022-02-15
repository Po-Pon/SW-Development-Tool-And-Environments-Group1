<template>
  <div>
    <br /><br />

    <!-- History Section -->
    <h3 class="mt-5 mb-3">
      <i class="fas fa-history"></i> ประวัติการเพิ่มสถานที่
    </h3>
    <div class="content" v-if="showHistory">
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <td><b>วันที่สร้างข้อมูล</b></td>
            <td><b>สถานที่</b></td>
            <td><b>มีผู้จองแล้ว</b></td>
            <td><b></b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bed in bedsByUsers" :key="bed._id">
            <td>{{ convertToThaiDate(bed.createdAt) }}</td>
            <td>{{ bed.hno }} {{ bed.lane }}</td>
            <td>Demo</td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="editBedsPage()"
              >
                แก้ไขข้อมูล
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content" v-else>
      <p class="text-center fs-4">ยังไม่มีการเพิ่มสถานที่</p>
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
      user: null,
      bedsByUsers: [],
      bedsdealings: [],
      showHistory: false,
    };
  },
  methods: {
    getBedsDealings() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/bedsdealing`)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.bedsdealings = data.info;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editBedsPage() {
      alert("Demo");
    },
    getBedsByUsers() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/bedsbyusers/${this.user._id}`)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.bedsByUsers = data.info;
            this.showHistory = true;
          } else {
            this.showHistory = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    convertToThaiDate(rawDate) {
      moment.locale("th");
      return moment(rawDate).format(`LL`);
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
    this.getBedsByUsers();
    this.getBedsDealings();
  },
};
</script>

<style scoped></style>

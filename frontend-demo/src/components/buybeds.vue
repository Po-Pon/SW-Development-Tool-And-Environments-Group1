<template>
  <br /><br /><br />
  <div v-if="bed != null">
    <!-- Deatil Section -->
    <h3><i class="fas fa-map-marker-alt fa-lg"></i> รายละเอียดเลือกจอง</h3>
    <br />
    <div class="content m-auto col-lg-8">
      <p class="text-end">
        <button
          class="btn"
          @click="
            gmaps(
              `${bed.hno} หมู่ที่ ${bed.no} ซอย ${bed.lane} ตำบล/แขวง ${bed.district} อำเภอ/เขต ${bed.area}, จังหวัด${bed.province}, ${bed.zipcode}`
            )
          "
        >
          Google Maps
        </button>
      </p>
      <p class="h5">{{ bed.user.fname }} {{ bed.user.lname }}</p>
      <p class="h6 text-secondary">ติดต่อ {{ bed.user.phone }}</p>
      <p class="h6 text-secondary">LINE ID {{ bed.user.lineid }}</p>
      <p class="h6 text-secondary">
        {{
          `ที่อยู่ ${bed.hno} หมู่ที่ ${bed.no} ซอย ${bed.lane} ตำบล/แขวง ${bed.district} อำเภอ/เขต ${bed.area}, จังหวัด${bed.province}, ${bed.zipcode} `
        }}
      </p>
      <p class="text-center">
        <button type="button" class="btn btn-success mt-3">
          พร้อมจอง
          <span class="badge bg-white text-dark">{{ bed.amount }}</span> เตียง
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_IP, PORT } from "../assets/server/serverIP";

export default {
  data() {
    return {
      bed: null,
    };
  },
  methods: {
    gmaps(url) {
      window.open("https://www.google.co.th/maps?q=" + url, "_blank");
    },
    getBed() {
      axios
        .get(`https://${SERVER_IP}:${PORT}/beds/${this.$route.params.id}`)
        .then((res) => {
          const data = res.data;
          this.bed = data.info[0];
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
        alert("โปรดลงชื่อเข้าใช้งาน");
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.authentication();
    this.getBed();
  },
};
</script>

<style scoped></style>

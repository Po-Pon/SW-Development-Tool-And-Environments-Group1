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

    <!-- BuyForm Section -->
    <hr class="col-lg-8 m-auto my-5" />
    <p class="text-center h5">วันที่จะเข้าพักอาศัย</p>
    <div class="m-auto d-flex my-3 justify-content-center">
      <div class="row">
        <div class="col">
          <input
            type="date"
            @change="changeValidate()"
            class="form-control"
            v-model="date"
            :min="miniDate()"
          />
          <span v-if="v$.checkDate.$error" style="color: red">
            <p>โปรดเลือกวันที่ให้ถูกต้อง</p>
          </span>
        </div>
        <div class="col">
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalRent"
          >
            จอง
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Section -->
    <div
      class="modal fade"
      id="modalRent"
      tabindex="-1"
      aria-labelledby="modalRentLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalRentLabel">คุณต้องการจองใช่ไหม</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="rentValidate()"
            >
              ยืนยันจอง
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { SERVER_IP, PORT } from "../assets/server/serverIP";
import useValidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
      bed: null,
      date: "",
      user: null,
      checkDate: "",
    };
  },

  validations() {
    return {
      checkDate: { required, minValue: minValue(new Date()) },
    };
  },
  methods: {
    miniDate() {
      return moment(new Date()).format("YYYY-MM-DD") + "";
    },
    rent() {
      let formData = {
        date: this.date,
        bed_id: this.$route.params.id,
        user_id: this.user._id,
      };
      axios
        .post(`https://${SERVER_IP}:${PORT}/bedsdealing`, formData)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            this.$router.push("/beds");
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changeValidate() {
      this.checkDate = new Date(this.date);
      this.v$.$validate();
    },
    rentValidate() {
      if (!this.v$.$error) {
        // if ANY fail validation
        this.rent();
      } else {
        alert("โปรดกรอกข้อมูลให้ถูกต้อง");
      }
    },
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
    this.getBed();
  },
};
</script>

<style scoped></style>

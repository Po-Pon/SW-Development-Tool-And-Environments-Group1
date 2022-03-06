<template>
  <div>
    <br /><br />
    <!-- AddBeds Section -->
    <h3><i class="fas fa-plus-circle"></i> เพิ่มสถานที่</h3>

    <p class="my-3 m-auto col-lg-8 h5">จำนวนเตียง</p>
    <div class="m-auto col-lg-6">
      <div class="row text-center">
        <div class="col-4 col-lg-5 my-auto text-end">
          <button class="btn btn-primary" @click="decreaseBeds()">-</button>
        </div>
        <div class="col-4 col-lg-2">
          <input
            type="text"
            class="m-auto customBeds form-control mb-3 bg-white"
            v-model="beds"
          />
        </div>
        <div class="col-4 col-lg-5 my-auto text-start">
          <button class="btn btn-primary" @click="increaseBeds()">+</button>
        </div>
      </div>
      <span v-if="v$.beds.$error" style="color: red">
        <p class="text-center">โปรดใส่ จำนวนเตียง ให้ถูกต้อง</p>
      </span>
    </div>

    <p class="my-3 m-auto col-lg-8 h5">ที่อยู่</p>
    <div class="m-auto col-lg-6">
      <div class="row g-2">
        <div class="col">
          <label class="form-label">เลขที่</label>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="เลขที่"
            v-model="hno"
          />
          <span v-if="v$.hno.$error" style="color: red">
            <p>โปรดใส่เลขที่(ไม่เกิน30ตัว)</p>
          </span>
        </div>
        <div class="col">
          <label class="form-label">หมู่ที่</label>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="หมู่ที่"
            v-model="no"
          />
          <span v-if="v$.no.$error" style="color: red">
            <p>โปรดใส่หมู่ที่(ไม่เกิน30ตัว)</p>
          </span>
        </div>
        <div class="col">
          <label class="form-label">ซอย</label>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="ซอย"
            v-model="lane"
          />
          <span v-if="v$.lane.$error" style="color: red">
            <p>โปรดใส่ซอยหรือชื่อซอย(ไม่เกิน50ตัว)</p>
          </span>
        </div>
      </div>
      <label class="form-label">ตำบล/แขวง</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="ตำบล/แขวง"
        v-model="district"
      />
      <span v-if="v$.district.$error" style="color: red">
        <p>โปรดใส่ตำบล/แขวง ให้ถูกต้อง(ไม่เกิน50ตัว)</p>
      </span>
      <label class="form-label">อำเภอ/เขต</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="อำเภอ/เขต"
        v-model="area"
      />
      <span v-if="v$.area.$error" style="color: red">
        <p>โปรดใส่อำเภอ/เขต ให้ถูกต้อง(ไม่เกิน50ตัว)</p>
      </span>
      <label class="form-label">จังหวัด</label>
      <select class="form-select mb-3" v-model="province">
        <option
          v-for="(province, index) in allProvinceTH"
          :key="index"
          :value="province"
        >
          {{ province }}
        </option>
      </select>
      <span v-if="v$.province.$error" style="color: red">
        <p>โปรดใส่จังหวัด</p>
      </span>
      <label class="form-label">รหัสไปรษณีย์</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="รหัสไปรษณีย์"
        v-model="zipcode"
      />
      <span v-if="v$.zipcode.$error" style="color: red">
        <p>โปรดใส่รหัสไปรษณีย์ให้ถูกต้อง(ไม่เกิน5ตัว)</p>
      </span>
    </div>

    <p class="my-3 m-auto col-lg-8 h5">ข้อมูลผู้ใช้</p>
    <div class="m-auto col-lg-6">
      <div class="row g-2">
        <div class="col-lg-6">
          <label class="form-label">ชื่อ</label>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="ชื่อ"
            v-model="user.fname"
            readonly
          />
        </div>
        <div class="col-lg-6">
          <label class="form-label">นามสกุล</label>
          <input
            type="text"
            class="form-control mb-3"
            placeholder="นามสกุล"
            v-model="user.lname"
            readonly
          />
        </div>
      </div>
      <label class="form-label">เบอร์ติดต่อ</label>
      <input
        type="text"
        class="form-control mb-3"
        placeholder="เบอร์ติดต่อ"
        v-model="user.phone"
        readonly
      />
      <p class="text-center">
        <button class="btn btn-primary" @click="addbedsValidate()">
          เพิ่มสถานที่
        </button>
      </p>
    </div>

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
import { provinceTH } from "../assets/js/province.js";
import axios from "axios";
import moment from "moment";
import { SERVER_IP, PORT } from "../assets/server/serverIP";
import useValidate from "@vuelidate/core";
import {
  required,
  between,
  maxLength,
  numeric,
  minLength,
} from "@vuelidate/validators";
export default {
  data() {
    return {
      v$: useValidate(),
      allProvinceTH: [],
      user: null,
      beds: 0,
      hno: "",
      no: "",
      lane: "",
      district: "",
      area: "",
      province: "",
      zipcode: "",
      bedsByUsers: [],
      bedsdealings: [],
      showHistory: false,
    };
  },
  validations() {
    return {
      beds: { required, between: between(1, 9999) },
      province: { required, maxLength: maxLength(50) },
      hno: { required, maxLength: maxLength(30) },
      no: { required, maxLength: maxLength(30) },
      lane: { required, maxLength: maxLength(50) },
      district: { required, maxLength: maxLength(50) },
      area: { required, maxLength: maxLength(50) },
      zipcode: {
        required,
        maxLength: maxLength(5),
        minLength: minLength(5),
        numeric,
      },
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
    addbedsValidate() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        this.addbeds();
      } else {
        alert("โปรดกรอกข้อมูลให้ถูกต้อง");
      }
    },
    addbeds() {
      let formData = {
        amount: this.beds,
        hno: this.hno,
        no: this.no,
        lane: this.lane,
        district: this.district,
        area: this.area,
        province: this.province,
        zipcode: this.zipcode,
        user_id: this.user._id,
      };
      axios
        .post(`https://${SERVER_IP}:${PORT}/beds`, formData)
        .then((res) => {
          const data = res.data;
          if (data.status) {
            alert(data.message);
            this.$router.push("/addbedsforsell");
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      this.$router.push("/addbedsforsell");
    },
    increaseBeds() {
      this.beds++;
      if (this.beds > 9999) this.beds = 9999;
    },
    decreaseBeds() {
      this.beds--;
      if (this.beds < 0) this.beds = 0;
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
    this.allProvinceTH = provinceTH;
    this.province = this.allProvinceTH[0];
    this.getBedsByUsers();
    this.getBedsDealings();
  },
};
</script>

<style scoped>
.customBeds {
  width: 90px;
  height: 70px;
  text-align: center;
  font-size: 30px;
}
</style>

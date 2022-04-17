<template>
  <div>
    <h2>จัดการสถานที่</h2>
    <hr />
    <br />
    <div class="mb-3 text-end">
      <router-link to="/addbedsforsell">
        <button class="btn btn-success">เพิ่มสถานที่</button>
      </router-link>
    </div>
    <div class="content animate__animated animate__fadeIn" v-if="beds.length">
      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <td class="text-center"><b>จำนวนเตียง</b></td>
            <td><b>ที่อยู่</b></td>
            <td class="text-center"><b>สถานะ</b></td>
            <td colspan="3" class="text-center"><b>Actions</b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bed, index) in beds" :key="index">
            <td class="text-center">
              <span class="badge bg-success">{{
                bed.amount.toLocaleString()
              }}</span>
            </td>
            <td>{{ bed.address }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  v-model="bed.state"
                  @change="updateBedState(bed)"
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  <div v-if="bed.state == 'true'">เปิด</div>
                  <div v-else>ปิด</div>
                </label>
              </div>
            </td>
            <td>
              <router-link :to="{ path: '/customers/' + bed.id }">
                <button class="btn btn-primary btn-sm position-relative">
                  ผู้จอง
                  <span
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {{ bed.customer_amount }}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </router-link>
            </td>
            <td>
              <router-link :to="{ path: '/bededit/' + bed.id }">
                <button class="btn btn-warning btn-sm">แก้ไข</button>
              </router-link>
            </td>
            <td>
              <div v-if="bed.customer_amount > 0">
                <button class="btn btn-danger btn-sm" disabled>ลบ</button>
              </div>
              <div v-else>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteBed(bed.id)"
                >
                  ลบ
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="content text-center fs-4 animate__animated animate__fadeIn"
      v-else
    >
      ยังไม่มีข้อมูล
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2"
import axios_mod from "../plugins/axios"

export default {
  name: "Bedsmanage",
  props: {
    user: { type: Object },
  },
  data() {
    return {
      beds: [],
    }
  },
  methods: {
    deleteBed(id) {
      Swal.fire({
        title: "คุณแน่ใจใช่ไหม",
        text: "ข้อมูลนี้จะถูกลบโดยถาวร",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios_mod
            .delete(`/bed/${id}`)
            .then((res) => {
              if (res.data.status) {
                Swal.fire({
                  title: "สำเร็จ",
                  text: res.data.message,
                  icon: "success",
                }).then(() => {
                  this.getBeds()
                })
              } else {
                Swal.fire({
                  title: "ไม่สำเร็จ",
                  text: res.data.message,
                  icon: "error",
                })
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
    },
    updateBedState(bed) {
      axios_mod
        .put(`/bed/state/${bed.id}`, bed)
        .then((res) => {
          this.getBeds()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    convertStateToTrue() {
      this.beds.forEach((bed) => {
        if (bed.state === 1) {
          bed.state = "true"
        } else {
          bed.state = "false"
        }
      })
    },
    getBeds() {
      axios_mod
        .get("/bedsByUser")
        .then((res) => {
          this.beds = res.data.beds
          if (this.beds) {
            this.convertStateToTrue()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getBeds()
  },
}
</script>

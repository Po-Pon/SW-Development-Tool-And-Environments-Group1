<template>
  <div>
    <div v-show="arr_new_case">
      <h2 class="text-center">กราฟแสดงผู้ติดเชื้อประจำวัน</h2>
      <canvas id="myChart" class="w-100"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Chart from "chart.js"
import moment from "moment"

export default {
  data() {
    return {
      arr_new_case: false,
    }
  },
  methods: {
    drawChart(data) {
      moment.locale("th")
      let label = []
      let dataSet = []
      for (let i = data.length - 1; i >= data.length - 30; i--) {
        label.push(moment(data[i].txn_date).format("LL"))
        dataSet.push(data[i].new_case)
      }
      label.reverse()
      dataSet.reverse()
      var ctx = document.getElementById("myChart")
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              label: "ผู้ติดเชื้อเพิ่มขึ้นรายวัน",
              data: dataSet,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],

              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      })
      this.arr_new_case = true
    },
    getTimelineData() {
      axios
        .get("https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all")
        .then((res) => {
          this.drawChart(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  created() {
    this.getTimelineData()
  },
}
</script>
<style scoped></style>

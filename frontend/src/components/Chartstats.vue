<template>
  <div v-show="graph">
    <h2>กราฟสถิติผู้ติดเชื้อเพิ่มในแต่ละวัน</h2>
    <canvas id="myChart" class="w-100"></canvas>
    <br />
    <h2>กราฟสถิติการรักษาผู้ป่วยหายเพิ่มในแต่ละวัน</h2>
    <canvas id="myChart2" class="w-100"></canvas>
    <h2>กราฟสถิติผู้เสียชีวิตสะสม</h2>
    <canvas id="myChart3" class="w-100"></canvas>
  </div>
</template>

<script>
import axios from "axios"
import Chart from "chart.js"
import moment from "moment"

export default {
  data() {
    return {
      graph: false,
    }
  },
  methods: {
    newCase(label, dataSet) {
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
    },
    newrecovered(label, dataSet) {
      var ctx = document.getElementById("myChart2")
      var myChart2 = new Chart(ctx, {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              label: "รักษาหายเพิ่มรายวัน",
              data: dataSet,
              backgroundColor: ["rgb(54, 162, 235, 0.2)"],
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
    },
    totaldeath(label, dataSet) {
      var ctx = document.getElementById("myChart3")
      var myChart3 = new Chart(ctx, {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              label: "เสียชีวิตสะสม",
              data: dataSet,
              backgroundColor: ["rgb(161, 156, 156, 0.1)"],

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
    },
    drawChart(data) {
      moment.locale("th")
      let label = []
      let dataSetNewCase = []
      let dataSetNewrecovered = []
      let dataSetTotaldeath = []
      for (let i = data.length - 1; i >= data.length - 30 - 1; i--) {
        label.push(moment(data[i].txn_date).format("LL"))
        dataSetNewCase.push(data[i].new_case)
        dataSetNewrecovered.push(data[i].new_recovered)
        dataSetTotaldeath.push(data[i].total_death)
      }
      label.reverse()
      dataSetNewCase.reverse()
      dataSetNewrecovered.reverse()
      dataSetTotaldeath.reverse()
      this.newCase(label, dataSetNewCase)
      this.newrecovered(label, dataSetNewrecovered)
      this.totaldeath(label, dataSetTotaldeath)
    },
    getTimelineData() {
      axios
        .get("https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all")
        .then((res) => {
          this.drawChart(res.data)
          this.graph = true
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

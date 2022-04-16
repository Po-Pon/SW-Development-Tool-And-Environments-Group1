<template>
  <div>
    <canvas id="covid-chart"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import moment from "moment";
export default {
  name: "CovidChart",
  data() {
    return {
      covidData: null,
    };
  },
  mounted() {
    moment.locale("th");
    let timelineCasesAll =
      "https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all";
    axios
      .get(timelineCasesAll)
      .then((res) => {
        let covidDataSet = res.data;
        let txn_date = []; // Date
        let total_case = []; // Total Case
        let total_death = []; // Total Dead
        let total_recovered = []; // Total Cured
        covidDataSet.forEach((item) => {
          txn_date.push(moment(item.txn_date).format("LL"));
          total_case.push(item.total_case);
          total_death.push(item.total_death);
          total_recovered.push(item.total_recovered);
        });
        this.covidData = {
          type: "line",
          data: {
            labels: txn_date,
            datasets: [
              {
                label: "ติดเชื้อสะสม",
                data: total_case,
                backgroundColor: "rgba(60, 174, 235, 0.8)",
                borderColor: "#308bbc",
                borderWidth: 3,
              },
              {
                label: "เสียชีวิต",
                data: total_death,
                backgroundColor: "rgba(95, 101, 104, 0.8)",
                borderColor: "#4c5153",
                borderWidth: 3,
              },
              {
                label: "หายแล้ว",
                data: total_recovered,
                backgroundColor: "rgba(71, 183,132,.5)",
                borderColor: "#47b784",
                borderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    padding: 25,
                  },
                },
              ],
            },
          },
        };
        const ctx = document.getElementById("covid-chart");
        new Chart(ctx, this.covidData);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

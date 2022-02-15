<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    authentication() {
      let info = JSON.parse(localStorage.getItem("info"));
      if (info != null) {
        this.$root.info = info;
        this.$root.loggedIn = true;
        this.$router.push("/");
      } else {
        this.loggedIn = false;
      }
    },
  },
  created() {
    this.authentication();
  },
};
</script>

<style scoped></style>

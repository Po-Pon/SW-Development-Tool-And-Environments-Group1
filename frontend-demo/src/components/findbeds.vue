<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      authentication() {
        let info = JSON.parse(localStorage.getItem("info"));
        if (info != null) {
          this.$root.info = info;
          this.$root.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      },
    };
  },
  methods: {},
  created() {
    this.authentication();
  },
};
</script>

<style scoped></style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Card suit="H" value="K" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Card,
  },
});
</script>

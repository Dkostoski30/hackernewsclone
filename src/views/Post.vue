<script setup>
import { useRoute } from 'vue-router';
import Details from "@/components/Post/Details.vue";
const route = useRoute();
</script>

<template>
  <Details :id="route.params.id"/>
</template>

<style scoped>
</style>
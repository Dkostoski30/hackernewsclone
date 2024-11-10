<script setup>
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="container mt-5">
    <div v-if="post" class="card shadow-sm p-4">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-subtitle text-muted">
          By <strong>{{ post.by }}</strong> | {{ format_time(post.time) }}
        </p>
        <div v-if="post.text" class="mt-3" v-html="post.text"></div>
        <a v-if="post.url" :href="post.url" target="_blank" class="btn btn-warning mt-3">
          Visit Page
        </a>
      </div>
    </div>
    <p v-else class="text-muted">Loading...</p>
    <button @click="router.back()" class="btn btn-secondary my-4">Go Back</button>
  </div>
</template>

<style scoped>

</style>
<script>
import { mapState } from 'vuex';

export default {
  props: ['id'],
  computed: {
    ...mapState(['post_details']),
    post() {
      return this.post_details;
    },
  },
  methods: {
    format_time(unix_timestamp) {
      const seconds_elapsed = Math.floor(Date.now() / 1000) - unix_timestamp;

      const minutes = Math.floor(seconds_elapsed / 60);
      if (minutes < 60) return `${minutes} minutes ago`;

      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hours ago`;

      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    },
  },
  mounted() {
    this.$store.dispatch('fetchPostDetails', this.id);
  },
};
</script>
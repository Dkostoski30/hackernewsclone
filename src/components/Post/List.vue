<script setup>
  import {computed} from 'vue'
  function format_time(unix_timestamp){
    const seconds_elapsed = Math.floor(Date.now() / 1000) - unix_timestamp

    const minutes = Math.floor(seconds_elapsed / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }
</script>


<template>
  <div class="container">
    <ul v-if="posts.length > 0" class="col-12" style="list-style-type: none;">
      <li class="card p-3 col-md-12 w-100 mb-3 d-flex flex-row align-items-center" v-for="post in posts" :key="post.id">
        <div class="me-3">
          <iframe :src="post.url" alt="Cube Icon" style=" overflow-y: hidden;"/>
        </div>
        <div class="flex-grow-1">
          <router-link style="text-decoration: none;" :to="{ name: `Post`, params: { id: post.id } }">
            <p class="h5 mb-2 text-dark">{{ post.title }}</p>
            <div class="d-flex justify-content-start align-items-center text-muted">
              <p class="me-3 mb-0">{{ post.score }} points</p>
              <p class="me-3 mb-0">{{ post.by }}</p>
              <p class="me-3 mb-0">{{ format_time(post.time) }}</p>
              <a class="text-muted" style="text-decoration: none">{{ post.url.replace('http://', '').replace('https://', '') }}</a>
            </div>
          </router-link>
        </div>
        <button class="btn btn-outline-secondary ms-3">
          Share
        </button>

      </li>
    </ul>
  </div>
</template>

<style scoped>
  iframe{
    -ms-zoom: 0.25;
    -moz-transform: scale(0.25);
    -moz-transform-origin: 0 0;
    -o-transform: scale(0.75);
    -o-transform-origin: 0 0;
    -webkit-transform: scale(0.75);
    -webkit-transform-origin: 0 0;
    overflow-y: hidden;
  }

</style>

<script>

  export default {
    props:{
      posts: Array,
    },
  }
</script>
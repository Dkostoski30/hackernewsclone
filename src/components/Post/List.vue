<script setup>

</script>

<template>
  <div>
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: `Post`, params: { id: post.id } }">
          {{post.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
<script>
  export default {
    props:{
      posts: Array,
    },
  }
</script>
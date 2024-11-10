<script setup>


import Sidebar from "@/components/SIdebar.vue";
</script>

<template>
  <header style="width: 90%;">
    <Search/>
  </header>
  <main class="d-flex align-items-start" style="width: 90%;">
    <Sidebar/>
    <List :posts="posts"/>
  </main>
</template>

<style scoped>

</style>
<script>
  import Search from "@/components/Search.vue";
  import List from "@/components/Post/List.vue";
  import {mapState, mapActions} from "vuex";

  export default {
    components: {
      List, Search
    },
    computed:{
      ...mapState(['posts']),
    },
    created(){
      this.fetchPosts();
    },
    methods:{
      ...mapActions(['fetchPosts']),
    }
  }
</script>
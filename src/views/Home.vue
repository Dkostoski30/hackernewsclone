<script setup>


</script>

<template>
  <main>
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
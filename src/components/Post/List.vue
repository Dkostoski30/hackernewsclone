<script setup>
import {onMounted, reactive} from 'vue'
import {useStore} from "vuex";

const store = useStore();
  function format_time(unix_timestamp){
    const seconds_elapsed = Math.floor(Date.now() / 1000) - unix_timestamp

    const minutes = Math.floor(seconds_elapsed / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }
  const postsWithComments = reactive({});

  async function toggleComments(postId, commentIds) {
    if (!postsWithComments[postId]) {
      postsWithComments[postId] = { showComments: false, comments: [] };
    }

    postsWithComments[postId].showComments = !postsWithComments[postId].showComments;
    if (postsWithComments[postId].showComments && postsWithComments[postId].comments.length === 0) {
      postsWithComments[postId].comments = await store.dispatch('fetchComments', commentIds);
    }
  }
</script>



<template>
  <div class="container">
    <ul v-if="posts.length > 0" class="p-0" style="list-style-type: none;">
      <li
          class="card p-3 w-100 mb-3 d-flex flex-column"
          v-for="post in posts"
          :key="post.id"
      >
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center">
          <div class="flex-grow-1 mb-3 mb-md-0">
            <router-link
                :to="{ name: 'Post', params: { id: post.id } }"
                class="h5 mb-2 text-dark py-2"
                style="cursor:pointer; text-decoration: none;">{{ post.title }}</router-link>
            <div class="d-flex flex-wrap text-muted">
              <p class="me-3 mb-0">{{ post.score }} points</p>
              <p class="me-3 mb-0">{{ post.by }}</p>
              <p class="me-3 mb-0">{{ format_time(post.time) }}</p>
              <a
                           class="text-mute text-truncate"
                           :href="post.url"

                           style="text-decoration: none">
                {{ post.url.replace('http://', '').replace('https://', '') }}
              </a>
            </div>
          </div>
          <div class="d-flex align-items-center ms-md-auto">
            <button
                @click.prevent="toggleComments(post.id, post.kids || [])"
                class="btn btn-outline-secondary me-2">
              <i class="fas fa-comments"></i>
              {{ post.kids ? post.kids.length : 0 }}
            </button>
            <button class="btn btn-outline-secondary">
              Share
            </button>
          </div>
        </div>
        <div v-if="postsWithComments[post.id]?.showComments" class="comments mt-3">
          <p v-if="!postsWithComments[post.id].comments.length">No comments yet..</p>
          <ul v-else>
            <li v-for="comment in postsWithComments[post.id].comments" :key="comment.id" class="mb-2">
              <p class="text-muted">{{ format_time(comment.time) }} by {{ comment.by }}</p>
              <p v-html="comment.text"></p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
@media screen and (max-width: 700px) {
  .text-truncate {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

<script>

  export default {
    props:{
      posts: Array,

    },
    mounted() {
      for (const post of this.posts) {
        this.$store.commit('fetchComments', post.id);
      }
    },
  }

</script>
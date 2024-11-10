<script setup>
  import {computed, reactive} from 'vue'
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

  function toggleComments(postId, commentIds) {
    if (!postsWithComments[postId]) {
      postsWithComments[postId] = { showComments: false, comments: [] };
    }

    postsWithComments[postId].showComments = !postsWithComments[postId].showComments;
    if (postsWithComments[postId].showComments && postsWithComments[postId].comments.length === 0) {
      fetchComments(commentIds).then(comments => {
        postsWithComments[postId].comments = comments;
      });
    }
  }

  async function fetchComments(commentIds) {
    return await Promise.all(
        commentIds.map(async (id) => {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return response.json();
        })
    );
  }
</script>


<template>
  <div class="container">
    <ul v-if="posts.length > 0" class="p-0" style="list-style-type: none;">
      <li
          class="card p-3 w-100 mb-3 d-flex flex-column flex-md-row align-items-start align-items-md-center"
          v-for="post in posts"
          :key="post.id"
      >
        <div class="flex-grow-1 mb-3 mb-md-0">
          <div style="text-decoration: none">
            <p class="h5 mb-2 text-dark py-2" style="cursor:pointer"
               @click.prevent="toggleComments(post.id, post.kids || [])">{{ post.title }}</p>
            <div class="d-flex flex-wrap text-muted">
              <p class="me-3 mb-0">{{ post.score }} points</p>
              <p class="me-3 mb-0">{{ post.by }}</p>
              <p class="me-3 mb-0">{{ format_time(post.time) }}</p>
              <router-link  :to="{ name: 'Post', params: { id: post.id } }"
                  class="text-mute text-truncate"
                  :href="post.url"
                  target="_blank"
                  style="text-decoration: none;"
              >
                {{ post.url.replace('http://', '').replace('https://', '') }}
              </router-link>
            </div>
          </div>
          <div v-if="postsWithComments[post.id]?.showComments" class="comments mt-3">
            <p v-if="!postsWithComments[post.id].comments.length">Loading comments...</p>
            <ul v-else>
              <li v-for="comment in postsWithComments[post.id].comments" :key="comment.id" class="mb-2">
                <p class="text-muted">{{ format_time(comment.time) }} by {{ comment.by }}</p>
                <p v-html="comment.text"></p>
              </li>
            </ul>
          </div>
        </div>
        <button class="btn btn-outline-secondary ms-md-auto">
          Share
        </button>
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
  }
</script>
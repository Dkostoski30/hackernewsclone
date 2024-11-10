<script setup>

</script>

<template>
  <div id="navbar" class="container d-flex align-items-center justify-content-between py-3">
    <div class="d-flex align-items-center gap-3">
      <img alt="Missing Image" src="../assets/logo.webp" width="50" height="50"/>
      <h3 class="text-muted mb-0">Search<br> Hacker News</h3>
    </div>
    <div class="flex-grow-1 mx-4 position-relative">
      <div class="input-group">
        <span class="input-group-text" style="background: transparent; border:none;">
          <img alt="search icon" src="../assets/search.png" width="20" height="20"/>
        </span>
        <input
            type="text"
            class="form-control my-1"

            placeholder="Search stories by title, url or author"
            @input="handleSearch"
            v-model="query"
        />
      </div>
      <div class="results-container mx-5 position-absolute w-100">
        <p v-if="results.length === 0 && query" class="text-muted mx-4 mt-2 position-absolute w-100">No results
          found...</p>
        <ul class="list-group" v-if="results.length !== 0">
          <li class="list-group-item" v-for="result in results.slice(0, 7)" :key="result.objectID">
            <a :href="result.url" target="_blank" style="text-decoration: none" class="text-black">{{ result.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="text-muted mb-0">By Algolia</p>
  </div>
</template>

<style scoped>
#navbar {
  z-index: 1000;
}
.input-group{
  border: 1px solid gray;
  border-radius: 4rem;
  padding: 0 1.5rem;
}
input {
  padding: 0.5em;
  margin: 1em 0;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  border: none;
}
input:focus {
  padding: 0.5em;
  margin: 1em 0;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  border: none;
}
.results-container {
  overflow-y: hidden;
  overflow-x: hidden;
  max-width: 500px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}

@media (max-width: 576px) {
  .container {
    flex-direction: column;
  }

  .input-group-text {
    display: flex;
    align-items: center;
  }

  .results-container {
    max-width: 100%;
    left: 0;
  }

  .container .text-muted {
    display: none;
  }
}
</style>

<script>

import axios from "axios";

export default {
  data() {
    return {
      query: "",
      results: []
    }
  },
  methods: {
    async handleSearch() {
      if (this.query.length < 3) {
        this.results = [];
        return;
      }
      try {
        const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${this.query}`)
        this.results = response.data.hits;
      } catch (err) {
        console.log(err);
        this.results = [];
      }
    }
  }
}
</script>
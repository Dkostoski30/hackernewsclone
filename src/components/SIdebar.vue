<script setup>

</script>

<template>
  <div class="container w-25">
    <ul class="list-unstyled">
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">All</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Hot</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Show HN</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Ask HN</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Polls</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Jobs</a>
      </li>
    </ul>
    <ul class="list-unstyled mt-4">
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Shipow</a>
      </li>
      <li class="">
        <a class="d-block px-3 py-2 text-dark text-decoration-none hover-bg-secondary" href="#">Starred</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .list-unstyled a{
    transition: background-color ease-in-out 0.5s;
    text-decoration: none;
    color: #383838;
  }
  .list-unstyled a:hover{
    transition: background-color ease-in-out 0.5s;
    background-color: rgba(169, 169, 169, 0.38);
  }
</style>
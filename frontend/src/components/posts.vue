<template>
  <section id="posts-container">
    <article v-for="post in showPosts" :key="post.id">
      <p>{{ post.date_publication }}</p>
      <p>{{ post.img_url }}</p>
      <p>{{ post.user_id }}</p>
      <p>{{ post.likes }}</p>
      <p>{{ post.dislikes }}</p>
    </article>
    <button @click="createPost">Créer une publication</button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Posts",
  computed: {
    ...mapGetters(["showPosts"]),
  },
  methods: {
    ...mapActions(["getPosts", "createPost"]),
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style>
#posts-container {
  width: 70%;
}
</style>
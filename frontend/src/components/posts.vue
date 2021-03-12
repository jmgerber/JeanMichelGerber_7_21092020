<template>
  <section id="posts-container">
    <CreatePost />
    <article v-for="post in showPosts" :key="post.id">
      <header class="header-post">
        <img
          :src="post.User.avatar_url"
          :alt="'Avatar de ' + post.User.lastname + ' ' + post.User.firstname"
        />
        <div class="header-text">
          <p class="header-text__name">
            {{ post.User.lastname }} {{ post.User.firstname }}
          </p>
          <p class="header-text__relativetime">
            Publié {{ formatDate(post.formatted_date) }}
          </p>
        </div>
        <button
          v-if="
            $store.state.connectedUser != null &&
            (post.UserId == $store.state.userId ||
              $store.state.connectedUser.admin == true)
          "
          title="Supprimer ce post"
          @click="$store.dispatch({ type: 'deletePost', id: post.id })"
        >
          <font-awesome-icon :icon="['fas', 'trash-alt']" />
        </button>
      </header>
      <section class="post-picture">
        <img :src="post.img_url" alt="Photo d'un post" />
      </section>
      <div class="likes-container">
        <button
          class="like-button like"
          @click="
            $store.dispatch({ type: 'likePost', id: post.id, likeValue: 1 })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          <span>{{ post.likes }}</span>
        </button>
        <button
          class="like-button dislike"
          @click="
            $store.dispatch({ type: 'likePost', id: post.id, likeValue: -1 })
          "
        >
          <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          <span>{{ post.dislikes }}</span>
        </button>
      </div>
      <Comments :post="post" />
    </article>
  </section>
</template>

<script>
import Comments from "./comments";
import CreatePost from "./create-post";
import { mapActions, mapGetters } from "vuex";
// Pour la gestion des dates
import moment from "moment";
moment.locale("fr");

export default {
  name: "Posts",
  components: {
    CreatePost,
    Comments,
  },
  computed: {
    ...mapGetters(["showPosts"]),
  },
  methods: {
    ...mapActions(["getPosts"]),
    formatDate(date) {
      let relativeDate = moment(date).add(1, "h").fromNow();
      return relativeDate;
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style lang="scss">
#posts-container {
  width: 70%;
  article {
    background-color: rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  }
  .header-post {
    height: 56px;
    background-color: #fff;
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
      height: 80%;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    }
    .header-text {
      margin-left: 12px;
      &__name {
        font-weight: 500;
        font-size: 1.1rem;
      }
      &__relativetime {
        font-weight: 300;
      }
    }
    button {
      margin: 0 10px 0 auto;
      background-color: #f45d55;
      border: 2px solid #ce4942;
      color: white;
      font-size: 1.1rem;
      padding: 2px 5px;
      transition: 0.1s;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .post-picture {
    display: flex;
    max-height: 400px;
    img {
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  .likes-container {
    display: flex;
    justify-content: space-evenly;
    background-color: #fff;
    padding: 4px 0;
    .like-button {
      width: 49%;
      height: 40px;
      color: #212121;
      border: none;
      appearance: none;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.like {
        background-color: #4bd86a;
        border: 2px solid #32c068;
      }
      &.dislike {
        background-color: #f45d55;
        border: 2px solid #ce4942;
      }
      svg {
        font-size: 1.3rem;
        margin-right: 5px;
      }
      span {
        font-family: "Roboto";
        font-weight: 500;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
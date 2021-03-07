<template>
  <form @submit.prevent="createPost" id="create-post-form">
    <input
      type="file"
      name="image-input"
      accept=".png, .jpg, .jpeg, .gif"
      id="image-input"
      class="add-post-button"
      @change="updateFilename"
    />
    <label for="image-input">
      <div v-if="imagePreview">
        <img
          :src="imagePreview"
          class="image-preview"
          alt="Preview de l'image"
        />
      </div>
      <div v-else>
        <font-awesome-icon :icon="['fas', 'plus-square']" /><br />
        <span>Publier une image</span>
      </div>
      <button type="submit" v-if="imagePreview">Envoyer</button>
    </label>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "create-post",
  data() {
    return {
      imagePreview: null,
      filename: null,
    };
  },
  methods: {
    updateFilename() {
      let inputFilename = document.querySelector(".add-post-button");
      this.filename = inputFilename.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.filename);
    },
    createPost() {
      const formData = new FormData();
      formData.append("userId", this.$store.state.userId);
      formData.append("image", this.filename);
      axios
        .post("/posts/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.imagePreview = null;
          this.$store.dispatch("getPosts");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.add-post-button {
  text-align: center;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  & + label {
    text-align: center;
    width: 100%;
    font-size: 1.2em;
    font-weight: 300;
    border: 2px dashed rgba(253, 81, 1, 0.8);
    background-color: #fff;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 30px;
    padding: 10px 0;
    svg {
      transition: 0.3s;
      font-size: 1.7rem;
    }
    .image-preview {
      max-height: 250px;
      margin-top: 10px;
    }
    button {
      color: #fff;
      font-weight: 500;
      font-size: 1.2rem;
      appearance: none;
      border: none;
      padding: 6px 15px;
      background-color: rgba(253, 81, 1, 0.9);
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  &:focus + label,
  & + label:hover {
    border-style: solid;
    background-color: rgba(253, 81, 1, 0.05);
    & > div svg {
      transform: scale(1.2);
      color: rgba(253, 81, 1, 0.9);
    }
  }
}
</style>
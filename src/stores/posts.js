import axios from "axios";
import { defineStore } from "pinia";

export const usePostsStore = defineStore({
  id: "posts",
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts: (state) => state.posts,
  },
  actions: {
    async fetchPosts() {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/')
      this.posts = data
    }
  },
});

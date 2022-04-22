import axios from "axios";
import { defineStore } from "pinia";

export const useCommentsStore = defineStore({
  id: "comments",
  state: () => ({
    comments: [],
    customComments: [],
  }),
  getters: {
    getComments: (state) => state.comments,
  },
  actions: {
    async fetchComments(id) {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      this.comments = data
    },
    async addComment(comment) {
      await axios.post('https://jsonplaceholder.typicode.com/comments', comment)
      this.comments.push(comment)
      this.customComments.push(comment)
    },
    async editComment(comment) {
      await axios.put(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, comment)
      const index = this.comments.findIndex(c => c.id === comment.id)
      this.comments[index] = comment
    },
    async deleteComment(id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      this.comments = this.comments.filter(c => c.id !== id)
    }
  },
});

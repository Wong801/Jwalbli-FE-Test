<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useCommentsStore } from '../stores/comments';
import CommentComponent from './CommentComponent.vue'
import Swal from 'sweetalert2'

defineProps({
  post: {
    type: Object,
    userId: {
      type: Number,
    },
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
  },
})

const store = useCommentsStore();
const commentShow = ref(false);

const comments = computed(() => {
  return store.getComments;
});
const showComment = async (id) => {
  if (!commentShow.value) {
    await store.fetchComments(id);
  }
  commentShow.value = !commentShow.value;
}

const newComment = ref('');
const submitComment = async (id) => {
  const payload = {
    postId: id,
    name: 'John Doe',
    email: 'John_Doe@example.com',
    body: newComment.value,
  }
  await store.addComment(payload);
  Swal.fire({
    title: 'Success!',
    text: 'Your comment has been added!',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
  newComment.value = '';
}
</script>

<template>
  <div class="w-full border-t border-b">
    <div class="border-b border-1 px-8 py-4 bg-[#e8e8e8]">
      <h1 class="font-semibold text-xl">{{ post.title }}</h1>
    </div>
    <div class="px-8 py-2 border-b border-1 min-h-[5rem]">
      <p>{{ post.body }}</p>
    </div>
    <div class="px-6 bg-[#f7f7f7]">
      <button @click="showComment(post.id)" class="w-max">
        <span class="text-xs px-2">Show Comments {{ commentShow ? '&#8595;' : '&#8594;' }}</span>
      </button>
    </div>
    <div v-if="commentShow">
      <div class="border-t flex py-2">
        <input v-model="newComment" @keypress.enter="submitComment(post.id)" type="text" name="comment" id="comment"
          placeholder="Write your comment here" class="w-full py-2 px-2 text-sm bg-[#f2f2f2] mx-6">
        <button @click="submitComment(post.id)"
          class="min-h-full px-4 bg-blue-600 text-white rounded-md">Submit</button>
      </div>
      <div class="grid gap-y-4 bg-[#f7f7f7] py-6">
        <CommentComponent v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>
      <div class="border-t flex py-2">
        <input v-model="newComment" @keypress.enter="submitComment(post.id)" type="text" name="comment" id="comment"
          placeholder="Write your comment here" class="w-full py-2 px-2 text-sm bg-[#f2f2f2] mx-6">
        <button @click="submitComment(post.id)"
          class="min-h-full px-4 bg-blue-600 text-white rounded-md">Submit</button>
      </div>
    </div>
  </div>
</template>
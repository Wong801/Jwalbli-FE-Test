<script setup>
import { ref } from 'vue';
import { useCommentsStore } from '../stores/comments';
import Swal from 'sweetalert2'

defineProps({
  comment: {
    type: Object,
    postId: {
      type: Number,
    },
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    body: {
      type: String,
    },
  }
})

const showButton = ref(false);
const hideButton = () => {
  if (!showMenu.value) {
    showButton.value = !showButton.value;
  }
}
const showMenu = ref(false);

const isEditing = ref(false);
const editedComment = ref('');


const store = useCommentsStore();

const editComment = async (comment) => {
  if (store.customComments.findIndex(c => c.id === comment.id) !== -1) {
    Swal.fire({
      title: 'Error!',
      text: 'Unable to edit the comment!',
      icon: 'error',
      confirmButtonText: 'Okay Sure'
    })
  } else {
    const payload = {
      postId: comment.postId,
      id: comment.id,
      name: comment.name,
      email: comment.email,
      body: editedComment.value,
    }
    await store.editComment(payload);
    Swal.fire({
      title: 'Success!',
      text: 'Your comment has been updated!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
    isEditing.value = false;
  }
}

const deleteComment = async (id) => {
  if (store.customComments.findIndex(comment => comment.id === id) !== -1) {

    Swal.fire({
      title: 'Error!',
      text: 'Unable to delete the comment!',
      icon: 'error',
      confirmButtonText: 'Okay Sure'
    })
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        store.deleteComment(id);
      }
    })
  }
}
</script>

<template>
  <div class="mx-8 grid gap-y-2 border" @mouseenter="showButton = true" @mouseleave="hideButton">
    <div class="border-b px-4 leading-3 bg-[#f2f2f2] py-2 relative">
      <h6 class="text-sm font-semibold">{{ comment.name }}</h6>
      <span class="text-xs px-4">{{ comment.email }}</span>
      <button v-if="showButton" @click="showMenu = !showMenu" class="absolute top-0 right-4 p-2">...</button>
      <div v-if="showMenu" class="bg-[#fff] absolute w-20 top-6 right-4 py-1">
        <button v-if="!isEditing" @click="isEditing = true; showMenu = false; editedComment = comment.body"
          class="hover:bg-[#f6f6f6] w-full px-2 py-1 text-left">
          <span class="text-xs px-2">Edit</span>
        </button>
        <button v-else @click="isEditing = false;" class="hover:bg-[#f6f6f6] w-full px-2 py-1 text-left">
          <span class="text-xs px-2">Cancel</span>
        </button>
        <button @click="deleteComment(comment.id)" class="hover:bg-[#f6f6f6] w-full px-2 py-1 text-left">
          <span class="text-xs px-2">Delete</span>
        </button>
      </div>
    </div>
    <div class="px-4 border-t py-2">
      <p v-if="!isEditing" class="text-sm">{{ comment.body }}</p>
      <div v-else>
        <input v-model="editedComment" type="text" name="editComment" id="editComment"
          class="w-full py-2 px-2 text-md bg-[#fff]">
        <div class="flex justify-end w-full">
          <button @click="editComment(comment)"
            class="min-h-full px-4 bg-blue-600 text-white rounded-md mt-2 py-1">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
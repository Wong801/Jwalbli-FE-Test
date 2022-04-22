<script setup>
import BiodataVue from '@/components/Biodata.vue';
import PostComponent from '../components/PostComponent.vue';
import { onMounted, ref } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { computed } from '@vue/reactivity';

const store = usePostsStore();

const profile = ref({
  name: 'Catur Satrio Wicaksono',
  placeBorn: 'Jakarta',
  bornDate: '27 March 2002',
  age: 20,
  lastEducation: 'Senior High School of 4 Malang',
});

const posts = computed(() => store.getPosts);

onMounted(() => {
  store.fetchPosts();
});
</script>

<template>
  <main class="px-8 py-6 grid gap-y-8">
    <h1 class="text-4xl font-bold text-center">Welcome!</h1>
    <BiodataVue :profile="profile" />
    <div class="grid gap-y-6">
      <PostComponent v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </main>
</template>

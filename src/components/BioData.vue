<script setup>
defineProps({
  profile: {
    name: {
      type: String,
    },
    placeBorn: {
      type: String,
    },
    bornDate: {
      type: String,
    },
    age: {
      type: Number,
    },
    lastEducation: {
      type: String,
    },
  }
})
</script>

<template>
  <div class="flex md:flex-row flex-col items-center gap-x-20 gap-y-6">
    <div>
      <img src="@/assets/profile.png" alt="Profile Pic" class="rounded-full h-52 w-52">
    </div>
    <div class="grid grid-cols-2 w-max">
      <h1>Name</h1>
      <h4>: {{ profile.name }}</h4>
      <h1>Age</h1>
      <h4>: {{ profile.age }}</h4>
      <h1>Place, Date of Born</h1>
      <h4>: {{ profile.placeBorn }}, {{ profile.bornDate }}</h4>
      <h1>Last Education</h1>
      <h4>: {{ profile.lastEducation }}</h4>
    </div>
  </div>
</template>
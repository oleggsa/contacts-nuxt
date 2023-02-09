<template>
  <div>
    <Contacts/>
  </div>
</template>

<script>
import Contacts from '@/components/Contacts.vue';

export default {
  name: "IndexPage",
  components: {Contacts},
}
</script>

<style>
body {
  display: flex;
  justify-content: center;
}
</style>

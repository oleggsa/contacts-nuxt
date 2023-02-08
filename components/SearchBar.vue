<template>
  <input v-model="input" type="text">
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style>
input {
  margin: 10px 0;
  width: 100%;
}
</style>

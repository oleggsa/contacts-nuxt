<template>
  <div>
    <input v-model="input" type="text">
    Sort by:
    <select>
      <option>default</option>
      <option>data ^</option>
      <option>data down</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      input: ''
    }
  },
}
</script>

<style>
input {
  margin: 10px 0;
  width: 100%;
}
</style>

<template>
  <div class="list">
    <SearchBar/>
    <div class="item" v-for="item in this.$store.getters.getLocalContacts" :key="item.id">
      {{item.name}}
      <div class="buttons">
        <button class="edit">Edit</button>
        <button class="delete" @click="deleteContact(item.id)">Del</button>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue';

export default {
  name: "Contacts",
  components: {SearchBar},
  data() {
    return {
      input: ""
    };
  },
  methods: {
    deleteContact(id){
      this.$store.commit('REMOVE_CONTACT', id)
      console.log('works', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 2px solid black;
  padding: 5px;
  margin-top: 20px;
  min-width: 300px;
  height: 500px;
  background-color: aquamarine;
}

.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: aliceblue;
  margin-top: 5px;
  padding: 5px 10px;
  &:first-child {
    margin-top: 0;
  }
}

button {
  padding: 2px;
}
</style>

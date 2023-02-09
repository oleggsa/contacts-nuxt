<template>
  <div>
    <input v-model="input" @keyup="filterValue" type="text">
    <div class="modify-list">
      <div class="sort">
        Sort by:
        <select @change="selectOption">
          <option disabled value="">Choose</option>
          <option value="old-top">old on top</option>
          <option value="new-top">new on top</option>
        </select>
      </div>
      <button class="create" @click="$emit('create-contact')">CREATE</button>
    </div>
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
  methods: {
    filterValue() {
      this.$emit('filter-value', this.input)
    },
    selectOption(e){
      this.$emit('selected-sort', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  margin: 8px 0;
  width: 100%;
  height: 25px;
}
.modify-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.create {
  padding: 3px;
}
</style>

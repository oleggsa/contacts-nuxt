<template>
  <div class="list">
    <Dialog :show="isDeleteDialogVisible" @hide-dialog="hideDialog">
      <div>Delete contact {{currentContact?.name}}</div>
      <div>Are you sure?</div>
      <div class="delete-modal-buttons">
        <button class="button-yes" @click="removeContact">YES</button>
        <button class="button-no" @click="hideDialog">NO</button>
      </div>
    </Dialog>
    <Dialog :show="isEditDialogVisible" @hide-dialog="hideDialog">
      <input type="text" :value="currentContact?.name" @change="changedContactNameFn">
      <input type="number" :value="currentContact?.number" @change="changedContactNumberFn">
      <button class="save" @click="saveChangedContact">SAVE</button>
    </Dialog>
    <Dialog :show="isShowDialogVisible" @hide-dialog="hideDialog">
      <div>{{currentContact?.name}}</div>
      <div>{{currentContact?.number}}</div>
      <button class="save" @click="saveChangedContact">CLOSE</button>
    </Dialog>
    <SearchBar @filter-value="filterData" />
    <div class="item" v-for="item in filteredList.length || this.input.length ? filteredList : $store.getters.getLocalContacts" :key="item.id">
      {{item.name}}
      <div class="buttons">
        <button class="show" @click="showInfoDialog(item)">Show</button>
        <button class="edit" @click="showEditDialog(item)">Edit</button>
        <button class="delete" @click="showDeleteDialog(item)">Del</button>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from './Dialog.vue';
import SearchBar from './SearchBar.vue';

export default {
  name: "Contacts",
  components: {SearchBar, Dialog},
  data() {
    return {
      contactsList: [],
      filteredList: [],
      input: "",
      isEditDialogVisible: false,
      isDeleteDialogVisible: false,
      isShowDialogVisible: false,
      currentContact: null,
      changedContactName: '',
      changedContactNumber: ''
    };
  },
  methods: {
    showInfoDialog(contact){
      console.log('showInfoDialog')
      this.currentContact = contact;
      this.isShowDialogVisible = true
    },
    showEditDialog(contact){
      console.log('showEditDialog')
      this.currentContact = contact;
      this.isEditDialogVisible = true
    },
    showDeleteDialog(contact){
      console.log('showDeleteDialog')
      this.currentContact = contact;
      this.isDeleteDialogVisible = true
    },
    changedContactNameFn(e){
      this.changedContactName = e.target.value
    },
    changedContactNumberFn(e){
      this.changedContactNumber = e.target.value
    },
    saveChangedContact(){
      const editedContact = {
        id: this.currentContact.id,
        date: Date.now(),
        name: this.changedContactName || this.currentContact.name,
        number: this.changedContactNumber || this.currentContact.number
      }
      this.$store.commit('UPDATE_CONTACT', editedContact)
      this.hideDialog()
    },
    filterData(e){
      this.input = e;
      this.contactsList = this.$store.getters.getLocalContacts;
      this.filteredList = this.contactsList.filter(item => item.number.toString().includes(this.input));
      console.log(this.filteredList)
    },
    removeContact(){
      this.$store.commit('REMOVE_CONTACT', this.currentContact.id);
      this.hideDialog()
    },
    hideDialog(){
      console.log('hideDial fn')
      this.isEditDialogVisible = false;
      this.isDeleteDialogVisible = false;
      this.isShowDialogVisible = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  border: 2px solid black;
  padding: 5px;
  margin-top: 20px;
  min-width: 400px;
  height: 500px;
  background-color: aquamarine;
  overflow-y: scroll;
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

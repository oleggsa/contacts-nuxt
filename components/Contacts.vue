<template>
  <div class="list">
    <Dialog :show="isDeleteDialogVisible" @hide-dialog="hideDialog">
      <div class="confirm-dialog">
        <div>Delete contact {{currentContact?.name}}</div>
        <div>Are you sure?</div>
        <div class="delete-modal-buttons">
          <button class="button-yes" @click="removeContact">YES</button>
          <button class="button-no" @click="hideDialog">NO</button>
        </div>
      </div>
    </Dialog>
    <Dialog :show="isEditDialogVisible" @hide-dialog="hideDialog">
      <div class="edit-dialog">
        <input type="text" :value="currentContact?.name" @change="changedContactNameFn">
        <input type="number" :value="currentContact?.number" @change="changedContactNumberFn">
        <button class="save" @click="saveChangedContact">SAVE</button>
      </div>
    </Dialog>
    <Dialog :show="isShowDialogVisible" @hide-dialog="hideDialog">
      <div class="show-dialog">
        <div>{{currentContact?.name}}</div>
        <div>{{currentContact?.number}}</div>
        <button class="save" @click="saveChangedContact">CLOSE</button>
      </div>
    </Dialog>
    <Dialog :show="isCreateDialogVisible" @hide-dialog="hideDialog">
      <div class="edit-dialog">
        <input type="text" @change="changedContactNameFn">
        <input type="number" @change="changedContactNumberFn">
        <button class="save" @click="saveNewContact">SAVE</button>
      </div>
    </Dialog>
    <SearchBar @filter-value="filterData" @create-contact="showCreateDialog" @selected-sort="sortContacts" />
    <div
      v-if="this.input.length && filteredList.length || filteredList.length || contactsList.length && !this.input.length">
      <div
        class="item"
        v-for="item in filteredList.length || this.input.length ? filteredList : contactsList"
        :key="item.id"
      >
        {{item.name}}
        <div class="buttons">
          <button class="show" @click="showInfoDialog(item)">Show</button>
          <button class="edit" @click="showEditDialog(item)">Edit</button>
          <button class="delete" @click="showDeleteDialog(item)">Del</button>
        </div>
      </div>
    </div>
    <div v-else class="no-posts">No contacts found...</div>
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
      sortedList: [],
      input: "",
      isEditDialogVisible: false,
      isDeleteDialogVisible: false,
      isShowDialogVisible: false,
      isCreateDialogVisible: false,
      currentContact: null,
      changedContactName: '',
      changedContactNumber: '',
      selectedSort: ''
    };
  },
  mounted() {
    setTimeout(() => {
      this.contactsList = this.$store.getters.getLocalContacts
      console.log('works')
    }, 1000)
  },
  methods: {
    showInfoDialog(contact){
      console.log('showInfoDialog')
      this.currentContact = contact;
      this.isShowDialogVisible = true
    },
    showCreateDialog(){
      console.log('showCreateDialog')
      this.isCreateDialogVisible = true
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
    saveNewContact(){
      const newContact = {
        id: Date.now(),
        date: Date.now(),
        name: this.changedContactName,
        number: this.changedContactNumber
      }
      console.log(newContact)
      this.$store.commit('CREATE_CONTACT', newContact)
      this.hideDialog()
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
      if(this.input){
        this.filteredList = this.contactsList.filter(item => item.number.toString().includes(this.input));
        console.log(this.filteredList)
      } else {
        this.filteredList = []
      }
    },
    sortContacts(e){
      return this.selectedSort = e;
    },
    removeContact(){
      this.$store.commit('REMOVE_CONTACT', this.currentContact.id);
      console.log('removed')
      this.contactsList = this.contactsList.filter(item => item.id !== this.currentContact.id);
      this.hideDialog()
    },
    hideDialog(){
      this.isEditDialogVisible = false;
      this.isDeleteDialogVisible = false;
      this.isShowDialogVisible = false;
      this.isCreateDialogVisible = false;
    }
  },
  watch: {
    selectedSort(newValue){
      this.sortedList = this.contactsList;
      if(newValue === 'new-top'){
        // this.sortedList.sort(function(a, b) {
        //   return a.date - b.date;
        // });
        this.sortedList.sort((a, b) => {
          console.log(a.date, b.date)
        })
      }
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

.show-dialog,
.confirm-dialog,
.edit-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-posts {
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
}
</style>

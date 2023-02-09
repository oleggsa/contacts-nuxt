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
        <button class="save" @click="hideDialog">CLOSE</button>
      </div>
    </Dialog>
    <Dialog :show="isCreateDialogVisible" @hide-dialog="hideDialog">
      <div class="edit-dialog">
        <input type="text" @change="changedContactNameFn">
        <input type="number" @change="changedContactNumberFn">
        <button class="save" @click="saveNewContact">SAVE</button>
      </div>
    </Dialog>
    <SearchBar @filter-value="findContacts" @create-contact="showCreateDialog" @selected-sort="sortContacts" />
    <div
      v-if="this.input.length && filteredList.length || filteredList.length || contactsList.length && !this.input.length">
      <div
        class="item"
        v-for="item in filteredList.length || this.input.length ? filteredList : contactsList"
        :key="item.id"
      >
        {{item.name}}
        <div class="controls">
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
import Dialog from '@/components/Contacts/Dialog.vue';
import SearchBar from '@/components/Contacts/SearchBar.vue';

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
      isCreateDialogVisible: false,
      currentContact: null,
      changedContactName: '',
      changedContactNumber: '',
      selectedSort: ''
    };
  },
  async mounted() {
    await this.$store.dispatch("getServerContacts")
    this.contactsList = this.$store.getters.getLocalContacts
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
    async saveNewContact(){
      const newContact = {
        id: Date.now(),
        date: Date.now(),
        name: this.changedContactName,
        number: this.changedContactNumber
      }
      await this.$store.dispatch('createContactOnServer', newContact)
      this.contactsList = this.$store.getters.getLocalContacts
      this.filteredList = this.$store.getters.getFilteredContacts(this.input);
      this.hideDialog()
      this.$forceUpdate();
    },
    async saveChangedContact(){
      const editedContact = {
        id: this.currentContact.id,
        date: Date.now(),
        name: this.changedContactName || this.currentContact.name,
        number: this.changedContactNumber || this.currentContact.number
      }
      await this.$store.dispatch('updateContactOnServer', editedContact)
      this.contactsList = this.$store.getters.getLocalContacts
      this.hideDialog()
    },
    findContacts(e){
      this.input = e;
      this.filteredList = this.$store.getters.getFilteredContacts(e);
      this.$forceUpdate();
    },
    sortContacts(e){
      this.$store.commit('SORT_CONTACTS', e)
      this.contactsList = this.$store.getters.getLocalContacts;
    },
    async removeContact(){
      await this.$store.dispatch('removeContactOnServer', this.currentContact.id);
      this.filteredList = this.filteredList.filter(contact => contact.id !== this.currentContact.id)
      this.contactsList = this.$store.getters.getLocalContacts
      this.hideDialog()
    },
    hideDialog(){
      this.isEditDialogVisible = false;
      this.isDeleteDialogVisible = false;
      this.isShowDialogVisible = false;
      this.isCreateDialogVisible = false;
    }
  },
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

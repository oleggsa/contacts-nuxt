import dialog from "@/components/Dialog.vue";

export const state = () => ({
  contacts: []
})

export const getters = {
  getLocalContacts(state) {
    return state.contacts
  },
  getFilteredArray(state, value){
    console.log('filter works')
    let filtered = state.contacts.filter(item => console.log(item.number))
    console.log(filtered)
  }
}

export const mutations = {
  SET_CONTACTS(state, data) {
    state.contacts = data
  },
  REMOVE_CONTACT(state, id) {
    state.contacts = state.contacts.filter(item => item.id !== id)
    console.log('new data', state.contacts)
    this.$axios.$delete('https://63e3735fc919fe386c06aab8.mockapi.io/contacts/' + id)
  },
  UPDATE_CONTACT(state, contact) {
    console.log('contact in store', contact)
    let currentIndex = state.contacts.findIndex(item => item.id === contact.id)
    state.contacts[currentIndex] = contact
    this.$axios.$put('https://63e3735fc919fe386c06aab8.mockapi.io/contacts/' + contact.id, contact)
  },
}

export const actions = {
  async getServerContacts({ state }) {
    const contacts = await this.$axios.get('https://63e3735fc919fe386c06aab8.mockapi.io/contacts')
    await this.commit('SET_CONTACTS', contacts.data)
  }
}

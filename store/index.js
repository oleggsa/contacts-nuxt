export const state = () => ({
  contacts: []
})

export const getters = {
  getLocalContacts(state) {
    return state.contacts
  }
}

export const mutations = {
  SET_CONTACTS(state, data) {
    state.contacts = data
  },
  REMOVE_CONTACT(state, id) {
    console.log('state works')
    state.contacts = state.contacts.filter(item => item.id !== id)
    this.$axios.put('https://63e3735fc919fe386c06aab8.mockapi.io/contacts', state.contacts)
  }
}

export const actions = {
  async getServerContacts({ state }) {
    const contacts = await this.$axios.get('https://63e3735fc919fe386c06aab8.mockapi.io/contacts')
    await this.commit('SET_CONTACTS', contacts.data)
  }
}

import API_URL from "@/utils/config";

export const state = () => ({
  contacts: []
})

export const getters = {
  getLocalContacts(state) {
    return state.contacts
  },
  getFilteredContacts: (state) => (inputVal) => {
    return state.contacts.filter(contact => contact.number.toString().includes(inputVal))
  },
  // getSortedContacts: (state) => (sortType) => {
  //   let sortedContacts = [...state.contacts].sort((a, b) => {return a.date - b.date})
  //     if (sortType === 'new-top'){
  //       return sortedContacts.reverse()
  //     } else {
  //       return sortedContacts
  //     }
  // },
}

export const mutations = {
  SET_CONTACTS(state, data) {
    state.contacts = data
  },
  SORT_CONTACTS(state, sortType) {
    let sortedContacts = [...state.contacts].sort((a, b) => {return a.date - b.date})
    if (sortType === 'new-top'){
      state.contacts = sortedContacts.reverse()
    } else {
      state.contacts = sortedContacts
    }
  }
}

export const actions = {
  async getServerContacts({ state }) {
    try {
      const contacts = await this.$axios.get(API_URL)
      console.log('contacts', contacts)
      this.commit('SET_CONTACTS', contacts.data)
    } catch (e) {
      console.error(e)
    }
  },
  async removeContactOnServer({state, dispatch}, id){
    try {
      await this.$axios.$delete(API_URL + id)
      await dispatch('getServerContacts')
    } catch (e) {
      console.error(e)
    }
  },
  async updateContactOnServer({state, dispatch}, contact){
    try {
      await this.$axios.$put(API_URL + contact.id, contact)
      await dispatch('getServerContacts')
    } catch (e) {
      console.error(e)
    }
  },
  async createContactOnServer({state, dispatch}, contact){
    try {
      await this.$axios.$post(API_URL, contact)
      await dispatch('getServerContacts')
    } catch (e) {
      console.error(e)
    }
  }
}

import { getCategories } from '../../api'

const state = () => ({
  maleList: [],
  femaleList: []
})

const mutations = {
  setMaleList (state, list) {
    state.maleList = list
  },
  setFemaleList (state, list) {
    state.femaleList = list
  }
}

const getters = {
  getMaleList (state) {
    return state.maleList
  },
  getFemaleList (state) {
    return state.femaleList
  }
}

const actions = {
  async getRankingList ({ commit }) {
    return await getCategories()
      .then(res => {
        if (res.data.ok) {
          commit('setMaleList', res.data.male)
          commit('setFemaleList', res.data.female)
        } else {
          console.log('get rankinglist wrong')
        }
      })
      .catch(reason => {
        console.log(reason)
      })
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
}

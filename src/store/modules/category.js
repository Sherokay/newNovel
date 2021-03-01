import { searchByFictionType } from '../../api'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const state = () => ({
  cateList: [],
  // count: Number,
  type: String
})

const mutations = {
  setCateList (state, list) {
    state.cateList = list
  },
  // setCount (state, num) {
  //   state.count = num
  // },
  setType (state, str) {
    state.type = str
  }
}

const getters = {
  getCateList (state) {
    return state.cateList
  },
  // getCount (state) {
  //   return state.count
  // },
  getType (state) {
    return state.type
  }
}

const actions = {
  getCategoriesList ({ commit, state }) {
    NProgress.start()
    return searchByFictionType(state.type)
      .then(res => {
        console.log(state.type)
        if (!res.data.code) {
          commit('setCateList', res.data.data.data)
          // commit('setCount', res.data.data.count)
          NProgress.done()
        } else {
          console.log('get catelist wrong')
          NProgress.done()
        }
      })
      .catch(reason => {
        console.log(reason)
        NProgress.done()
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

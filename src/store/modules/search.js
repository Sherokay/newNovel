import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { searchByTitle, searchByAuthor } from '@/api'

const state = () => ({
  name: String,
  bookList: [],
  wrong: false
})
const mutations = {
  setName (state, name) {
    state.name = name
  },
  setBookList (state, list) {
    state.bookList = list
  },
  setWrong (state, flag) {
    state.wrong = flag
  }
}
const getters = {
  getName (state) {
    return state.name
  },
  getBookList (state) {
    return state.bookList
  },
  getWrong (state) {
    return state.wrong
  }
}
const actions = {
  getBook ({ state, commit }) {
    commit('setBookList', [])
    NProgress.start()
    return searchByTitle(state.name)
      .then(res => {
        if (!res.data.code) {
          commit('setWrong', false)
          commit('setBookList', res.data.data.data)
          NProgress.done()
        } else {
          commit('setWrong', true)
          NProgress.done()
        }
      })
      .catch(reason => {
        console.log(reason)
        commit('setWrong', true)
        NProgress.done()
      })
  },
  getBookByAuthor ({ state, commit }) {
    NProgress.start()
    commit('setBookList', [])
    return searchByAuthor(state.name)
      .then(res => {
        if (res.data.code !== 1) {
          commit('setWrong', false)
          commit('setBookList', res.data.data.data)
          NProgress.done()
        } else {
          commit('setWrong', true)
          NProgress.done()
        }
      })
      .catch(reason => {
        console.log(reason)
        commit('setWrong', true)
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

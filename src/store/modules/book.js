import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { searchChapter } from '@/api'
const state = () => ({
  bookInfo: {},
  fictionId: String,
  latest: String,
  directory: [],
  count: Number
})
const mutations = {
  setBookInfo (state, list) {
    state.bookInfo = list
  },
  setFictionId (state, id) {
    state.fictionId = id
  },
  setLatest (state, title) {
    state.latest = title
  },
  setDirectory (state, list) {
    state.directory = list
  },
  setCount (state, number) {
    state.count = number
  }
}
const getters = {
  getBookInfo (state) {
    return state.bookInfo
  },
  getFictionId (state) {
    return state.fictionId
  },
  getLatest (state) {
    return state.latest
  },
  getDirectory (state) {
    return state.directory
  },
  getCount (state) {
    return state.count
  }
}
const actions = {
  searchDirectory ({ commit, getters, rootState }) {
    NProgress.start()
    commit('setDirectory', [])
    return searchChapter(getters.getFictionId)
      .then(res => {
        if (!res.data.code) {
          if (rootState.directory.reverse) {
            const list = res.data.data.data
            commit('setDirectory', list.reverse())
          } else {
            commit('setDirectory', res.data.data.data)
          }
          // console.log(getters.getDirectory)
          var length = res.data.data.count
          commit('setCount', length)
          commit('setLatest', res.data.data.data[length - 1].title)
          // console.log(getters.getLatest)
          NProgress.done()
        } else {
          commit('setLatest', '未找到内容')
          NProgress.done()
        }
      })
      .catch(reason => {
        commit('setLatest', '未找到内容')
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

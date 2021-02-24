import { searchContent } from '@/api'
const state = () => ({
  chapterId: String,
  bookIndex: Number,
  contentList: [],
  title: String,
  reverse: false,
  scrool: Number
})
const mutations = {
  setChapterId (state, id) {
    state.chapterId = id
  },
  setBookIndex (state, id) {
    state.bookIndex = id
  },
  setContentList (state, list) {
    state.contentList = list
  },
  setTitle (state, title) {
    state.title = title
  },
  setReverse (state, flag) {
    state.reverse = flag
  },
  setScrool (state, number) {
    state.scrool = number
  }
}
const getters = {
  getChapterId (state) {
    return state.chapterId
  },
  getBookIndex (state) {
    return state.bookIndex
  },
  getContentList (state) {
    return state.contentList
  },
  getTitle (state) {
    return state.title
  },
  getReverse (state) {
    return state.reverse
  },
  getScrool (state) {
    return state.scrool
  }
}
const actions = {
  getBookContent ({ getters, commit }) {
    window.scrollTo(0, 0)
    return searchContent(getters.getChapterId)
      .then(res => {
        if (!res.data.code) {
          // console.log(res.data)
          commit('setContentList', res.data.data.data.content)
        } else {
          commit('setTitle', '获取章节内容失败')
          console.log('失败')
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

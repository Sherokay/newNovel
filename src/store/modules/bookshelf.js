const state = () => ({
  bookMarks: [],
  novelTitle: String
})
// 1.从本地存储获取bookMarks
// 2.将该数组setBookMarks
// 3.在书架展示getBookMarks
// 4.书签更新后，更新setBookMarks+setLocalList
// 小说id，正/倒序，章节index，小说名，章节名，封面
// bookMarks: [
//   {
//     fictionId: '',
//     chapterId: Number,
//     reverse: Boolean,
//     index: Number,
//     novelTitle: '',
//     chapterTitle: '',
//     cover: ''
//   }
// ]
const mutations = {
  setBookMarks (state, list) {
    state.bookMarks = list
  },
  setLocalList (list) {
    window.localStorage.setItem('bookMarks', JSON.stringify(list))
  },
  setNovelTitle (state, title) {
    state.novelTitle = title
  }
}

const getters = {
  getBookMarks (state) {
    return state.bookMarks
  },
  getLocalList () {
    const bookmark = window.localStorage.getItem('bookMarks')
    if (bookmark) {
      return JSON.parse(bookmark).bookMarks
    } else {
      window.localStorage.setItem('bookMarks', [])
      return []
    }
  },
  getNovelTitle (state) {
    return state.novelTitle
  }
}

const actions = {
}

export default {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
}

import { createStore } from 'vuex'
import search from './modules/search'
import book from './modules/book'
import bookshelf from './modules/bookshelf'
import ranklist from './modules/ranklist'
import directory from './modules/directory'
import category from './modules/category'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    search,
    book,
    bookshelf,
    ranklist,
    directory,
    category
  }
})

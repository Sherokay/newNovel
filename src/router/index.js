import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
  },
  {
    path: '/directory',
    name: 'Directory',
    component: () => import(/* webpackChunkName: "directory" */ '../views/Directory.vue')
  },
  {
    path: '/content',
    name: 'Content',
    component: () => import(/* webpackChunkName: "content" */ '../views/Content.vue')
  },
  {
    path: '/bookshelf',
    name: 'BookShelf',
    component: () => import(/* webpackChunkName: "bookshelf" */ '../views/BookShelf.vue')
  },
  {
    path: '/rankinglist',
    name: 'RankingList',
    component: () => import(/* webpackChunkName: "rankinglist" */ '../views/RankingList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

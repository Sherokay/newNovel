import axios from 'axios'
axios.defaults.timeout = 5000
// 1.搜索小说名
export async function searchByTitle (title) {
  return await axios.get('/api/fiction/search/title/' + title)
}
// 2.搜索作者
export async function searchByAuthor (author) {
  return await axios.get('/api/fiction/search/author/' + author)
}
// 3.搜索分类
export async function searchByFictionType (fictionType) {
  return await axios.get('/api/fiction/search/fictionType/' + fictionType + '/1/50')
}
// 4.搜索章节
export async function searchChapter (chapter) {
  return await axios.get('/api/fictionChapter/search/' + chapter)
}
// 5.搜索内容
export async function searchContent (content) {
  return await axios.get('/api/fictionContent/search/' + content)
}
// 获取排名详情
export async function getRankinfo (id) {
  return await axios.get('/rapi/ranking/' + id)
}
// 获取排行榜
export async function getCategories () {
  return await axios.get('/rapi/ranking/gender')
}

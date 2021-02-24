<template>
  <div class="bookshelf">
    <nav>
      <nav-bar title="我的书架"/>
    </nav>
    <section>
      <shelf-list :list="getBookMarks" @tothisbook="toThisBook($event)" @delatebook="delateBook($event)" @continueread="continueRead($event)" />
    </section>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import ShelfList from '../components/ShelfList'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BookShelf',
  components: {
    NavBar,
    ShelfList
  },
  mounted () {
    this.setBookMarks(this.getLocalList)
    this.setBookInfo({})
  },
  computed: {
    ...mapGetters(['getBookMarks', 'getLocalList', 'getDirectory', 'getBookIndex'])
  },
  methods: {
    ...mapMutations(['setBookMarks', 'setLocalList', 'setNovelTitle', 'setFictionId', 'setReverse', 'setBookIndex', 'setTitle', 'setChapterId', 'setBookInfo']),
    ...mapActions(['searchDirectory', 'getBookContent']),
    delateBook (index) {
      var marks = this.getBookMarks
      marks.splice(index, 1)
      this.setBookMarks(marks)
      this.setLocalList(this.getBookMarks)
    },
    toThisBook (index) {
      var fId = this.getBookMarks[index].fictionId
      var title = this.getBookMarks[index].novelTitle
      this.setNovelTitle(title)
      this.setFictionId(fId)
      this.searchDirectory()
      this.$router.push('/directory')
    },
    continueRead (index) {
      var fId = this.getBookMarks[index].fictionId
      var title = this.getBookMarks[index].novelTitle
      var reverse = this.getBookMarks[index].reverse
      var cindex = this.getBookMarks[index].index
      var ctitle = this.getBookMarks[index].chapterTitle
      var cid = this.getBookMarks[index].chapterId
      console.log(title)
      this.setNovelTitle(title)
      this.setFictionId(fId)
      this.searchDirectory()

      this.setReverse(reverse)
      this.setBookIndex(cindex)
      this.setTitle(ctitle)
      this.setChapterId(cid)
      this.getBookContent()
      this.$router.push('/content')
    }
  },
  created () {
    window.addEventListener('beforeunload', () => {
      window.localStorage.setLocalList(this.getBookMarks)
    })
  }
}
</script>

<style lang="less" scoped>
.bookshelf nav {
  padding: 0 1rem;
  background-color: #fff;
}
section {
  margin-top: .6rem;
  background-color: #fff;
}
</style>

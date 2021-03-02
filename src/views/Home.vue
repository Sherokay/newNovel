<template>
  <div class="home">
    <header>
      <router-link to="/">
        <h1>乐<i class="iconfont icon-ya"></i>小说网</h1>
      </router-link>
      <router-link to="/" class="user iconfont icon-yonghu1"></router-link>
      <router-link to="/bookshelf" class="bshelf iconfont icon-shu"></router-link>
    </header>
    <carousel-map :book="books" @tothisbook="toThisBook($event)"/>
    <div class="search">
      <router-link to="/search" class="iconfont icon-sousuo" >搜索</router-link>
    </div>
    <nav>
      <router-link to="/category">
        <i class="iconfont icon-fenlei1"></i>
        <span>分类</span>
      </router-link>
      <router-link to="/rankinglist">
        <i class="iconfont icon-paihangbang1"></i>
        <span>排行榜</span>
      </router-link>
      <router-link to="/" @click="comming">
        <i class="iconfont icon-tupian1"></i>
        <span>漫画</span>
      </router-link>
    </nav>
    <article>
      <section>
        <h3>本期强推</h3>
        <template v-if="bookList.length != 0">
          <book-list-R :booklist="bookList" @tothisbook="toThisBook($event)"/>
        </template>
      </section>
      <section>
        <h3>女频精选</h3>
        <span @click="toRank('woman')">更多></span>
        <book-list :booklist="fminfoList" @tothisbook="toThisBook($event)"/>
      </section>
      <section>
        <h3>男频精选</h3>
        <span @click="toRank('man')">更多></span>
        <book-list :booklist="minfoList" @tothisbook="toThisBook($event)"/>
      </section>
    </article>
    <footer>
      <p>
        copyright © 2099 leya.com
      </p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import CarouselMap from '../components/CarouselMap.vue'
import BookList from '../components/BookList'
import BookListR from '../components/BookListR'
import { getRankinfo } from '../api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    CarouselMap,
    BookList,
    BookListR
  },
  data () {
    return {
      books: [
        { name: '锦乡里', src: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/65aee69463feb4840445af4400da97c9.jpg' },
        { name: '大佬退休之后', src: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/a889c49f9a50dffb806f6d45c58b2153.jpg' },
        { name: '老公每天不一样', src: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/c5b9b0ef3684951a10d4c10192a82c8c.jpg' },
        { name: '娘娘进宫前有喜了', src: 'https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/fbf355851d84992595c36354349ee597.jpg' }
      ],
      bookList: [],
      minfoList: [],
      fminfoList: []
    }
  },
  mounted () {
    getRankinfo('564ef4f985ed965d0280c9c2').then(res => { // 5a6844f8fc84c2b8efaa8bc5
      this.bookList = res.data.ranking.books.slice(0, 10)
    })
    getRankinfo('54d4306c321052167dfb75e4').then(res => {
      this.minfoList = res.data.ranking.books.slice(0, 5)
    })
    getRankinfo('550b836229cd462830ff4d1d').then(res => {
      this.fminfoList = res.data.ranking.books.slice(0, 5)
    })
    this.setBookMarks(this.getLocalList)
  },
  computed: {
    ...mapGetters(['getLocalList'])
  },
  methods: {
    ...mapMutations(['setBookMarks']),
    toThisBook (value) {
      this.$router.push({ name: 'Search', params: { title: value } })
    },
    toRank (value) {
      if (value === 'man') {
        this.$router.push({ name: 'RankingList', params: { sex: 1, rindex: 12 } })
      } else {
        this.$router.push({ name: 'RankingList', params: { sex: 0, rindex: 11 } })
      }
    },
    comming () {
      alert('正在开发……')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  text-align: center;
}
header {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  position: relative;
  background-color: #fff;
  .icon-ya {
    font-size: 1.3rem;
  }
  a.iconfont {
    font-size: 1.2rem;
  }
}
header a h1 {
  font-size: 1.2rem;
  color: #ffa100;
}
header a:first-child {
  position: absolute;
  left: 1rem;
}
header a:nth-child(2) {
  position: absolute;
  right: 4rem;
}
header a:last-child {
  position: absolute;
  right: 1rem;
}
.search {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  padding: 0.5rem 1rem;
}
.search a {
  display: block;
  background-color: #F7F7F7;
  font-size: 0.8rem;
  border-radius: .5rem;
  color: grey;
}
nav {
  height: 4rem;
  background-color: #fff;
  display: flex;
  align-content: center;
}
nav a {
  flex: 1;
  i {
    display: block;
    margin-top: 0.5rem;
  }
}
section {
  margin-top: 0.6rem;
  background-color: #fff;
  padding: 0 1rem;
  position: relative;
  text-align: left;
}
section:last-child {
  margin-bottom: 0.6rem;
}
section h3 {
  font-size: 1rem;
  text-align: left;
  height: 1.5rem;
  padding-top: 0.6rem;
  position: relative;
  margin-left: 0.6rem;
}
section h3::before {
  width: 2px;
  height: 1rem;
  background-color: #ffa100;
  position: absolute;
  content: '';
  left: -0.6rem;
  top: .875rem;
}
section span {
  font-size: 0.7rem;
  color: grey;
  position: absolute;
  top: .75rem;
  right: 1rem;
}
footer {
  background-color: #fff;
  height: 2rem;
  line-height: 2rem;
  font-size: 0.8rem;
  color: grey;
}
</style>

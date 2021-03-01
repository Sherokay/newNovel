<template>
  <div class="rankinglist">
    <nav-bar class="bar" title="排行榜"/>
    <div class="sex">
      <span :class="{current: flag}" @click="manRank">男生</span>
      <span :class="{current: !flag}" @click="womanRank">女生</span>
    </div>
    <article>
      <section class="rankname">
        <ul>
          <li :class="{current1: index === rindex}" v-for="(items,index) in rankList" :key="index" @click="toThisRank(index)">{{items.shortTitle.slice(0,3)}}</li>
        </ul>
      </section>
      <section class="ranklist">
        <book-list :booklist="bookList" @tothisbook="toThisBook($event)"/>
      </section>
    </article>
  </div>
</template>

<script>
import BookList from '../components/BookList'
import NavBar from '../components/NavBar.vue'
import { mapActions, mapGetters } from 'vuex'
import { getRankinfo } from '../api'

export default {
  name: 'RankingList',
  components: {
    BookList,
    NavBar
  },
  data () {
    return {
      flag: false,
      mList: [],
      fList: [],
      bookList: [],
      rankList: [],
      rindex: Number
    }
  },
  computed: {
    ...mapGetters(['getMaleList', 'getFemaleList'])
  },
  methods: {
    ...mapActions(['getRankingList']),
    manRank () {
      this.flag = true
      this.rankList = this.getMaleList
      this.toThisRank(this.rindex)
    },
    womanRank () {
      if (this.rindex > 12) {
        this.rindex = 12
      }
      this.flag = false
      this.rankList = this.getFemaleList
      this.toThisRank(this.rindex)
    },
    toThisRank (index) {
      getRankinfo(this.rankList[index]._id).then(res => {
        this.bookList = res.data.ranking.books.slice(0, 10)
      })
      this.rindex = index
    },
    toThisBook (value) {
      this.$router.push({ name: 'Search', params: { title: value } })
    }
  },
  mounted () {
    const ri = parseInt(this.$route.params.rindex)
    const sex = parseInt(this.$route.params.sex)
    console.log(ri, sex)
    if (ri) {
      this.rindex = ri
    } else {
      this.rindex = 0
    }
    this.getRankingList().then(() => {
      if (sex) {
        this.manRank()
      } else {
        this.womanRank()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.bar {
  padding: 0.5rem 1rem;
  background-color: #fff;
  h2 {
    padding-left: 0;
  }
}
.sex {
  position: absolute;
  top: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  span {
    font-size: 1rem;
    font-weight: 600;
    &:last-child {
      margin-left: 0.5rem;
    }
  }
}
.current {
  color: #ffa100;
}
.current1 {
  border-left: 5px solid #ffa100;
}
article {
  display: flex;
  overflow: hidden;
  margin-top: 0.6rem;
  background-color: #fff;
  .rankname {
    width: 4rem;
    overflow: hidden;
    text-align: center;
    font-size: 0.9rem;
    li {
      overflow: hidden;
      white-space: nowrap;
      margin-top: 1rem;
    }
  }
  .ranklist {
    padding: 0 1rem 0 0.5rem;
    flex: 1;
    overflow: hidden;
  }
}
</style>

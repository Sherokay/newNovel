<template>
  <div class="category">
    <nav-bar class="bar" title="分类"/>
    <article>
      <section class="cname">
        <ul>
          <li :class="{current1: index === cindex}" v-for="(items,index) in clist" :key="index" @click="toThisCate(index)">{{items.title}}</li>
        </ul>
      </section>
      <section class="clist">
        <search-list :list="getCateList" @tothisbook="toThisBook($event)"/>
      </section>
    </article>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import NavBar from '../components/NavBar'
import SearchList from '../components/SearchList'
export default {
  name: 'Category',
  components: {
    NavBar,
    SearchList
  },
  data () {
    return {
      clist: [
        { title: '都市' },
        { title: '穿越' },
        { title: '科幻' },
        { title: '网游' },
        { title: '玄幻' },
        { title: '修真' },
        { title: '言情' },
        { title: '历史' },
        { title: '其他' },
        { title: '竞技' }
      ],
      cindex: Number,
      bookList: [],
      fId: String
    }
  },
  methods: {
    ...mapMutations(['setType', 'setFictionId', 'setBookInfo']),
    ...mapActions(['getCategoriesList']),
    toThisCate (index) {
      this.cindex = index
      this.setType(this.clist[index].title)
      this.getCategoriesList()
    },
    toThisBook (index) {
      this.setBookInfo(this.getCateList[index])
      this.$router.push('/book')
    }
  },
  computed: {
    ...mapGetters(['getCateList'])
  },
  mounted () {
    this.toThisCate(0)
    this.getCategoriesList()
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
article {
  display: flex;
  overflow: hidden;
  margin-top: 0.6rem;
  background-color: #fff;
  .cname {
    width: 3rem;
    margin-right: -0.5rem;
    overflow: hidden;
    text-align: center;
    font-size: 0.9rem;
    li {
      overflow: hidden;
      white-space: nowrap;
      margin-top: 1rem;
    }
  }
  .clist {
    flex: 1;
    overflow: hidden;
  }
}
.current1 {
  border-left: 5px solid #ffa100;
}
</style>

<template>
  <div class="search">
    <div class="bar">
      <select name="type" id="type">
        <option value="title" >小说</option>
        <option value="author">作者</option>
      </select>
      <input type="text" id="input" v-model="title" @keyup.enter="toSearch(title)" placeholder="搜索" autocomplete="off" autofocus class="iconfont icon-sousuo">
      <button @click="goBack">取消</button>
      <i class="iconfont icon-guanbi"  @click="clearTitle"></i>
    </div>
    <search-list v-show="!getWrong" :list="getBookList" @tothisbook="toThisBook($event)"/>
    <section v-show="getWrong" class="notfound">
      <img src="https://qidian.gtimg.com/readnovelm/img/error-e66413d287.svg" alt="404">
      <p>很抱歉，没有找到该资源</p>
      <router-link to="/">返回首页</router-link>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import SearchList from '../components/SearchList'
export default {
  name: 'Search',
  components: {
    SearchList
  },
  data () {
    return {
      title: String
    }
  },
  mounted () {
    document.getElementById('input').focus()
    this.setWrong(false)
    this.title = this.$route.params.title
    if (this.title) {
      this.setName(this.title)
      this.getBook()
      document.getElementById('input').blur()
    }
  },
  computed: {
    ...mapGetters(['getBookList', 'getName', 'getWrong'])
  },
  methods: {
    ...mapMutations(['setName', 'setBookList', 'setBookInfo', 'setWrong']),
    ...mapActions(['getBook', 'getBookByAuthor']),
    toSearch (key) {
      document.getElementById('input').blur()
      var select = document.querySelector('select')
      this.setName(key)
      if (select.children[0].selected) {
        // console.log('小说')
        this.getBook()
      } else {
        // console.log('作者')
        this.getBookByAuthor()
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    toThisBook (index) {
      this.setBookInfo(this.getBookList[index])
      this.$router.push('/book')
    },
    clearTitle () {
      this.title = ''
      document.getElementById('input').focus()
    }
  }
}
</script>

<style lang="less" scoped>
.bar {
  background-color: #fff;
  height: 3rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f7f7f7;
  position: relative;

  select,input,button {
    outline: none;
    height: 2rem;
    line-height: 2rem;
    background-color: #f7f7f7;
    border: none;
    font-size: 0.8rem;
  }
  select {
    border-radius: 5px 0 0 5px;
  }
  input {
    width: 100%;
    padding-left: 0.8rem;
    border-radius: 0 5px 5px 0;
  }
  i {
    position: absolute;
    top: auto;
    right: 4.5rem;
    font-size: 1rem;
  }
  button {
    width: 4rem;
    color: #ffa100;
    background-color: #fff;
  }
}
.notfound {
  text-align: center;
  background-color: #fff;
  padding: 2rem 0;
  img {
    width: 30%;
  }
  p {
    margin: 1rem 0;
    font-size: 1rem;
  }
  a {
    display: inline-block;
    width: 50%;
    height: 2rem;
    line-height: 2rem;
    background-color: #ffa100;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
  }
}
</style>

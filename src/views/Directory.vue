<template>
  <div class="directory">
    <nav-bar :title="getBookInfo.title || getNovelTitle"/>
    <article>
      <section>
        <h3>目录</h3>
        <span v-cloak>共{{getCount}}章</span>
        <span @click="reverseOrder">倒序</span>
      </section>
      <section>
        <ul>
          <li v-for="(v,i) in getDirectory " :key="i" @click="toContent(i,v.title)">{{v.title}}</li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import NavBar from '../components/NavBar.vue'
export default {
  name: 'Directory',
  components: { NavBar },
  data () {
    return {
      title: String
    }
  },
  computed: {
    ...mapGetters(['getDirectory', 'getCount', 'getBookInfo', 'getBookIndex', 'getReverse', 'getScrool', 'getNovelTitle'])
  },
  methods: {
    ...mapMutations(['setDirectory', 'setChapterId', 'setBookIndex', 'setTitle', 'setReverse', 'setScrool', 'setFictionId']),
    ...mapActions(['getBookContent', 'searchDirectory']),
    reverseOrder () {
      this.getDirectory.reverse()
      this.setReverse(!this.getReverse)
      console.log(this.getReverse)
    },
    toContent (index, title) {
      // console.log(window.pageYOffset)
      this.setScrool(window.pageYOffset)
      // console.log(this.getScrool)
      this.setBookIndex(index)
      this.setTitle(title)
      this.setChapterId(this.getDirectory[this.getBookIndex].chapterId)
      this.getBookContent()
      this.$router.push('/content')
    }
  },
  mounted () {
    window.scrollTo(0, this.getScrool)
  }
}
</script>

<style lang="less" scoped>
.directory {
  padding: 0 1rem;
  background-color: #fff;
  text-align: left;
}
section {
  font-size: .875rem;

  h3 {
    color: #ffa100;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ffa100;
    text-align: center;
  }
  span {
    line-height: 3rem;
    text-align: left;
    &:first-of-type {
      font-weight: 700;
    }
    &:last-of-type {
      float: right;
    }
  }
  li {
    line-height: 2.2rem;
    border-bottom: 1px solid rgb(240, 241, 242);
    &:last-of-type {
      border: none;
    }
  }
}
</style>

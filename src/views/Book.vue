<template>
  <div class="book">
    <nav-bar :title="getBookInfo.title"/>
    <article>
      <section>
        <img align="left" :src="getBookInfo.cover" :alt="getBookInfo.title">
        <h2 @click="$emit('tothisbook',index)">{{getBookInfo.title}}</h2>
        <span>{{getBookInfo.author}}</span>
        <span>{{getBookInfo.fictionType}}</span>
        <span>{{getBookInfo.updateTime.slice(0,10)}}</span>
      </section>
      <section>
        <button @click="toRead">开始阅读</button>
        <button @click="addToShelf(getFictionId)">加入书架</button>
      </section>
      <section>
        <p>{{getBookInfo.descs}}</p>
        <div class="mulu" @click="toDirectory">
          <span>目录</span>
          <span><i v-show="getLatest !== '未找到内容'">更新至 </i>{{getLatest}}</span>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Book',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['getBookInfo', 'getLatest', 'getBookIndex', 'getDirectory', 'getBookMarks', 'getFictionId'])
  },
  methods: {
    ...mapMutations(['setFictionId', 'setBookIndex', 'setTitle', 'setChapterId', 'setReverse', 'setScrool', 'setBookMarks', 'setLocalList']),
    ...mapActions(['searchDirectory', 'getBookContent']),
    toRead () {
      if (this.getLatest === '未找到内容') {
        console.log('很抱歉，没有找到该资源!')
        alert('很抱歉，没有找到该资源')
      } else {
        this.setBookIndex(0)
        this.setTitle(this.getDirectory[0].title)
        this.setChapterId(this.getDirectory[this.getBookIndex].chapterId)
        this.getBookContent()
        this.setReverse(false)
        this.$router.push('/content')
        window.scrollTo(0, 0)
      }
    },
    addToShelf (id) {
      var flag = 1
      var marks = this.getBookMarks
      marks.map(item => {
        if (item.fictionId === id) {
          alert('已在书架中')
          flag = 0
        }
      })
      if (flag) {
        var newMark = {
          fictionId: id,
          novelTitle: this.getBookInfo.title,
          cover: this.getBookInfo.cover
        }
        marks.push(newMark)
        this.setBookMarks(marks)
        this.setLocalList(this.getBookMarks)
        alert('加入成功')
      }
    },
    toDirectory () {
      if (this.getLatest === '未找到内容') {
        console.log('很抱歉，没有找到该资源')
        alert('很抱歉，没有找到该资源!')
      } else {
        this.$router.push('/directory')
        window.scrollTo(0, 0)
        this.setScrool(0)
        this.setReverse(false)
      }
    }
  },
  mounted () {
    var fId = this.$route.params.fId
    if (fId) {
      this.setFictionId(fId)
    } else {
      this.setFictionId(this.getBookInfo.fictionId)
    }
    this.searchDirectory()
  }
}
</script>

<style lang="less" scoped>
.book {
  padding: 0 1rem;
  overflow: hidden;
  background-color: #fff;
}
section {
  padding: 0.5rem 0;
  text-align: left;
  img {
    width: 5.25rem;
    height: 7rem;
    margin-right: 0.5rem;
    box-shadow: 0 4px 8px rgba(51,55,61,.1);
  }
  h2 {
    font-size: 1rem;
  }
  span {
    display: block;
    margin: 0.5rem 0;
    font-size: 0.9rem;
  }
  button {
    width: 5rem;
    height: 2rem;
    border: 1px solid #E3E4E6;
    margin-right: 1rem;
    background-color: #fff;
    outline: none;
  }
  .mulu {
    span:first-child {
      display:inline-block;
      font-size: 1rem;
      font-weight: 600;
    }
    span:last-child {
      float: right;
      color: #969ba3;
      max-width: 10rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: .625rem;
    }
  }
  p {
    font-size: 0.9rem;
    line-height: 1.5rem;
    border-top: 1px solid #E3E4E6;
    border-bottom: 1px solid #E3E4E6;
    padding: 0.5rem 0;
    text-indent: 2em;
  }
}

</style>

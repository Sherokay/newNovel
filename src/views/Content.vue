<template>
  <div class="content">
    <h2>{{getTitle}}</h2>
    <p v-for="(v,i) in getContentList" :key="i">{{v.trim()}}</p>
    <i class="iconfont icon-shuqian" @click="addMark(getTitle)" v-show="flag"></i>
    <div class="btn" v-show="flag">
      <button @click="toLast">上一章</button>
      <button @click="toDirectory">目录</button>
      <button @click="toNext">下一章</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Content',
  data () {
    return {
      flag: false
    }
  },
  computed: {
    ...mapGetters(['getContentList', 'getBookInfo', 'getChapterId', 'getBookIndex', 'getDirectory', 'getCount', 'getTitle', 'getReverse', 'getFictionId', 'getBookMarks']),
    ...mapActions(['getBookContent'])
  },
  methods: {
    ...mapMutations(['setBookIndex', 'setChapterId', 'setTitle', 'setContentList', 'setBookMarks', 'setLocalList']),
    toLast () {
      if ((!this.getReverse && !this.getBookIndex) || (this.getReverse && this.getBookIndex === this.getCount - 1)) {
        alert('没有上一章了')
      } else {
        if (this.getReverse) {
          this.setBookIndex(this.getBookIndex + 1)
          console.log(this.getBookIndex)
        } else {
          this.setBookIndex(this.getBookIndex - 1)
          console.log(this.getBookIndex)
        }
        this.setTitle(this.getDirectory[this.getBookIndex].title)
        this.setChapterId(this.getDirectory[this.getBookIndex].chapterId)
        this.getBookContent()
      }
    },
    toNext () {
      if ((!this.getReverse && this.getBookIndex === this.getCount - 1) || (this.getReverse && !this.getBookIndex)) {
        alert('没有下一章了')
      } else {
        if (this.getReverse) {
          this.setBookIndex(this.getBookIndex - 1)
        } else {
          this.setBookIndex(this.getBookIndex + 1)
        }
        console.log(this.getBookIndex)
        this.setTitle(this.getDirectory[this.getBookIndex].title)
        this.setChapterId(this.getDirectory[this.getBookIndex].chapterId)
        this.getBookContent()
      }
    },
    toDirectory () {
      this.$router.push('/directory')
    },
    addMark (title) {
      var flag = 1
      var marks = this.getBookMarks
      // console.log(marks)
      marks.map(item => {
        if (item.fictionId === this.getFictionId) {
          item.reverse = this.getReverse
          item.index = this.getBookIndex
          item.chapterTitle = title
          item.chapterId = this.getChapterId
          alert('更新书签成功')
          flag = 0
        }
      })
      if (flag) {
        var newMark = {
          fictionId: this.getFictionId,
          chapterId: this.getChapterId,
          reverse: this.getReverse,
          index: this.getBookIndex,
          novelTitle: this.getBookInfo.title,
          chapterTitle: this.getTitle,
          cover: this.getBookInfo.cover
        }
        // console.log(newMark)
        marks.push(newMark)
        alert('加入成功')
      }
      this.setBookMarks(marks)
      this.setLocalList(this.getBookMarks)
    }
  },
  mounted () {
    var content = document.querySelector('.content')
    content.addEventListener('click', () => {
      this.flag = !this.flag
    })
  }
}
</script>

<style lang="less" scoped>
.content {
  text-align: left;
  padding: 1rem;
  background-color: #CEE8CF;
  color: #1D1B17;
  padding-bottom: 2rem;
  i {
    position: fixed;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    color: green;
  }
  h2 {
    padding: 1rem 0;
    text-align: center;
  }
  p {
    text-indent: 2em;
    font-size: 1.125rem;
    line-height: 2rem;
  }
  .btn {
    position: fixed;
    bottom: 40%;
    left: 0;
    width: 100%;
    text-align: center;
    button {
      margin: 0.5rem;
      line-height: 1.5rem;
      width: 20%;
      outline: none;
      border: 1px solid green;
      background-color: #CEE8CF;
      border-radius: 8px;
      color: green;
    }
  }
}
</style>

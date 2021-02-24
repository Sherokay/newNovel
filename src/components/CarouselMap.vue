<template>
  <div class="carousel">
    <ul>
      <li v-for="(item,index) in book" :key="index" @click='$emit("tothisbook",item.name)'><img :src="item.src" :alt="item.name"></li>
    </ul>
    <ol>
      <li v-for="index in book" :key="index"></li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'CarouselMap',
  props: {
    book: Array // [{src:'图片地址',name:'小说名'}]
  },
  data () {
    return {
      bindex: Number
    }
  },
  mounted () {
    this.bindex = 0
    var ul = document.querySelector('ul')
    ul.style.width = this.book.length * 100 + '%'
    document.querySelector('ol').querySelector('li').className = 'current'
    // 自动播放轮播图
    var timer = setInterval(() => {
      this.bindex++
    }, 2000)
    // 根据手指滑动切换轮播图
    var startX = 0
    var moveX = 0
    var w = ul.querySelector('li').offsetWidth
    ul.addEventListener('touchstart', e => {
      clearInterval(timer)
      startX = e.targetTouches[0].pageX
    })
    ul.addEventListener('touchmove', e => {
      moveX = e.targetTouches[0].pageX - startX
      // 图片跟随手指滑动
      ul.style.transform = 'translatex(' + (-this.bindex * w + moveX) + 'px)'
    })
    ul.addEventListener('touchend', e => {
      // 移动大于50才切换轮播图
      if (Math.abs(moveX) > 50) {
        if (moveX > 0) {
          this.bindex--
        } else {
          this.bindex++
        }
      } else {
        // 否则还原原来位置
        ul.style.transform = 'translatex(' + -this.bindex * w + 'px)'
      }
      // 触摸结束后开启轮播
      timer = setInterval(() => {
        this.bindex++
      }, 2000)
    })
  },
  watch: {
    bindex (value) {
      var flag = 1 // 判断是否开启过渡 两边切换时关闭过渡
      if (value > this.book.length - 1) {
        value = 0
        this.bindex = value
        flag = 0
      } else if (value < 0) {
        value = this.book.length - 1
        this.bindex = value
        flag = 0
      }
      var ul = document.querySelector('ul')
      var w = ul.querySelector('li').offsetWidth
      var transw = -value * w
      if (flag) {
        ul.style.transition = 'all 0.5s'
      } else {
        ul.style.transition = 'none'
      }
      flag = 1
      ul.style.transform = 'translateX(' + transw + 'px)'
      var ol = document.querySelector('ol')
      ol.querySelector('.current').className = ''
      ol.querySelectorAll('li')[value].className = 'current'
    }
  }
}
</script>
<style scoped>
  .carousel {
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: #fff;
  }
  ul {
    display: flex;
  }
  ul li {
    flex: 1;
    padding: 0 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
  }
  ol {
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
  }
  ol li {
    float: left;
    margin: 0 0.1rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #f6f7f9;
  }
  .current {
    background-color: #ffa100;
  }
</style>

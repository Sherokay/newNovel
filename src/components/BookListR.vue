<template>
  <div class="booklistr">
    <ul>
      <li v-for="(item,index) in booklist" :key="index">
        <img align="left" :src="'http://statics.zhuishushenqi.com'+item.cover" :alt="item.title">
        <h4 @click="$emit('tothisbook',item.title)">{{item.title}}</h4>
        <span>{{item.author}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookListR',
  props: {
    booklist: []
  },
  mounted () {
    const length = this.booklist.length
    var ul = document.querySelector('.booklistr').querySelector('ul')
    const w = ul.querySelector('li').offsetWidth
    ul.style.width = length * w + 5 + 'px'

    var startX = 0
    var moveX = 0
    var totalX = 0
    ul.addEventListener('touchstart', e => {
      startX = e.targetTouches[0].pageX
    })
    ul.addEventListener('touchmove', e => {
      moveX = e.targetTouches[0].pageX - startX
      if (totalX + moveX > 0) { // 判断最左边界
        totalX = moveX = 0
      } else if (totalX + moveX < -(length * w - document.body.clientWidth + 32)) { // 判断最右边界
        totalX = -(length * w - document.body.clientWidth + 32)
        moveX = 0
      }
      ul.style.transform = 'translatex(' + (totalX + moveX) + 'px)'
      // console.log('move' + moveX)
    })
    ul.addEventListener('touchend', e => {
      totalX += moveX
      // console.log('end' + totalX)
    })
  }
}
</script>

<style scoped>
.booklistr {
  overflow: hidden;
}
ul {
  overflow: hidden;
}
ul li {
  float: left;
  width: 5.125rem;
  padding: .5rem;
  padding-top: 1rem;
  box-sizing: border-box;
}
img {
  width: 4.125rem;
  height: 5.5rem;
  margin-right: 0.5rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}
h4 {
  width: 4.125rem;
  font-size: .8125rem;
  font-weight: 500;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: clip;
  margin: 0.5rem 0;
  padding-top: 0.5rem;
}
span {
  font-size: 0.75rem;
  color: #808080;
}
</style>

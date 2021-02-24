<template>
  <div class="booklist">
    <ul>
      <li v-for="(item,index) in booklist" :key="index">
        <img align="left" :src="'http://statics.zhuishushenqi.com'+item.cover" :alt="item.title">
        <h4 @click="$emit('tothisbook',item.title)">{{item.title}}</h4>
        <p>{{item.shortIntro}}</p>
        <i class="iconfont icon-yonghu"></i><span>{{item.author}}</span>
        <span>
          <em>{{item.minorCate}}</em>
          <em>{{item.retentionRatio}}</em>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    booklist: []
  }
}
</script>

<style scoped>
li {
  position: relative;
  height: 5.625rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}
li i.iconfont {
  font-size: 1rem;
}
li:last-child {
  border: none;
}
img {
  width: 4.125rem;
  height: 5.5rem;
  margin-right: 0.5rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}
h4 {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: text-top;
}
p {
  font-size: 0.8125rem;
  margin: 5px 0;
  color: grey;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
span:last-of-type {
  float: right;
}
span em {
  display: inline-block;
  color: #ffa100;
  border: 1px solid #ffa100;
  transform: scale(0.8);
  font-style: normal;
  vertical-align: middle;
  height: 1rem;
  padding: 1px;
}
</style>

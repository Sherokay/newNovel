<template>
  <div class="searchlist">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img align="left" :src="item.cover" :alt="item.title">
        <h4 @click="$emit('tothisbook',index)">{{item.title}}</h4>
        <p>{{item.descs}}</p>
        <i class="iconfont icon-yonghu"></i><span>{{item.author}}</span>
        <span>{{item.fictionType}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  props: {
    list: []
  }
}
</script>

<style scoped>
ul {
  text-align: left;
  background-color: #fff;
  padding: 0 1rem;
}
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
  width: 9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 600;
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
  color: #ffa100;
  border: 1px solid #ffa100;
  transform: scale(0.8);
  padding: 1px;
}
</style>

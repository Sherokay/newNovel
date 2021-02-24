<template>
  <div class="shelflist">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img align="left" :src="item.cover" :alt="item.novelTitle">
        <h4 @click="$emit('tothisbook',index)">{{item.novelTitle}}</h4>
        <p @click="$emit('continueread', index)">{{item.chapterTitle}}</p>
        <span @click="$emit('delatebook',index)" class="iconfont icon-shanchu"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShelfList',
  props: {
    list: []
  }
}
</script>

<style lang="less" scoped>
.shelflist {
  overflow: hidden;
  position: relative;
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
    cursor: pointer;
    font-weight: 600;
  }
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px 0;
    font-size: 1rem;
    line-height: 2rem;
  }
  span {
    position: absolute;
    right: 1rem;
  }
}
</style>

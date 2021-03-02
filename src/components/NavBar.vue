<template>
  <div class="navbar">
    <span @click="goBack" class="iconfont icon-fanhui"></span>
    <h2>{{title}}</h2>
    <div class="bar">
      <router-link to="/search" class="iconfont icon-sousuo"></router-link>
      <span @click="showMenu" class="iconfont icon-caidan"></span>
    </div>
    <div class="menu" v-show="show">
      <div class="items">
        <router-link to="/" class="iconfont icon-zhuye"></router-link>
        <router-link to="/" class="iconfont icon-fenlei1"></router-link>
        <router-link to="/rankinglist" class="iconfont icon-paihangbang1"></router-link>
      </div>
      <router-link to="/bookshelf">我的书架</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: String
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    showMenu () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 3rem;
  }
  h2 {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: left;
    font-size: 0.9rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
  }
  .bar {
    a {
      margin-right: 1rem;
    }
  }
}
.menu {
  z-index: 9;
  position: fixed;
  top: 3rem;
  width: 100%;
  left: -1rem;
  padding: 0 1rem 1rem;
  background-color: #fff;
  text-align: center;

  &>a {
    display: inline-block;
    width: 80%;
    height: 2rem;
    line-height: 2rem;
    background-color: #ffa100;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
  }
}
.items {
  display: flex;
  align-items: center;
  height: 5rem;
  a {
    flex: 1;
    margin: 0 0.5rem;
    background-color: #fff;
  }
}

</style>

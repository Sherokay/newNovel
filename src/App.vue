<template>
  <button id="top" v-show="display" @click="toTop" class="iconfont icon-shang"></button>
  <router-view/>
</template>

<script>
export default {
  data: function () {
    return {
      display: false
    }
  },
  mounted: function () {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > window.innerHeight) {
        this.display = true
      } else {
        this.display = false
      }
    })
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
#top {
  z-index: 1;
  position: fixed;
  right: 1rem;
  bottom: 3rem;
  width: 3rem;
  height: 3rem;
  background-color: rgba(0, 0, 0, .3);
  border: 0;
  color: #fff;
  border-radius: 50%;
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div id="app">
    <g-head></g-head>
    <router-view/>
    <g-foot></g-foot>
  </div>
</template>
<script>
import GHead from '@/layout/Head'
import GFoot from '@/layout/Foot'
export default {
  components: {
    GHead,
    GFoot
  }
}
</script>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.main{
  flex: 1;
}
</style>

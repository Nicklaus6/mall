<template>
  <div class="wrapper"
       ref="">
    <ul class="content">
      <li v-for="(item,i) in 100"
          :key="i">{{item}}haha</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll('.wrapper', {
      probeType: 3,
      pullUpLoad: true,

    })
    this.scroll.on('scroll', (position) => {
      console.log(position)
    })
    this.scroll.on('pullingUp', () => {
      console.log('pullingUp')
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 1500px;
  background-color: pink;
}
</style>
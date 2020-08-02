<template>
  <div>
    <scroll class="content">
      <ul>
        <li v-for="(item,i) in 100"
            :key="i">{{item}}Profile</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Profile',
  components: {
    Scroll,
  }
}
</script>

<style scoped>
.content {
  height: 300px;
  background-color: hotpink;
  overflow: hidden;
}
</style>
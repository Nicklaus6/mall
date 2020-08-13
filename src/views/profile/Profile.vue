<template>
  <div>
    <scroll class="content">
      <ul>
        <li v-for="(item, i) in 100"
            :key="i">{{ item }}Profile</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

export default {
  name: 'Profile',
  components: {
    Scroll,
  },
};
</script>

<style scoped>
.content {
  height: 500px;
  background-color: rgb(243, 165, 204);
  overflow: hidden;
}
</style>

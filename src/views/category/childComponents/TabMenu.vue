<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item,index) in categories"
           :key="index"
           @click="itemClick(index)"
           :class="{active: index === currentIndex}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
#tab-menu {
  height: calc(100vh - 44px - 49px);
  width: 100px;
  background-color: #f6f6f6;
  box-sizing: border-box;
}
.menu-list-item {
  text-align: center;
  color: #666;
  height: 45px;
  line-height: 45px;
}
.menu-list-item.active {
  color: var(--color-tint);
  background-color: #fff;
  font-weight: 700;
  border-left: 3px solid var(--color-high-text);
}
</style>
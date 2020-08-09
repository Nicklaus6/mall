<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll">
      <!-- 商品的列表 -->
      <cart-list />

      <!-- 底部汇总 -->
      <cart-bottom-bar />

    </scroll>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.cart {
  height: 100vh;
}

.content {
  min-height: calc(100vh - 50px);
  overflow: hidden;
}
</style>

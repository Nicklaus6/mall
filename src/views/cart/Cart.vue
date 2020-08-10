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

    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />

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
}

.cart {
  /* 运算符前后一定要加空格！！ */
  height: calc(100vh - 44px - 40px - 49px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>

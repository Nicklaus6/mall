<template>
  <div class="cart-list">
    <cart-list-item v-for="(item, index) in cartList"
                    :key="index"
                    :product="item" />
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
/* .cart {
  height: 100vh;
}

.content {
  height: 100%;
} */
</style>
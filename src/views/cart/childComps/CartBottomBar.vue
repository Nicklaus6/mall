<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate"
         @click="calcClick">
      去计算({{checkLength}})
    </div>

  </div>

</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if (!this.cartList.length) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //有部分或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 49px;
  left: 0;

  display: flex;
  /* 默认情况下的块级盒模型的宽度就是100% 绝对定位后脱离标准文档流（相对定位没有 所以没被挤压） 块级元素失效 所以给flex的元素设置宽度100%即可 */
  width: 100%;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  text-align: center;
  background-color: rgb(255, 156, 64);
  color: #fff;
}
</style>
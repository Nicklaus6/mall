<template>
  <div class="item-box"
       v-if="subcategories.list">
    <div class="item"
         v-for="(item,index) in subcategories.list"
         :key="index">
      <a class="item-link"
         :href="item.link">
        <img class="item-image"
             :src="item.image"
             alt="">
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Object,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
/* .item-box :nth-child(2n + 1) {
  margin-left: 10px;
} */
.item {
  width: 10vh;
  /* 发现设置 margin-right:0去不掉是因为这是浏览器的展示 margin 基于块状元素特点占了整行。设置 display:inline-block 即可 */
  display: inline-block;
  margin: 20px 40px 0 0;
}
.item-image {
  width: 100%;
}
.item-title {
  font-size: 14px;
  text-align: center;
}
</style>
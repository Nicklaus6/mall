<template>
  <div v-if="subcategories.list">
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
.item {
  width: 50%;
  /* 发现设置 margin-right:0去不掉是因为这是浏览器的展示 margin 基于块状元素特点占了整行。设置 display:inline-block 即可 */
  display: inline-block;
  margin: 10px 0;
}
.item-link {
  display: inline-block;
  text-align: center;
}
.item-image {
  width: 50%;
  /* 因为父容器a标签是行内元素 所以 给 img 设置text-align: center;无效 */
}
.item-title {
  font-size: 14px;
}
</style>
<template>
  <div id="list">
    <div class="list-item"
         v-for="(item, index) in listData"
         :key="index">
      <img :src="item.img"
           alt="">
      <span class="list-info">{{item.info}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
}
</script>

<style scoped>
#list {
  background-color: #fff;
  margin-bottom: 20px;
}
.list-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  border-bottom: 3px solid #f2f2f2e1;
}
.list-item img {
  width: 5%;
  margin-right: 8px;
}
.list-item .list-info {
  font-size: 12px;
}
</style>
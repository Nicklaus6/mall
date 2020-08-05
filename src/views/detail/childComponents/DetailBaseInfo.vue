<template>
  <div v-if="Object.keys(goods).length !==0"
       class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <div class="n-price">{{goods.newPrice}}</div>
      <div class="o-price">{{goods.oldPrice}}</div>
      <span v-if="goods.discount"
            class="discount">
        {{goods.discount}}
      </span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item"
            v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.base-info {
  margin-top: 15px;
  width: 100%;
  padding: 0 10px;
  color: #999999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #333;
  font-size: 18px;
  margin-bottom: 10px;
}
.info-price .n-price {
  font-size: 28px;
  color: #ff5777;
  float: left;
}
.info-price .o-price {
  text-decoration: line-through;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
}
.info-price .discount {
  float: left;
  margin-left: 5px;
  margin-top: 8px;
  border-radius: 5px;
  background-color: #ff5777;
  color: #fff;
  font-size: 12px;
  padding: 2px;
}
.info-other {
  margin-top: 62px;
  display: flex;
  justify-content: space-between;
}
.info-service {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.info-service-item img {
  position: relative;
  top: 2px;
  width: 14px;
  height: 14px;
}
.info-service-item span {
  font-size: 13px;
  margin-left: 5px;
  color: #333333;
}
</style>
<template>
  <div id='detail'
       class="detail-nav">
    <detail-nav-bar />
    <scroll class="content">
      <detail-swiper :top-images='topImages' />
      <detail-base-info :goods='goods' />
      <detail-shop-info :shop='shop' />
      <detail-shop-info :detail-info='detailInfo' />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailImagesInfo from './childComponents/DetailImagesInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop } from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}
    }
  },
  created () {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result
      console.log(data)

      // 2.获取顶部的图片轮播
      this.topImages = data.itemInfo.topImages

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1000;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
.content {
  /* height: calc(100%-44px); */
  height: 100%;
}
</style>
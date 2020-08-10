<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav" />
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probeType="3">

      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-images-info :images-info="detailInfo"
                          @imgLoad="imgLoad" />
      <detail-param-info ref="params"
                         :paramInfo="paramInfo" />
      <detail-comment-info ref="comment"
                           :commentInfo="commentInfo" />
      <goods-list ref="recommend"
                  :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick"
              v-show="isShowBackTop" />
    <!-- <toast :message="message"
           :show="show" /> -->
  </div>
</template>

<script>

import DetailNavBar from './childComponents/DetailNavBar';
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import DetailImagesInfo from './childComponents/DetailImagesInfo';
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from 'network/detail';
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created () {
    // minin查错打印 
    // console.log(backTopMixin)

    // 1.保存传入的 iid
    this.iid = this.$route.params.iid;

    // 2.根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result;
      // console.log(data);

      // 2.获取顶部的图片轮播
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo);

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 6.获取参数数据
      this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

      // 7.获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)

      console.log(this.themeTopYs)
    })
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad () {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400)
    },
    contentScroll (position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值做对比
      // [0, 8422, 9344, 9581,Number.MAX_VALUE]

      // positionY在 0-8422 之间 index=0
      // positionY在 8422-9344 之间 index=1
      // positionY在 9344-9581 之间 index=2

      // positionY在 9581和很大的值之间 index=3

      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.listenShowBackTop(position)
    },
    addToCart () {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid

      // 2.将商品添加到购物车 (1. Promise 2. mapActions)
      // this.$store.dispatch('addCart',product)
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })

    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1001;
  background-color: #fff;
  height: calc(100vh - 44px - 50px);
}
.detail-nav {
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
.content {
  height: 100%;
  /* 清空溢出部分 */
  overflow-x: hidden;
}
</style>

<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem">
      </tab-menu>

      <scroll id="tab-content"
              @scroll="contentScroll"
              ref="scroll"
              :probe-type="3">
        <tab-content-category :subcategories="showSubcategories"></tab-content-category>
        <tab-control :titles="['综合','新品','销量']"
                     @tabClick="tabClick" />
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>

      </scroll>
      <back-top @click.native="backClick"
                v-show="isShowBackTop" />
    </div>

  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'

import TabMenu from './childComponents/TabMenu'
import TabContentCategory from './childComponents/TabContentCategory'
import TabContentDetail from './childComponents/TabContentDetail'

import { getCategory, getSubcategories, getCategoryDetail } from 'network/category'

import { backTopMixin } from 'common/mixin'
import { BACK_POSITION } from 'common/const'

export default {
  name: 'Category',
  components: {
    NavBar,
    Scroll,
    TabControl,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [backTopMixin],
  data () {
    return {
      categories: [],
      categoryData: {},
      currentIndex: 1,
      currentType: 'pop',
    };
  },
  created () {
    // 请求分类数据
    this._getCategory()
  },
  computed: {
    showSubcategories () {
      if (!this.categoryData[this.currentIndex]) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail () {
      if (!this.categoryData[this.currentIndex]) return []
      // this.categoryData[this.currentIndex] undefined?? 因为computed在created之前就执行了 还没有数据
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory () {
      getCategory().then(res => {
        // 1.获取categories的数据
        this.categories = res.data.category.list
        // 2.初始化每个类的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }

        this._getSubcategories(0)
      })
    },
    _getSubcategories (index) {
      this.currentIndex = index
      // 1.获取请求的 maitKey
      const maitKey = this.categories[index].maitKey
      // 2.发送请求，传入maitKey
      getSubcategories(maitKey).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail (type) {
      // 1.获取请求的 miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求 传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
    },
    selectItem (index) {
      this._getSubcategories(index)
    },
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default: break
      }
    },
    contentScroll (position) {
      // 判断 BackTop是否显示
      this.isShowBackTop = -position.y > BACK_POSITION;
      console.log(position)
    },
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  display: flex;
}

#tab-content {
  flex: 1;
  height: calc(100vh - 44px - 49px);
}
</style>

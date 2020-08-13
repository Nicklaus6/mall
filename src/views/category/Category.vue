<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories">
      </tab-menu>

      <scroll id="tab-content">
        <tab-content-category :subcategories="showSubcategories"></tab-content-category>
      </scroll>
    </div>

  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import Scroll from 'components/common/scroll/Scroll'
import TabMenu from './childComponents/TabMenu'
import TabContentCategory from './childComponents/TabContentCategory'

import { getCategory, getSubcategories } from 'network/category'

export default {
  name: 'Category',
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory
  },
  data () {
    return {
      categories: [],
      categoryData: {},
      currentIndex: 0
    };
  },
  created () {
    this._getCategory()
  },
  computed: {
    showSubcategories () {
      return
    }
  },
  methods: {
    _getCategory () {
      getCategory().then(res => {
        console.log(res.data.category.list)

        // 1.保存categories的数据
        this.categories = res.data.category.list
        // 2.初始化每个类的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {}
          }
        }

        this._getSubcategories(0)
      })
    },
    _getSubcategories (index) {
      this.currentIndex = index
      // 获取maitKey
      const maitKey = this.categories[index].maitKey
      console.log(maitKey)
      getSubcategories(maitKey).then(res => {
        console.log(res.data)
        this.categoryData[index].subcategories = res.data

      })
    }
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
/* 
.tab-menu {
  width: 20%;
  background-color: orange;
  float: left;
}
#tab-content {
  width: 80%;
  height: calc(100vh - 44px - 49px);
  float: right;
  background-color: orange;
} */
</style>

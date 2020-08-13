<template>
  <div id="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories">
      </tab-menu>

      <scroll id="tab-content">
        <tab-content-category></tab-content-category>
      </scroll>
    </div>

  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import Scroll from 'components/common/scroll/Scroll'
import TabMenu from './childComponents/TabMenu'
import TabContentCategory from './childComponents/TabContentCategory'

import { getCategory } from 'network/category'

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
      categories: []
    };
  },
  created () {
    this._getCategory()
  },
  methods: {
    _getCategory () {
      getCategory().then(res => {
        console.log(res.data.category.list)
        console.log(res.data.category)

        // 1.保存categories的数据
        this.categories = res.data.category.list

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

<template>
  <div>
    <li v-for="(item, i) in 100"
        :key="i">right{{i}}
    </li>
    <div class="item"
         v-for="(item, index) in subcategories.list"
         :key="index">
      {{item}}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
</style>
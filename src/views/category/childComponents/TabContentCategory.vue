<template>
  <div>
    <li v-for="(item, i) in 100"
        :key="i">right{{i}}
    </li>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory"
}
</script>

<style>
</style>
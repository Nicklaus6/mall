<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import UserInfo from './childComponents/UserInfo'

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>

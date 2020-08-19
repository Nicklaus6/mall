<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <div slot="center">我的档案</div>
    </nav-bar>

    <user-info />

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span>0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span>0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>

    </section>

    <list-view class="order-list"
               :list-data="orderList"></list-view>
    <list-view class="service-list"
               :list-data="serviceList"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import UserInfo from './childComponents/UserInfo'
import ListView from './childComponents/ListView'

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    ListView
  },
  data () {
    return {
      orderList: [
        {
          // 动态绑定img的src需要用require包裹
          img: require('@/assets/img/profile/message.svg'),
          info: '我的消息'
        },
        {
          img: require('@/assets/img/profile/pointer.svg'),
          info: '积分商城'
        },
        {
          img: require('@/assets/img/profile/vip.svg'),
          info: '会员卡'
        }
      ],
      serviceList: [
        {
          img: require('@/assets/img/profile/cart.svg'),
          info: '我的购物'
        },
        {
          img: require('@/assets/img/profile/shopping.svg'),
          info: '下载购物'
        }
      ]
    }
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2e1;
  height: 100vh;
}

.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.account {
  background-color: #fff;
  display: flex;
  padding: 15px 0 20px;
  margin-bottom: 10px;
}
.account .account-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #333;
}
.account-item .number {
  margin-bottom: 5px;
}
.account-item .number span {
  color: #ff7829e1;
  font-size: 20px;
  font-weight: 700;
}
</style>

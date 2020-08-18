<template>
  <div id="user-info">
    <div class="left">
      <img src="@/assets/img/profile/avatar.svg"
           alt="">
    </div>

    <div class="center">
      <p>登陆/注册</p>
      <div class="phone">
        <img src="@/assets/img/profile/phone.svg"
             alt="">
        <p>暂无绑定手机号</p>
      </div>
    </div>

    <div class="right">
      <img src=""
           alt="">
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  display: flex;
}
.left {
  float: left;
  width: 23%;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px;
}
.left img {
  width: 100%;
}
.center {
  margin-top: 30px;
  width: 20%;
  color: #fff;
}
.center img {
  width: 8%;
}
.center .phone {
  display: flex;
  margin-top: 6px;
}
.center .phone p {
  font-size: 12px;
}
</style>
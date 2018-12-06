<template>
  <div class="undefine">
    <img src="../../assets/common/404.png" />
    <p class="tips">Sorry! The page you visited does not exist</p>
  </div>
</template>

<style lang="scss" scoped>
.undefine{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 250px;
  left: 0;
  img{
    width: 285px;
  }
  .tips{
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #B3B3B3;
    margin: 20px 0 0;
  }
}
</style>

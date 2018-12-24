<template>
  <div class="home">
    <div class="wrapper">
      <h1>Welcome to Efox!</h1>
      <div class="btn">
        <div class="btn-toast" @click="showToast">show Toast</div>
        <div class="btn-toast" @click="showLoading">show Loading</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  computed: {
    toastOptionStyle () {
      return {
        backgroundColor: 'rgb(112, 187, 206)',
        width: '200px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '80%',
        left: '50%'
      }
    },
    loadingBackground () {
      return {
        backgroundColor: 'rgba(247, 200, 208, .4)'
      }
    },
    loadingStyle () {
      return {}
    },
    tipsStyle () {
      return {
        color: '#000000'
      }
    }
  },
  methods: {
    showToast () {
      this.$toast("I'm a toast", 2500, this.toastOptionStyle, 'none', false)
    },
    showLoading () {
      this.$loading('加载中', '', this.loadingBackground, this.loadingStyle, this.tipsStyle)
      setTimeout(() => {
        this.$loading('', 'close')
      }, 2500)
    }
  },
  mounted () {
    // this.$toast.center('sss')
    // this.$loading.open('加载中...')
  },
  beforeCreate () {
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/var.scss';
.home{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper{
    width: 100%;
    margin: 0 auto;
    h1{
      font-size: 50px;
      text-align: center;
      line-height: 200px;
    }
    .btn{
      display: flex;
      justify-content: space-around;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      line-height: 80px;
      .btn-toast{
        padding: 0 20px;
        min-width: 200px;
        height: 80px;
        border-radius: 20px;
        background: rgb(112, 187, 206);
        cursor: pointer;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="wrapper">
      <h1>Welcome to Efox!</h1>
      <div class="btn">
        <div class="btn-toast" @click="showToast">show Toast</div>
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
    }
  },
  methods: {
    showToast () {
      this.$toast("I'm a toast", 2500, this.toastOptionStyle, 'none', true)
    }
  },
  mounted () {
    // this.$toast.center('sss')
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
        width: 200px;
        height: 80px;
        border-radius: 20px;
        background: rgb(112, 187, 206);
        cursor: pointer;
      }
    }
  }
}
</style>

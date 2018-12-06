<template>
  <div class="home">
    <div class="wrapper">
      <h1>Welcome to Efox!</h1>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  methods: {
  },
  mounted () {
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
    width: 1212px;
    margin: 0 auto;
    h1{
      font-size: 50px;
      text-align: center;
      line-height: 200px;
    }
  }
}
</style>

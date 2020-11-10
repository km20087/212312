<template>
  <div>
    <div v-show="deltab" ref="deltab" @click="suredel">删除</div>
    <div
      class="banner"
      @touchstart.prevent="gotouchstart"
      @touchmove.prevent="gotouchmove"
      @touchend.prevent="gotouchend"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "longdurationPress",
  data() {
    return {
      deltab: false,
    };
  },
  methods: {
    suredel() {
      let that = this;
      console.log("delete");
      that.deltab = !that.deltab;
    },
    gotouchstart(e) {
      let that = this;
      clearTimeout(that.timeOutEvent); //清除定时器
      that.timeOutEvent = 0;
      that.timeOutEvent = setTimeout(function () {
        //执行长按要执行的内容，
        console.log("长按");
        that.deltab = !that.deltab;
        that.$refs.deltab.style.position = "absolute";
        that.$refs.deltab.style.zIndex = "1000";
        that.$refs.deltab.style.top = `${e.targetTouches[0].clientY}px`;
        that.$refs.deltab.style.left = `${e.targetTouches[0].clientX}px`;
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      let that = this;
      clearTimeout(that.timeOutEvent);
      if (that.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
        // that.deltab = !that.deltab;
        console.log("gotouchend");
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      let that = this;
      clearTimeout(that.timeOutEvent); //清除定时器
      console.log("gotouchmove");
      that.timeOutEvent = 0;
    },
  },
};
</script>
<style lang="less" scoped>
.banner {
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
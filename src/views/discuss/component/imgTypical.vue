<template>
  <div>
    <img src="" alt="" />
    <img
      :src="pic"
      alt="CSS新世界封面"
      onerror="this.classList.add('error');"
      class="imgsize"
    />
  </div>
</template>
<script>
export default {
  name: "imgTypical",
  props: {
    pic: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pic2: "../../../assets/logo1.png",
    };
  },
};
</script>
<style lang="less" scoped>
img.error {
  width: 100%;
  height: 100%;
  display: inline-block;
  transform: scale(1);
  content: "";
  color: transparent;
}
img.error::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5 url("./break.svg") no-repeat center / 50% 50%;
}
img.error::after {
  content: attr(alt);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 2;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.div1 {
  width: 100px;
  height: 100px;
}
.imgsize {
  max-height: 100px;
  max-width: 100px;
}
</style>
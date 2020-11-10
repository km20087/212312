<template>
  <div class="box1">
    <editor-bar
      v-model="detail"
      :isClear="isClear"
      @change="change"
    ></editor-bar>
    <!-- <button @click="submitconn"></button> -->
  </div>
</template>  
<script>
import EditorBar from "./editor.vue";
export default {
  components: { EditorBar },
  data() {
    return {
      test: "",
      isClear: false,
      detail: "",
      content1: "",
    };
  },
  methods: {
    change(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="less" scoped>
.box1 {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style> 
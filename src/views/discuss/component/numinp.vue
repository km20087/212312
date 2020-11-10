<template>
  <div>
    <el-input type="text" v-model="cont" @input="shuru"> </el-input>
    <Alert type="error" show-icon v-if="alertFlag">请输入数字</Alert>
  </div>
</template>
<script>
export default {
  name: "numInp",
  props: {
    con: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      cont: this.con,
      alertFlag: false,
    };
  },
  methods: {
    shuru() {
      this.alertFlag = false;
      let exp = new RegExp(/[^\d^\.%]/g);
      let flag = exp.test(this.cont);
      this.cont = this.cont.replace(/[^\d^\.%]/g, "");
      this.$emit("chuancan", this.cont); //chuancan子向父传参
      if (flag) {
        this.alertFlag = !this.alertFlag;
      }
    },
  },
};
</script>

<template>
  <div>
    <num-inp @chuancan="chuancan"></num-inp>
    <img-typical class="imgt" :pic="pic" />
    <longduration-press>
      <div class="ex1"></div>
    </longduration-press>
    <div class="box1"></div>
    <Dropdown trigger="click" style="margin-left: 20px">
      <a href="javascript:void(0)">
        <span v-html="tname"></span>
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list" v-for="item in data1" :key="item.id">
        <template v-if="item.children && item.children.length > 0">
          <dis-table :data1="item.children" :tname="item.name"></dis-table>
        </template>
        <DropdownItem v-else name="item.name">
          <span @click="showname(item.name)">{{ item.name }}</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import numInp from "./numinp.vue";
import longdurationPress from "./longdurationPress";
import imgTypical from "./imgTypical.vue";
import shadiao1 from "@/assets/shadiao1.jpg";
export default {
  components: { numInp, imgTypical, longdurationPress },
  data() {
    return {
      inpdata: "",
      pic: shadiao1,
    };
  },

  methods: {
    chuancan(val) {
      this.inpdata = val;
    },
    showscope(scope) {
      console.log(scope);
    },
    showname(name) {
      console.log(name);
    },
  },
  name: "dis-table",
  props: {
    data1: {
      type: Array,
      default: () => [],
    },
    tname: {
      type: String,
      default: () => "click",
    },
  },
};
</script>
<style lang="less" scoped>
.box1 {
  width: 600px;
  height: 400px;
}
.ex1 {
  width: 200px;
  height: 200px;
  background-color: #58bc58;
}
</style>
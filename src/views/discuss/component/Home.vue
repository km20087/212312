<template>
  <div class="home">
    <div v-show="deltab" ref="deltab" @click="suredel">删除</div>
    <div class="body">
      <div class="box">
        <!-- <p>首页</p> -->
        <router-view></router-view>
        <div class="oppenapp">
          <div>
            <img class="o-img" src="../assets/home-img/top/01.png" alt />
          </div>
        </div>
        <div class="search">
          <a href class="search-1">
            <span>
              <van-icon name="search" size="20px" color="#999999" />
            </span>
            <div class="search-div">
              <i>
                <img class="imgsize" src="../assets/home-img/seach/02.png" alt />
              </i>
              <i>搜索</i>
            </div>
          </a>
          <a href class="search-2">
            <img src="../assets/home-img/seach/03.png" alt class="imgsize" />
          </a>
        </div>

        <div
          class="banner"
          @touchstart.prevent="gotouchstart"
          @touchmove.prevent="gotouchmove"
          @touchend.prevent="gotouchend"
        >
          <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/01.png" alt />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/02.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/03.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/04.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/05.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
              <img src="../assets/home-img/banner-img/06.jpg" alt />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="four">
          <div>
            <a href="###">
              <img src="../assets/home-img/4/01.png" class="imgsize" />
            </a>
          </div>
          <div>
            <a href="###">
              <img src="../assets/home-img/4/02.png" class="imgsize" />
            </a>
          </div>
          <div>
            <a href="###">
              <img src="../assets/home-img/4/03.png" class="imgsize" />
            </a>
          </div>
          <div>
            <a href="###">
              <img src="../assets/home-img/4/04.png" class="imgsize" />
            </a>
          </div>
        </div>
        <div class="five">
          <div>
            <a href>
              <img class="imgsize" src="../assets/home-img/five/01.png" alt />
            </a>
          </div>
          <div>
            <div>
              <a href>
                <img class="imgsize" src="../assets/home-img/five/02.png" alt />
              </a>
            </div>
            <div class="div-img">
              <a href>
                <img class="imgsize" src="../assets/home-img/five/03.png" alt />
              </a>

              <a href>
                <img class="imgsize" src="../assets/home-img/five/04.png" alt />
              </a>
            </div>
          </div>
        </div>
        <div class="six">
          <div>
            <img src="../assets/home-img/six/01.gif" alt />
          </div>
        </div>
        <div class="serven">
          <div>
            <img class="imgsize" src="../assets/home-img/seven/01.png" />
          </div>
        </div>

        <ul class="box_fixed" id="boxFixed" :class="{ is_fixed: isFixed }">
          <li
            class="liMenu"
            :class="idx == index ? 'active' : ''"
            @click="son(item, idx)"
            v-for="(item, idx) in menu"
            :key="idx"
          >
            <div>
              <a href="###">{{ item }}</a>
            </div>
          </li>
        </ul>
        <ul class="listbody">
          <li v-for="item in homelist" :key="item.shop_id" @click="geturl(item.goods_jump_url)">
            <a href="###">
              <div class="list-img">
                <img class="imgsize" :src="item.pic_url" alt />
                <div class="small-img">
                  <img class="imgsize" :src="item.logo_url" alt />
                </div>
                <div class="price">
                  <span>{{item.coupon_tips}}</span>
                </div>
                <div class="title">
                  <span>{{item.title}}</span>
                  <i>{{item.time_left}}</i>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="floot"></div>
    <bottommenu></bottommenu>
  </div>
</template>

<script>
import request from "../utils/request";
import coo from "../utils/cookie.js";
// import listapi from "../api/homelist";
import bottommenu from "../components/bottommenu.vue";
export default {
  data() {
    return {
      deltab: false,
      wwd: false,
      menu: ["精选专场", "精选单品"],
      index: 0,
      isFixed: false,
      offsetTop: 0,
      pagehead: 1,
      pagesize: 10,
      homelist: [],
      timeOutEvent: 0
    };
  },
  created() {
    // this.vertoken();this.$store.dispatch('add', 10)
    // this.$store.commit("vertoken");
    this.$store.dispatch("dis", "12");
    this.getimg();
    // console.log("asd");
  },
  mounted() {
    console.log("mounted");
    window.addEventListener("scroll", this.scrollFn);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFn); // 销毁监听
  },
  components: { bottommenu },
  methods: {
    suredel() {
      let that = this;
      that.deltab = !that.deltab;
      console.log("delete");
    },
    gotouchstart(e) {
      let that = this;
      clearTimeout(that.timeOutEvent); //清除定时器
      that.timeOutEvent = 0;
      that.timeOutEvent = setTimeout(function() {
        //执行长按要执行的内容，
        console.log("长按");
        that.deltab = !that.deltab;
        that.$refs.deltab.style.position = "absolute";
        that.$refs.deltab.style.zIndex = "100";
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
    //文档高度
    getScrollTop() {
      let that = this;
      let scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }, //可视窗口高度
    getWindowHeight() {
      let windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }, //滚动条高度
    getScrollHeight() {
      // var scrollHeight = 0,
      let scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    scrollFn() {
      if (
        this.getScrollTop() + this.getWindowHeight() + 5 >=
        this.getScrollHeight()
      ) {
        this.pagehead++;
        this.getimg();
      }
    },
    geturl(url) {
      console.log(url);
      let p = url.split("https://m.juanpi.com/brand/");
      let w = p[1].split("?shop_id=");
      let brand_id = `${w[0]}_${w[1]}`;
      console.log(brand_id);
      this.$store.dispatch("geturl", brand_id);
      this.$router.push({ name: "brand" });
    },
    tologin() {
      this.$router.push({ path: "/login" });
    },
    tocart() {
      this.$router.push({ path: "/cart" });
    },
    son(item, idx) {
      this.index = idx;
    },
    async getimg() {
      // try {
      //   let p = await listapi.getList(this.pagehead, this.pagesize);
      //   // console.log(p.data);
      //   this.homelist = p.data;
      //   // console.log(this.homelist);
      // } catch (err) {
      //   console.log(err);
      // }
      try {
        let p = await request({
          method: "get",
          url: "/dev-brandsellera1231sdasd/api/getGoods",
          params: {
            page: `${this.pagehead}`,
            zy_ids: "p8_c4_l4",
            app_name: "zhe",
            catname: "tab_hpzc",
            flag: "tab_hpzc"
          }
        });
        let jsonData = JSON.stringify(p);
        let ddd = eval("(" + jsonData + ")");
        let str1 = JSON.stringify(ddd.data.data.goods);
        let arr1 = JSON.parse(str1);
        arr1.forEach(ele => {
          this.homelist.push(ele);
        });
        console.log(this.homelist);
      } catch (err) {}
    },
    async vertoken() {
      try {
        let atoken = coo.getCookie("token");
        let a = await request({
          method: "get",
          url: "/dev-usepsw/user/verify",
          params: {
            token: atoken
          }
        });
        let jsonData = JSON.stringify(a);
        let ddd = eval("(" + jsonData + ")");
        this.wwd = !ddd.data.flag;
        // console.log(this.wwd + "   " + "wwd");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style scoped lang="scss">
// .home {
//   // position: relative;
// }
.body {
  width: 100%;
  // height: 1250px;
  // margin-bottom: 102px;
  overflow: hidden;
  // display: flex;
}
.box {
  width: 100%;
  // height: 100%;
  // overflow-y: auto;
  background: #f4f4f8;
}
.floot {
  width: 100%;

  height: 102px;
  background: #fff;
  // position: absolute;
  // bottom: 0;
}
.oppenapp {
  width: 750px;
  height: 112px;
}
.o-img {
  width: 100%;
}
.search {
  padding-left: 14px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  height: 88px;
  width: 750;
  // background: orange;
  // box-sizing: border-box;
  display: flex;
}

.search-1 {
  width: 635.35px;
  height: 56px;
  border-radius: 10px;
  background: #f2f2f2;
  // flex-direction:column
  margin: auto;
  display: flex;
}
.search-1 span {
  width: 45px;
  height: 45px;
  line-height: 60px;
  padding: 10px 5px 0 10px;
}

.search-1 .search-div {
  display: flex;
  // padding-top: 10px;
}

.search-div i:first-child {
  width: 42px;
  height: 30px;
  font-size: 24px;
}
.search-div i:last-child {
  width: 48px;
  height: 32px;
  font-size: 12px;
  line-height: 28px;
  padding: 14px 0 0 5px;
  color: #999999;
}
.search-2 {
  width: 88px;
  height: 88px;
  margin: auto;
}

.imgsize {
  width: 100%;
  height: 100%;
}
.banner {
  height: 290.15px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  width: 750px;
  height: 290px;
}
.van-swipe-item img {
  width: 100%;
  height: 100%;
}
.four,
.five,
.six,
.six div,
.serven div {
  display: flex;
}
.four {
  width: 750.4px;
  height: 167.41px;
}
.four div {
  widows: 187.6px;
  height: 167.41px;
}
.five {
  width: 750.4px;
  height: 464.41px;
}
.five .div-img {
  display: flex;
}
.five .div-img img {
  width: 225.11px;
  height: 232.2px;
}
.six {
  background: #f4f4f8;
}
.six div {
  width: 750.4px;
  height: 208.45px;
}
.six div img {
  margin: auto;
  width: 100%;
  height: 100%;
}
.list {
  width: 750.4px;
  height: 200px;
}
.serven {
  width: 750.4px;
  height: 95.9px;
  margin-bottom: 20px;
}
#boxFixed {
  display: flex;
  width: 750.4px;
  height: 88.04px;
}
#boxFixed li {
  width: 128.08px;
  height: 88.04px;
  padding: 0 20px;
  display: flex;
}
#boxFixed li div {
  width: 128.07px;
  height: 88.04px;
  line-height: 88.04px;
  display: flex;
  // border-bottom: 2px solid #ff464e;
}
.active div a {
  height: 84px;
  border-bottom: 4px solid #ff464e;
}
.liMenu div a {
  color: #999999;
  display: block;
  margin: auto;
}
.active div a {
  color: #ff464e;
}
.box_fixed {
  width: 500px;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  background: #fff;
  position: sticky;
  top: 0px;
  // z-index: 999;
}
.is_fixed {
  position: fixed;
  top: 0;

  z-index: 999;
}
.listbody {
  display: flex;
  width: 750px;
  // height: 3000px;
  // justify-content: space-between;
  flex-wrap: wrap;
}
.listbody li {
  display: flex;
  width: 373.19px;
  height: 490px;
  align-self: flex-start;
}
.listbody li a {
  display: flex;
  align-self: flex-start;
}
.listbody .list-img {
  height: 373.19px;
  position: relative;
}
.list-img .small-img {
  width: 100px;
  height: 50px;
  position: absolute;
  right: 15px;
  bottom: -25px;
  border: 1px solid #ebebeb;
  background-color: #fff;
}
.list-img .price {
  height: 44px;
  display: flex;
}
.price span {
  color: #ff464e;

  height: 44px;
  font-size: 15px;
  margin: 10px 0 0 10px;
}
.title {
  display: flex;
  height: 32px;
  padding-left: 10px;
  margin-top: 10px;
  justify-content: space-between;
}
.title span {
  width: 260px;
  height: 33px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 33px;
  color: #3b3b3b;
}
.title i {
  margin-right: 10px;
  font-size: 10px;
  height: 33px;
  color: #bbb;
  line-height: 33px;
}
</style>

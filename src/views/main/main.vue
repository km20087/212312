<template>
  <div class="layout">
    <Layout style="height: 100%">
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
        width="240"
      >
        <Menu :theme="theme2" width="auto" :class="menuitemClasses" accordion>
          <div class="iscollapsed" v-show="!isCollapsed">
            <Submenu
              :name="`${item.meta.id}`"
              v-for="item in menuList"
              :key="item.meta.id"
            >
              <template slot="title">
                <Icon :type="`${item.meta.icon}`" />
                <!-- 内容管理 -->
                {{ item.meta.title }}
              </template>
              <MenuItem
                :name="`${item.meta.id}-${index + 1}`"
                v-for="(ite, index) in item.children"
                :key="`${item.meta.id}` + index"
                :to="{ name: `${ite.name}` }"
              >
                <span>{{ ite.meta.title }}</span>
              </MenuItem>
            </Submenu>
          </div>
        </Menu>
        <div v-show="isCollapsed">
          <template v-for="item in menuList">
            <Dropdown placement="left-start" :key="item.meta.id">
              <a href="javascript:void(0)" class="drop-menu-a">
                <Icon :type="`${item.meta.icon}`" :size="24" />
              </a>
              <DropdownMenu
                slot="list"
                v-for="(ite, index) in item.children"
                :key="`${item.meta.id}` + index"
              >
                <DropdownItem>
                  <MenuItem
                    :name="`${item.meta.id}-${index + 1}`"
                    :to="{ name: `${ite.name}` }"
                  >
                    <span>{{ ite.meta.title }}</span>
                  </MenuItem></DropdownItem
                >
              </DropdownMenu>
            </Dropdown>
          </template>
        </div>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{ margin: '0 20px' }"
            type="md-menu"
            size="24"
          ></Icon>
        </Header>
        <Content
          :style="{ margin: '20px', background: '#fff', minHeight: '260px' }"
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// import HeaderBar from "./components/headbar/headbar";
// import SideMenu from "./components/sidemenu/sidemenu";
// import TagsNav from "./components/tagsnav/tagsnav";
// import User from "./components/user/user";
// import { routesMap } from "@/router";
import { getNewTagList } from "@/libs/util";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Main",

  data() {
    return {
      isCollapsed: false,
      theme2: "dark",
      // menulist: this.$store.getters.menuList,
      menulist: [
        {
          id: "1",
          icon: "ios-paper",
          title1: "内容管理",
          detailslist: ["文章管理", "评论管理", "举报管理"],
        },
        {
          id: "2",
          icon: "ios-people",
          title1: "用户管理",
          detailslist: ["新增用户", "活跃用户"],
        },
        {
          id: "3",
          icon: "ios-stats",
          title1: "统计分析",
          detailslist: [
            "新增和启动",
            "活跃分析",
            "时段分析",
            "用户留存",
            "流失用户",
          ],
        },
      ],
    };
  },
  components: {
    // SideMenu,
    // HeaderBar,
    // TagsNav,
    // User,
  },
  // watch: {
  //   $route(newRoute) {
  //     this.setBreadCrumb(newRoute.matched);
  //     this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
  //   },
  // },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    menuList() {
      return this.$store.getters.menuList;
    },
  },
  methods: {
    // ...mapMutations(["setBreadCrumb", "setTagNavList", "addTag"]),
    // ...mapActions(["handleLogin"]),
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    enter1() {
      console.log("enter");
    },
    che() {
      console.log(this.menulist);
    },
  },
  created() {
    // console.log(menuList);
  },
  mounted() {
    // console.log(this.menuList);
  },
};
</script>

<style scoped>
a.drop-menu-a {
  display: inline-block;
  padding: 6px 15px;
  width: 100%;
  text-align: center;
  color: #ffffff;
}
.layout {
  height: 100vh;
  /* border: 1px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
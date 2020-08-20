<template>
  <div class="sl-layout-header">
    <div class="logo">
      <div class="logo-img"></div>
      <div class="title">{{title}}</div>
    </div>
    <div class="collapsed-handle" v-if="isShowCollapsed">
      <a-button class="collapsed-btn" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="collapsed-icon" />
      </a-button>
    </div>
    <!-- <ul class="header-menu-content">
      <li class="menu-item menu-item-selected">
        <div class="menu-submenu-title">菜单一</div>
      </li>
      <li class="menu-item">
        <div class="menu-submenu-title">菜单二</div>
      </li>
      <li class="menu-item">
        <div class="menu-submenu-title">菜单三</div>
      </li>
    </ul>-->
    <ul class="header-right-menu-content">
      <li class="menu-item">
        <i class="sl-icon sl-user-icon"></i>
        <span>{{userInfo.orgName}}</span>
      </li>
      <li class="menu-item">
        <div @click="toMessage" class="menu-submenu-title">
          <a title="未读消息">
            <span class="badge" v-if="count>0">{{count>999?999+'+':count}}</span>
            <i class="sl-bell-icon"></i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import config from "@/config";
export default {
  name: "LayoutHeader",
  props: {
    collapsed: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return { userInfo: {} };
  },
  computed: {
    title() {
      return config.headerTitle || "无标题";
    },
    isShowCollapsed() {
      return config.isShowCollasped;
    },
    count() {
      return this.$store.state.user.count;
    },
  },
  mounted() {
    // this.getAccount();
  },
  methods: {
    toggleCollapsed() {
      this.$emit("toggleCollapsed");
    },
    toMessage() {
      if (this.$route.name != "MessageList")
        this.$router.push({ name: "MessageList" });
    },
    getAccount() {
      this.$store.dispatch("user/identity").then((account) => {
        this.userInfo = { orgName: account.orgName };
      });
    },
  },
};
</script>
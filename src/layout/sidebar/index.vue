<template>
  <div class="sl-layout-sidebar">
    <a-menu theme="dark" mode="inline" :inlineCollapsed="collapsed" :selectedKeys="selectedKeys">
      <a-menu-item key="1">系统导航</a-menu-item>
      <template v-for="item in menuList">
        <a-menu-item v-if="!item.children||item.children.length==0" :key="item.fullPath">
          <router-link :to="{ name: item.name}">
            <a-icon v-if="item.icon" :type="item.icon" />
            <span>{{item.title}}</span>
            <span v-if="item.meta && item.meta.badge!=undefined">（{{item.meta.badge}}）</span>
          </router-link>
        </a-menu-item>
        <menu-item v-else :menu-info="item" :key="item.fullPath" />
      </template>
    </a-menu>
  </div>
</template>
<script>
import MenuItem from "./MenuItem";
export default {
  name: "LayoutSidebar",
  components: { MenuItem },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
    collapsed: {
      type: Boolean,
      default() {
        return false;
      },
    },
    selectedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {},
};
</script>
<template>
  <div :class="['sl-layout','sl-layout-container-wrapper',{'sidebar-collapsed':sidebar.collapsed}]">
    <div class="sl-layout-header-wrapper">
      <LayoutHeader :collapsed="sidebar.collapsed" @toggleCollapsed="toggleSideBar" />
    </div>
    <div class="sl-layout-main-wrapper">
      <div class="sl-layout-sidebar-wrapper">
        <LayoutSidebar
          :menuList="menuList"
          :collapsed="sidebar.collapsed"
          :selectedKeys="selectedKeys"
        />
      </div>
      <div class="sl-layout-content-wrapper">
        <div class="sl-layout-content-header-wrapper">
          <LayoutContentHeader />
        </div>
        <div class="sl-layout-content">
          <LayoutContent />
        </div>
        <LayoutFooter />
      </div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from "./header";
import LayoutSidebar from "./sidebar";
import LayoutContent from "./main-content";
import LayoutContentHeader from "./content-header";
import LayoutFooter from "./footer";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutSidebar,
    LayoutContent,
    LayoutContentHeader,
    LayoutFooter,
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters({
      sidebar: "menu/sidebar",
    }),
    menuList() {
      return this.$store.state.menu.menuList;
    },
    selectedKeys() {
      return [this.$route.fullPath];
    },
  },
  methods: {
    ...mapActions({
      toggleSideBar: "menu/toggleSideBar",
    }),
  },
};
</script>
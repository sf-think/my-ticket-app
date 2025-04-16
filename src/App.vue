<template>
  <a-config-provider>
    <router-view />
  </a-config-provider>
</template>

<script setup>
// 引入 Ant Design Vue 的全局配置组件，用于设置语言等
import { ConfigProvider } from 'ant-design-vue';
// 如果需要，可以在这里导入全局样式，或者在 main.js 中导入
// import './assets/main.css';

const AConfigProvider = ConfigProvider;

// 通常 App.vue 不需要太多逻辑，除非你想放置一些全局的、
// 不随路由变化的元素（但在此项目中，登录页和主页布局不同，
// 所以布局放在各自页面组件或 MainPage.vue 中更合适）
</script>

<style>
/* 这里可以放一些真正的全局样式，影响整个应用的 */
#app {
  /* 例如，确保应用占满屏幕高度，虽然布局组件通常会处理这个 */
   /* min-height: 100vh;  */
   /* Ant Design Vue 通常会处理好基础样式，这里可能不需要额外样式 */
}

/* 你也可以在这里引入全局 CSS 文件 */
/* @import './assets/base.css'; */
</style>
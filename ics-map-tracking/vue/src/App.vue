/** * 描述：app.vue */
<style lang="scss">
@import "src/styles/common";
@import "../src/styles/fonts/font.css";

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
<template>
  <transition name="router-fade" mode="out-in">
    <div class="autoHeight">
      <!--
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      -->
      <router-view></router-view>
    </div>
  </transition>
</template>

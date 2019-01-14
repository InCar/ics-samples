<style lang="scss" scoped>
@import "src/styles/vars";
@import "src/styles/mixins";

.hy-main-box {
  @include wh(100%, 100%);
  position: relative;
  overflow: hidden;
  .hy-content-left {
    @include wh(auto, 100%);
    position: relative;
    transition: padding-left 0.3s;
    margin: 0 0 0 0;
    //  padding-top: 53px;
    .hy-main {
      @include wh(100%, 100%);
      overflow: auto;
      // margin: 10px auto;
    }
    footer {
      width: 100%;
      position: relative;
      height: 40px;
      //  text-align: center;
      background-color: $bgcolor;
      p {
        @include center();
        span {
          color: #a1a1a1;
        }
        span:first-child {
          margin-right: 20px;
        }
      }
    }
  }
}

// 动画
.slide-both-enter-active,
.slide-both-leave-active {
  transition: all 0.3s;
}

.slide-both-enter {
  opacity: 0;
  transform: scale3d(0.95, 0.95, 0.95);
}

.slide-both-leave-to {
  opacity: 0;
  transform: scale3d(0.95, 0.95, 0.95);
}
</style>
<template>
  <div class="hy-main-box">
    <div class="hy-content-left">
      <div class="hy-main">
        <router-view v-if="isIE"></router-view>
        <transition name="slide-both" mode="out-in" v-else>
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div>
      <audio id="bgMusic">
        <source src="/static/images/tip2.aac" type="audio/mp3" />
      </audio>
    </div>
  </div>
</template>
<script>

export default {
  //    name: 'main',
  components: {
  },
  data() {
    return {
      isIE: false
    };
  },
  computed: {
  },
  methods: {
  },
  beforeDestroy() {}
};
</script>

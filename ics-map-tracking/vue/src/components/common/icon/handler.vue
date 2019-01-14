<template>
    <i :class="classes"
       :style="styles"></i>
</template>
<script>
const prefixCls = "iconfont";

export default {
  name: "hyHandler",
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    classes() {
      if (this.type) {
        return `${prefixCls} icon-${this.type}`;
      }
    },
    styles() {
      let style = {};
      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }
      if (this.color) {
        style.color = this.color;
      }
      return style;
    }
  }
};
</script>

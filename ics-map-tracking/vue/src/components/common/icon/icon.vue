<template>
  <Tooltip
    :content="content"
    :placement="placement"
    :disabled="showContent"
    :transfer="showTransfer"
    :delay="delayNum"
  >
    <i :class="classes" @click="handleClick" :style="styles"></i>
  </Tooltip>
</template>
<script>
const prefixCls = "iconfont";

export default {
  name: "newIcon",
  props: {
    type: String,
    color: String,
    size: [Number, String],
    content: [Number, String],
    placement: String,
    showContent: {
      type: Boolean,
      default: false
    },
    delayNum: {
      type: Number,
      default: 0
    },
    showTransfer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      if (this.type) {
        return `${prefixCls} icon-${this.type}`;
      }
      // return [
      //    prefixCls,
      //     {
      //         [`${this.type}`]: !!this.type
      //     }
      // ];
    },
    styles() {
      let style = {};
      if (this.color) {
        style.color = this.color;
      }
      if (this.size) {
        style["font-size"] = `${this.size}px`;
      }
      return style;
    }
  },
  methods: {
    handleClick(ev) {
      this.$emit("click", ev);
    },
    handleShow() {
      this.showContent = true;
    }
  }
};
</script>

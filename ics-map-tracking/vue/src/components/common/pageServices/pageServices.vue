<template>
  <div class="padding">
    <ul class="pagination">
      <li class="first disabled total">
        <a href="javascript:void(0)">共{{ totalElement }}条</a>
      </li>
      <li
        v-if="showHome"
        class="first"
        :class="{ disabled: internalCurrentPage == 1 || totalElement === 0 }"
        @click="go(1);"
      >
        <a href="javascript:void(0)">首页</a>
      </li>
      <li v-show="hasPrevious" @click="prev();">
        <a href="javascript:void(0)">
          <i class="el-icon-caret-left icon-pre"></i>
        </a>
      </li>
      <li
        :class="{ active: internalCurrentPage == i }"
        v-for="(i, index) in pages"
        :key="index"
        class="selectNum"
        @click="go(i);"
      >
        <a href="javascript:void(0)">{{ i }}</a>
      </li>
      <li v-show="hasNextVar" @click="next();">
        <a href="javascript:void(0)">
          <i class="el-icon-caret-right icon-next"></i>
        </a>
      </li>
      <li
        v-if="showHome"
        class="end"
        :class="{
          disabled: internalCurrentPage == totalPage || totalElement === 0
        }"
        @click="go(totalPage);"
      >
        <a href="javascript:void(0)">尾页</a>
      </li>
      <li class="end disabled total">
        <a href="javascript:void(0)">共{{ totalPage }}页</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "hyPage",
  data() {
    return {
      internalCurrentPage: 1
    };
  },
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 展示多少
    showItem: {
      type: Number,
      default: 5
    },
    totalElement: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    },
    showHome: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pages: function() {
      let pages = [];
      if (this.internalCurrentPage < this.showItem) {
        let i = Math.min(this.showItem, this.totalPage);
        while (i) {
          pages.unshift(i--);
        }
      } else {
        let middle = this.internalCurrentPage - Math.floor(this.showItem / 2);
        let i = this.showItem;
        let calc = this.totalPage - this.showItem;
        if (middle > calc) {
          middle = calc + 1;
        }
        while (i--) {
          pages.push(middle++);
        }
      }
      return pages;
    },
    hasPrevious: function() {
      return this.internalCurrentPage > 1;
    },
    hasNextVar: function() {
      return this.internalCurrentPage < this.totalPage;
    }
  },
  methods: {
    next() {
      if (this.hasNextVar) {
        this.internalCurrentPage++;
        this.load();
      }
    },
    go(currentPage) {
      if (this.internalCurrentPage === currentPage || !currentPage) return;
      this.internalCurrentPage = currentPage;
      this.load();
    },
    prev() {
      if (this.hasPrevious) {
        this.internalCurrentPage--;
        this.load();
      }
    },
    load() {
      this.$emit("current-change", this.internalCurrentPage);
    }
  },
  watch: {
    currentPage: {
      immediate: true,
      handler(val) {
        this.internalCurrentPage = val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/styles/vars";
@import "src/styles/mixins";

.padding {
  padding: 15px 15px 0px 15px !important;
  text-align: right;
  .pagination {
    display: inline-block;
    user-select: none;
    .total {
      //width: 70px;
    }
    .selectNum {
      //    width:28px;
      // height:26px;
      text-align: center;
      position: relative;
      a {
        // @include center()
      }
    }
    li {
      // position: relative;
      //    width:52px;
      // height:26px;
      //  border: 1px solid #EEEEEE;
      //  border-radius: 100%;
      background: #eeeeee;
      float: left;
      margin: 0 5px;
      padding: 3px 10px;
      a {
        //  @include center();
        // display: block;
        //   text-align: center;
        //   width: 32px;
        font-size: 12px;
        //    height: 32px;
        //    line-height: 32px;
        // padding: 6px 12px;
        border-radius: 100%;
        color: #97a1ac;
        cursor: pointer;
      }
      &:hover,
      &.active {
        border-color: #0f68b7;
        background: #0f68b7;
        a {
          color: #fff;
          i {
            color: #fff;
          }
        }
      }
      &.first,
      &.end {
        //  border-radius: 16px;
        // border-color: #19be6b;
        //  background: #EEEEEE;
        a {
          // color: #FFFFFF;
          width: auto;
          height: auto;
          //   line-height: 1.5;
          //    padding: 6px 10px;
        }
      }
      &.disabled,
      &.disabled:hover {
        background: none;
        border-color: #eeeeee;
        a {
          cursor: not-allowed;
          color: #97a1ac;
        }
      }
      // &:active,
      // &:focus,
      // &:visited {
      //   background: #19be6b;
      //   border-color: #19be6b;
      //   color: #fff;
      // }
    }
  }
}

.icon-pre {
  position: relative;
  left: -1px;
  color: #97a1ac;
}

.icon-next {
  position: relative;
  left: 1px;
  color: #97a1ac;
}
</style>

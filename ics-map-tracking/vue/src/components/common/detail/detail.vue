<style lang="scss" scoped>
.detail-body {
  width: 100%;
  height: auto;
}
.hy-div {
  float: left;
  width: 50%;
  height: 44px;
  .form-item {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
.ivu-form-inline .ivu-form-item {
  margin: 0;
}
.clearfix {
  clear: both;
  zoom: 1;
  overflow: hidden;
}
.ellipsis {
  display: inline-block;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="detail-body">
    <template>
      <Form :label-width="labelWidth"
            inline
            class="clearfix">
        <div class="hy-div"
             v-for="rd,index in itemArray"
             :key="index"
             :style="((Math.ceil(rd.index / 2)) % 2 === 0)?{'background-color':'#f8f8f9'}:{'background-color':'#FFFFFF'}">
          <FormItem :label="rd.title"
                    class="form-item">
            <hy-cell v-if="rd.array"
                     :array="rd.array"
                     :value="rd.value || rd.value===0?rd.value.toString():''"></hy-cell>
            <a v-else
               style="color:#495060;text-decoration:none;cursor:default;"
               class="ellipsis"
               :title='rd.value'>{{rd.value}}</a>
          </FormItem>
        </div>
        <div v-if="itemArray.length % 2 !== 0 && Math.ceil(itemArray[itemArray.length - 1].index / 2) % 2 === 0"
             class="hy-div"
             style="background-color: #f8f8f9">
        </div>
      </Form>
    </template>
  </div>
</template>
<script>
// 最乱的详情代码 目前只能这样实现效果 后期有时间优化
import HyCell from "./cell.vue";

export default {
  name: "hyDetail",
  components: {
    HyCell
  },
  data() {
    return {
      style: {},
      itemArray: []
    };
  },
  props: {
    form: Object,
    rowData: Array,
    labelWidth: {
      type: Number,
      default: 180
    }
  },
  methods: {
    // 判断字符串是否超出显示范围
    getLen(val) {
      if (!val) {
        return true;
      }
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var length = val.charCodeAt(i);
        if (length >= 0 && length <= 128) {
          len += 1;
        } else {
          len += 2;
        }
      }
      if (len > 3000) {
        // 原值为 30， 现在以省略号替代换行 取值3000
        return false;
      }
      return true;
    }
  },
  mounted() {
    let len = 0;
    // 循环需要显示的列
    for (let i in this.rowData) {
      let row = this.rowData[i];
      let item = {};
      for (let j in this.form) {
        // 取出列对应的数据
        if (j === row.key) {
          item.value = this.form[j];
        }
      }
      // 构建列对象
      item.title = `${row.title}：`;
      if (row.array) item.array = row.array;
      item.key = row.key;
      if (this.getLen(item.value)) {
        // 正常显示列
        len += 1; // 列的len +1
        item.newLine = false; // 是否换行
        item.index = len;
        this.itemArray.push(item);
      } else if (len % 2 !== 0) {
        // 如果长度超出显示范围并且该列不是头列
        this.itemArray.push({ index: len + 1 }); // 补充一列
        len += 2; // 当前列len +1
        item.newLine = true; // 换行
        item.index = len;
        this.itemArray.push(item);
        if (len % 2 !== 0) {
          // 如果换行后该列为头列 补充len + 1
          len += 1;
        }
      } else {
        len += 1;
        item.newLine = true;
        item.index = len;
        this.itemArray.push(item);
        len += 1;
      }
    }
  }
};
</script>

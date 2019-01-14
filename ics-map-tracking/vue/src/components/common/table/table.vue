<template>
  <div>
    <i-table
      border
      stripe
      ref="tables"
      :columns="columnsTitle"
      :data="list"
      @on-selection-change="onSelectionChange"
      :loading="loading"
      :no-data-text="noDataText"
      @on-row-click="clickOne"
    ></i-table>
  </div>
</template>

<script>
export default {
  name: "hyTable",
  data() {
    return {};
  },
  props: {
    columnsTitle: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    multipleSelection: {
      type: Array,
      default: () => []
    },
    columnType: String,
    onSelectionChange: Function,
    showCheckbox: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    noDataText: String
  },
  methods: {
    clickOne(row) {
      this.$emit("on-click", row);
    }
  },
  watch: {
    // 如果 `showCheckbox` 发生改变，这个函数就会运行
    showCheckbox: function() {
      if (this.columnType === "selection") {
        if (this.showCheckbox) {
          if (this.columnsTitle[0].type) {
            this.columnsTitle.shift();
          }
          this.columnsTitle.unshift({
            type: "selection",
            width: 60,
            align: "center"
          });
        }
        if (!this.showCheckbox) {
          if (this.columnsTitle[0].type) {
            this.columnsTitle.shift();
          }
          //            this.columnsTitle.unshift({
          //              type: 'index',
          //              width: 60,
          //              align: 'center'
          //            });
        }
      } else {
        if (!this.columnsTitle[0].type) {
          //            this.columnsTitle.unshift({
          //              type: 'index',
          //              width: 60,
          //              align: 'center'
          //            });
        }
      }
    },
    // 若无数据，则提示居中显示
    list(value) {
      if (!value.length) {
        let divs = document.getElementsByClassName("ivu-table-wrapper");
        let tableWidth = this.$refs.tables.tableWidth; // 表格长度
        for (let div of divs) {
          let clientWidth = div.clientWidth; // 可见长度
          if (clientWidth && tableWidth > clientWidth) {
            let noData = document.getElementsByClassName("ivu-table-tip");
            for (let tds of noData) {
              let tdStyle = tds.getElementsByTagName("td")[0];
              if (Number.parseInt(tdStyle.style.width)) {
                tdStyle.style.textAlign = "left";
                tdStyle.style.paddingLeft = `${Number.parseInt(
                  clientWidth / 2
                ) + Number.parseInt(tds.scrollLeft)}px`;
              }
            }
          } else {
            let noData = document.getElementsByClassName("ivu-table-tip");
            for (let tds of noData) {
              let tdStyle = tds.getElementsByTagName("td")[0];
              if (!Number.parseInt(tdStyle.style.width)) {
                tdStyle.style.textAlign = "center";
                tdStyle.style.paddingLeft = "0";
              }
            }
          }
        }
      }
    }
  }
};
</script>

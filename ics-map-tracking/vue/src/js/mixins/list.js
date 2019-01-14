/**
 *  描述：混合类
 */

export default {
  data() {
    return {
      list: [], // 列表展示
      loading: false, // loading 动画
      loadingText: this.$store.state.loadingText, // loading 文字
      searchData: {
        // 搜索条件
        pageNum: this.$store.state.pageNum, // 当前页码
        pageSize: this.$store.state.pageSize // 分页大小
      },
      searchPageData: {
        pageNum: this.$store.state.pageNum, // 当前页码
        pageSize: this.$store.state.pageSize // 分页大小
      }, // 分页筛选
      multipleSelection: [], // 多选
      totalElement: this.$store.state.totalElement, // 总数量
      totalPage: this.$store.state.totalPage, // 总页数
      showCheckbox: true, // table 项  动态改变列表样式，解决列表多选框中的bug
      noDataText: null
    };
  },
  computed: {
    // 删除样式
    delClasses() {
      return {
        "hy-default-btn": !this.multipleSelection.length
      };
    },
    // 分页是否展示
    pageShow() {
      return !!this.list.length;
    }
  },
  created() {
    this._getList(1, true);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clearSelecttion() {
      this.multipleSelection = [];
    },
    currentChange(val) {
      this.loading = true;
      this.searchData.pageNum = val;
      // 获取列表
      this._getList();
    },
    // 格式化数据
    callback(res) {
      this.loading = false;
      this.totalElement = res.totalElements;
      this.totalPage = res.totalPages;
      this.list = res.content ? res.content : [];
      // 分页会调到没有数据的一页去的bug
      // if (this.list.length === 0 && this.searchData.pageNum !== 1) {
      //   this.searchData.pageNum = 1;
      //   this._getList();
      //   return;
      // }
      if (this.list.length === 0) {
        this.noDataText = "暂无数据";
        this.showCheckbox = false;
      } else {
        this.noDataText = null;
        this.showCheckbox = true;
        // let index;
        // if (this.searchData.pageNum === 1) {
        //   index = 1;
        // } else {
        //   index = (this.searchData.pageNum - 1) * this.searchData.pageSize + 1;
        // }
        // for (let item of this.list) {
        //   item.index = index;
        //   index++;
        // }
      }
    },
    search() {
      this.currentChange(1);
    }
  }
};

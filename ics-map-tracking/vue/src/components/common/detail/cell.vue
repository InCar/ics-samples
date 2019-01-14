<style lang="scss" scoped>
</style>
<template>
  <span>{{filter()}}</span>
  <!--<span><Input type="text" readonly :value="filter()"/></span>-->
</template>
<script>
export default {
  name: "hyCell",
  data() {
    return {};
  },
  props: {
    array: Array,
    value: String
  },
  methods: {
    filter() {
      var ret = this.array.filter(i => {
        return i.value.toString() === this.value.toString();
      });
      return ret.length > 0 ? ret[0].label : this.value;
    }
  }
};
</script>

<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    </Layout>
</template>

<script lang="ts">
  import Tabs from '@/views/Tabs.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import intervalList from '@/constant/intervalList';
  import recordTypeList from '@/constant/recordTypeList';

  @Component({
      components:{Tabs}
  })
  export default class Statistics extends Vue{
    type='-';
    interval='day';
    intervalList =intervalList;
    recordTypeList = recordTypeList;
  }
</script>

<style scoped lang='scss'>
  ::v-deep .type-tabs-item{
    background: #ffffff;
    &.selected{
      background: #c4c4c4;
      &::after{
        display: none;
      }
    }
  }
</style>
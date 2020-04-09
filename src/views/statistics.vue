<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    </Layout>
</template>

<script lang="ts">
  import Tabs from '@/views/Tabs.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component({
      components:{Tabs}
  })
  export default class Statistics extends Vue{
    type='-';
    interval='day';
    intervalList=[
        {text:'按天',value:'day'},
        {text:'按月',value:'month'},
        {text:'按年',value:'year'},
    ];
    typeList=[
        {text:'支出',value:'-'},
        {text: '收入',value:'+'}
    ]
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
<template>
  <div>
    <Layout>
      <ul class="tags">
        <li class="tag" v-for="tag in tags" :key="tag"><span>{{tag}}</span>
          <Icon name="right"></Icon>
        </li>
      </ul>
      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">新增标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import tagsModel from '@/assets/models/tagsModel';
    import {Component} from 'vue-property-decorator';

    @Component
    export default class Labels extends  Vue{
        tags = tagsModel.fetch()
        createTag(){
            const name= window.prompt('请输入标签名')
            if (name){
                const message = tagsModel.create(name)
                if (message === 'duplicated'){
                    window.alert('标签名重复')
                }
                else if (message ==='success'){
                    window.alert('标签添加成功')
                }
            }
        }
    }
</script>

<style scoped lang='scss'>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      svg {
        width: 18px;
        height: 18px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  .createTag {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>
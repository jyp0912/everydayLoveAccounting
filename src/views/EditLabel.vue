<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
      <div class="form-wrapper">
        <FormItem :value="tag.name" @update:value="updateTag" name="标签名" placeholder="请在这里输入标签名"></FormItem>
      </div>
      <div class="button-wrapper">
        <Button @click.native="remove">删除标签</Button>
      </div>

  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagsModel from '@/assets/models/tagsModel';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';

    @Component({
        components: {Button, FormItem}
    })
    export default class EditLabel extends Vue {
        tag?: {id: string;name: string}=undefined;
        created() {
            const id = this.$route.params.id;
            tagsModel.fetch();
            const tags = tagsModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if (tag) {
                this.tag = tag ;
            } else {
                this.$router.replace('/404');//replace 不是 push 因为防止用户无法回退
            }
        }
        updateTag(name: string){
            if (this.tag){tagsModel.update(this.tag.id,name)}
        }
        remove(id: string){
            if (this.tag){
                tagsModel.remove(this.tag.id)
            }
        }
        goBack(){
            this.$router.back()
        }
    }
</script>

<style scoped lang='scss'>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {
    }

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
    font-size: 16px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>
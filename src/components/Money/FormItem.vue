<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.name}}</span>
      <input :value="value" @input="onValueChanged($event.target.value)" type="text" :placeholder="this.placeholder" >
    </label>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    @Component
    export default class FormItem extends Vue {
      @Prop({default:''}) value!: string;
      @Prop({required:true}) name!: string;
      @Prop() placeholder?: string;
        onValueChanged(value: string){
          this.$emit('update:value',value)
      }
    }
</script>

<style lang="scss" scoped>
  .formItem {
    font-size: 16px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
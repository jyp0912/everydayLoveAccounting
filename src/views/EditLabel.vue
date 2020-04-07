<template>
  <Layout>
    编辑标签
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagsModel from '@/assets/models/tagsModel';

    @Component
    export default class EditLabel extends Vue {
        created() {
            const id = this.$route.params.id;
            tagsModel.fetch();
            const tags = tagsModel.data;
            const tag = tags.filter(t => t.id === id)[0];
            if (tag) {
                console.log(tag);
            } else {
                this.$router.replace('/404');//replace 不是 push 因为防止用户无法回退
            }
        }
    }
</script>

<style scoped lang='scss'>

</style>
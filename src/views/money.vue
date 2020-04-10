<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
      <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
      <div class="notes">
        <FormItem name="备注" placeholder="请在这里输入备注" @update:value="onUpdateNotes"/>
      </div>
      <Tags :value.sync="record.tags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constant/recordTypeList';

    @Component(
        {components: {Tabs, FormItem, Tags, NumberPad}
    }
    )

    export default class Money extends Vue {
        record: RecordItem = {
            tags: [],
            notes: '',
            type: '-',
            amount: 0,
        };
        recordTypeList = recordTypeList;
        get recordList(){
            return this.$store.state.recordList;
        }
        created(){
            this.$store.commit('fetchRecords');
        }
        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            this.$store.commit('createRecord',this.record)
        }
    }
</script>

<style lang='scss'>
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>
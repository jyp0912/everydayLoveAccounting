<template>
  <div>
    <Layout class-prefix="layout">
      {{records}}
      <NumberPad @update:value="onUpdateNumber" @submit="saveRecord"/>
      <Types value="record.type" @update:value="onUpdateType"/>
      <div class="notes">
        <FormItem name="备注" placeholder="请在这里输入备注" @update:value="onUpdateNotes"/>
      </div>      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import recordsModel  from '@/assets/models/recordsModel';
    import tagsModel from '@/assets/models/tagsModel';

    const records = recordsModel.fetch();

    @Component(
        {components: {FormItem, Tags, Types, NumberPad}}
    )

    export default class Money extends Vue {
        tags = window.tagList;
        records: RecordItem[] = records;
        record: RecordItem = {
            tags: [],
            notes: '',
            type: '-',
            amount: 0,
        };

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNumber(value: string) {
            this.record.amount = parseFloat(value);
        }

        onUpdateType(value: string) {
            this.record.type = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            recordsModel.create(this.record)
        }

        @Watch('records')
        onRecordsChange() {
          recordsModel.save(this.records)
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
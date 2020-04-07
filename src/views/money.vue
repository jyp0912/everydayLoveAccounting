<template>
  <div>
    <Layout class-prefix="layout">
      {{records}}
      <NumberPad @update:value="onUpdateNumber" @submit="saveRecord"/>
      <Types value="record.type" @update:value="onUpdateType"/>
      <Notes @update:value="onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import recordsModel  from '@/assets/models/recordsModel';
    import tagsModel from '@/assets/models/tagsModel';

    const records = recordsModel.fetch();
    const tags = tagsModel.fetch();
    @Component(
        {components: {Tags, Notes, Types, NumberPad}}
    )

    export default class Money extends Vue {
        tags = tags;
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
            const record2: RecordItem = recordsModel.clone(this.record);//深拷贝以免覆盖数据
            record2.createAt = new Date();
            this.records.push(record2);
            console.log(this.records);
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
</style>
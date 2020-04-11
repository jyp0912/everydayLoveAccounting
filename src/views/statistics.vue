<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol v-if="groupList.length>0">
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{beautify(group.title)}}  <span>{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noRecords">
      目前没有相关记录
    </div>
  </Layout>
</template>
<style scoped lang="scss">
  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
  .noRecords {
    margin: 20px;
    text-align: center;
  }
  ::v-deep {
    .type-tabs-item {
      background: #C4C4C4;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }
    }
  }
</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constant/intervalList';
    import recordTypeList from '@/constant/recordTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';

    @Component({
        components: {Tabs},
    })
    export default class Statistics extends Vue {
        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，');
        }

        beautify(string: string) {
            const day = dayjs(string);
            const now = dayjs();
            if (day.isSame(now, 'day')) {
                return '今天';
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (day.isSame(now, 'year')) {
                return day.format('M月DD日');
            } else {
                return day.format('YYYY年MM月DD日');
            }
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get groupList() {
            const {recordList} = this;
            // for (let i = 0; i < recordList.length; i++) {
            //     const [date, time] = recordList[i].createAt!.split('T');
            //     hashTable[date] = hashTable[date] || {title: date, items: []};
            //     console.log(hashTable[date].items);
            //     hashTable[date].items.push(recordList[i]);
            // }
            type Result = {
                title: string;
                total?: number;
                items: RecordItem[];
            }[]

            const newList = clone(recordList).filter(r => r.type === this.type).sort(((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()));
            if (newList.length===0){
                return [] as Result;
            }
            const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];

            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
            });
            return result;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        type = '-';
        interval = 'day';
        intervalList = intervalList;
        recordTypeList = recordTypeList;
    }
</script>



import Vue from 'vue';
import Vuex, {mapMutations} from 'vuex';
import clone from '@/lib/clone';
import recordStore from '@/store/recordStore';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      recordList:[] as RecordItem[]
    },
    mutations: {
        createRecord(state, record: RecordItem) {
            const record2: RecordItem = clone(record);
            record2.createAt = new Date();
            state.recordList && state.recordList.push(record2);
            store.commit('saveRecords');
        },
      fetchRecords(state) {
        state.recordList= JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

      },
      saveRecords(state) {
        window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
      },
    },});

export default store;

import clone from '@/lib/clone';

const localStorageKeyName = 'records';
const recordsModel = {
    data:[] as RecordItem[],
    create(record: RecordItem){
        const record2: RecordItem = clone(record);//深拷贝以免覆盖数据
        record2.createAt = new Date();
        this.data.push(record2);
    },
    fetch() {
        this.data= JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }

};
export default recordsModel;
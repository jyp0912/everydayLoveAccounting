type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createAt?: string;
}
type RootState = {
    recordList: RecordItem[];
    createRecordError: Error|null;
    createTagError: Error|null;
    tagList: Tag[];
    currentTag?: Tag;
}
type Tag = {
    id: string;
    name: string;
}
type TagsModel = {
    data: Tag[];
    fetch: () => Tag[];
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    create: (name: string) => 'success' | 'duplicated';
    save: () => void;
    remove: (id: string) => boolean;
}

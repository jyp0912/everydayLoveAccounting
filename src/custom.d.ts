type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?: Date;
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
interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string,name: string) => 'success' | 'duplicated' | 'not found';
    findTag: (id: string) => Tag | undefined;
}
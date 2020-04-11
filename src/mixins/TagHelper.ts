import {Component} from 'vue-property-decorator';
import Vue from 'vue';

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt('请输入标签名');
        if (!name) {
            return window.alert('标签名不能为空');
        }
        if (this.$store.state.createTagError === null) {
            this.$store.commit('createTag', name);
            window.alert('成功创建');
        }
    }
}

export default TagHelper;
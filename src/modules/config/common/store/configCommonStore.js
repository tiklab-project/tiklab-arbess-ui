import {action, observable} from "mobx";

class ConfigCommonStore {

    constructor(store) {
        this.store = store
    }

    @observable isPrompt = false; // 编辑页面离开
    @observable codeBlockContent = ''   // 代码块内容
    @observable codeName = '' // 源码管理git地址
    @observable codeBranch = '' // 源码管理git分支

    @action
    setIsPrompt = value => {
        this.isPrompt = value;
    }

    @action
    setCodeBlockContent = value =>{
        this.codeBlockContent = value
    }

    @action
    setCodeName = value =>{
        this.codeName = value
    }

    @action
    setCodeBranch = value =>{
        this.codeBranch = value
    }

}

export default ConfigCommonStore

import {action, observable} from "mobx";

class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = '' // 源码管理需要渲染的值
    @observable codeBlockContent = ''   // linux--shell代码块内容
    @observable codeName = '' // 源码管理git地址
    @observable codeBranch = '' // 源码管理git分支

    @action
    setIsPrompt = value => {
        this.isPrompt = value;
    }

    @action
    setFormInitialValues = value =>{
        this.formInitialValues = value
    }

    @action
    setData = value =>{
        this.data = value
    }

    @action
    setCodeData = value =>{
        this.codeData = value
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

    constructor(store) {
        this.store = store
    }

}

export default ConfigDataStore

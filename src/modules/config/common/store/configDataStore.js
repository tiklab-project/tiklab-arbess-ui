import {action, observable, values} from "mobx";

class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = '' // 源码管理需要渲染的值
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

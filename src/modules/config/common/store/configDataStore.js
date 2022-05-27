import {action, observable} from "mobx";

export class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开是否提示
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = '' // 源码管理需要渲染的值
    @observable codeName = '' // 源码管理git地址
    @observable codeBranch = '' // 源码管理git分支
    @observable shellBlock = '' // linux部署--shell命令

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

    @action
    setShellBlock = value =>{
        this.shellBlock = value
    }

}

export const CONFIGDATA_STORE = 'configDataStore'

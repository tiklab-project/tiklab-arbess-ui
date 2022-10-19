import {action,observable} from "mobx";

export class ConfigDataStore {

    @observable isPrompt = false // 编辑页面离开是否提示
    @observable isPlugin = false // 是否存在插件
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeType = "" // 源码管理类型
    @observable buildType = "" 
    @observable deployType = ""
    @observable gitProofId = ""
    @observable deployProofId = ""
    @observable unitShellBlock = ""

    @observable buildShellBlock = ""

    @observable virShellBlock = ""

    @observable deployShellBlock = ""

    @observable deployOrderShellBlock = ""

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    setIsPrompt = value => {
        this.isPrompt = value
    }

    @action
    setCodeType = value =>{
        this.codeType = value
    }

    @action
    setBuildType = value => {
        this.buildType = value
    }

    @action
    setDeployType = value => {
        this.deployType = value
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
    setUnitShellBlock = value =>{
        this.unitShellBlock = value
    }

    @action
    setBuildShellBlock = value =>{
        this.buildShellBlock = value
    }

    @action
    setVirShellBlock = value =>{
        this.virShellBlock = value
    }

    @action
    setDeployShellBlock = value =>{
        this.deployShellBlock = value
    }

    @action
    setDeployOrderShellBlock = value =>{
        this.deployOrderShellBlock = value
    }

    @action
    setGitProofId = value =>{
        this.gitProofId = value
    }

    @action
    setDeployProofId = value =>{
        this.deployProofId = value
    }

}

export const CONFIGDATA_STORE = "configDataStore"
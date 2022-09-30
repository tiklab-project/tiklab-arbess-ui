import {action, observable} from "mobx";

export class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开是否提示
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable isGuiAlias = "" // 更改别名--图形
    @observable codeType = "" // 源码管理类型
    @observable unitShellBlock = ""
    @observable mavenShellBlock = ""
    @observable nodeShellBlock = ""
    @observable gitProofId = ""
    @observable deployProofId = ""
    @observable isPlugin = false // 是否存在插件
    @observable isMavenOrNode = ""
    @observable isVirOrDocker = ""
    @observable orderShellBlock = ""
    @observable shellBlock = ""
    @observable linuxShellBlock = ""

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    setIsPrompt = value => {
        this.isPrompt = value
    }

    @action
    setIsMavenOrNode = value => {
        this.isMavenOrNode = value
    }

    @action
    setIsVirOrDocker = value => {
        this.isVirOrDocker = value
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
    setIsGuiAlias = value =>{
        this.isGuiAlias = value
    }

    @action
    setCodeType = value =>{
        this.codeType = value
    }

    @action
    setLinuxShellBlock = value =>{
        this.linuxShellBlock = value
    }

    @action
    setShellBlock = value =>{
        this.shellBlock = value
    }

    @action
    setUnitShellBlock = value =>{
        this.unitShellBlock = value
    }

    @action
    setMavenShellBlock = value =>{
        this.mavenShellBlock = value
    }

    @action
    setNodeShellBlock = value =>{
        this.nodeShellBlock = value
    }

    @action
    setOrderShellBlock = value =>{
        this.orderShellBlock = value
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

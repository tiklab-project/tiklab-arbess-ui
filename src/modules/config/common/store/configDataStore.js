import {action, observable} from "mobx";

export class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开是否提示
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = "" // 源码管理需要渲染的值
    @observable isFormAlias = "" // 更改别名--表单
    @observable isGuiAlias = "" // 更改别名--图形
    @observable codeType = 1 // 源码管理类型
    @observable linuxShellBlock = "" // 结构化启动命令
    @observable shellBlock = ""  // 自定义启动命令
    @observable unitShellBlock = ""
    @observable mavenShellBlock = ""
    @observable orderShellBlock = ""  // 部署文件命令
    @observable gitProofId = ""
    @observable deployProofId = ""
    @observable isPlugin = false

    @action
    setIsPlugin = value =>{
        this.isPlugin = value
    }

    @action
    setIsPrompt = value => {
        this.isPrompt = value
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
    setIsFormAlias = value =>{
        this.isFormAlias = value
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

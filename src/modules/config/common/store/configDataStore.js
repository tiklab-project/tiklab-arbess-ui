import {action, observable} from "mobx";

export class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开是否提示
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = '' // 源码管理需要渲染的值
    @observable isAlias = '' // 更改别名--显示对应文本框
    @observable codeType = 1 // 源码管理类型
    @observable linuxShellBlock = ''
    @observable unitShellBlock = ''
    @observable mavenShellBlock = ''

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
    setIsAlias = value =>{
        this.isAlias = value
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
    setUnitShellBlock = value =>{
        this.unitShellBlock = value
    }

    @action
    setMavenShellBlock = value =>{
        this.mavenShellBlock = value
    }

}

export const CONFIGDATA_STORE = 'configDataStore'

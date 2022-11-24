import {action,observable} from "mobx";

export class ConfigDataStore {

    @observable formInitialValues = {} //表单初始化

    @observable codeType = "" // 源码管理类型
    @observable testType = ""
    @observable buildType = "" 
    @observable deployType = ""
    @observable scanType = ""
    @observable goodsType = ""

    @observable unitShellBlock = ""

    @observable buildShellBlock = ""
    @observable virShellBlock = ""
    @observable deployShellBlock = ""
    @observable deployOrderShellBlock = ""

    @observable addConfigVisible = false

    @action
    setAddConfigVisible = value =>{
        this.addConfigVisible = value
    }

    @action
    setCodeType = value =>{
        this.codeType = value
    }

    @action
    setTestType = value =>{
        this.testType = value
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
    setScanType = value => {
        this.scanType = value
    }

    @action
    setGoodsType = value => {
        this.goodsType = value
    }

    @action
    setFormInitialValues = value =>{
        this.formInitialValues = value
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

}

export const CONFIGDATA_STORE = "configDataStore"

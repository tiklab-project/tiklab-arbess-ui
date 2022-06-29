import {action, observable} from "mobx";
import {CodeTestPass} from "../api/config";

export class ConfigDataStore {

    @observable isPrompt = false; // 编辑页面离开是否提示
    @observable formInitialValues = {} //表单初始化
    @observable data = [] // 新阶段、新任务需要渲染的值
    @observable codeData = "" // 源码管理需要渲染的值
    @observable isFormAlias = "" // 更改别名--表单
    @observable isGuiAlias = "" // 更改别名--图形
    @observable codeType = 1 // 源码管理类型
    @observable linuxShellBlock = ""
    @observable unitShellBlock = ""
    @observable mavenShellBlock = ""

    @action
    setIsPrompt = value => {
        this.isPrompt = value;
    }

    @action
    setFormInitialValues = value =>{
        this.formInitialValues = Object(value)
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
    setUnitShellBlock = value =>{
        this.unitShellBlock = value
    }

    @action
    setMavenShellBlock = value =>{
        this.mavenShellBlock = value
    }

    @action
    codeTestPass = values =>{
        const params = {
            proofId:values.proofId,
            url:values.url,
            port:values.port,
            type:values.type,
        }
        return new Promise((resolve, reject) => {
            CodeTestPass(params).then(res=>{
                console.log("测试配置",res)
                resolve(res)
            }).catch(error=>{
                console.log(error)
                reject()
            })
        })
    }

}

export const CONFIGDATA_STORE = "configDataStore"

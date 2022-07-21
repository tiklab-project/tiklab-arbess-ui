import {observable,action} from "mobx";

export class StructureListStore{

    @observable state = 0  //状态
    @observable enforcer = null //执行人
    @observable mode = 0  //执行方式
    @observable pageCurrent = 1 // 筛选时，设置当前页数初始化
    @observable freshen = false  // 渲染页面
    @observable drop = false // 渲染下拉框

    @action
    setState = value =>{
        this.state = value
    }

    @action
    setEnforcer = value =>{
        this.enforcer = value
    }

    @action
    setMode = value =>{
        this.mode = value
    }

    @action
    setPageCurrent = value =>{
        this.pageCurrent = value
    }

    @action
    setFreshen = value =>{
        this.freshen = value
    }

    @action
    setDrop = value =>{
        this.drop = value
    }

}

export const STRUCTURELIST_STORE = "structureListStore"
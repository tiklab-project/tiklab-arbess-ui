import {action,observable} from "mobx";

export class StructureDataStore {

    @observable leftExecute = ''  //左--正在构建
    @observable leftData = []  //左--历史构建列表
    @observable rightData = []  //右--数据
    @observable rightExecute = []  //右--数据
    @observable modeData = []  //历史列表的里面的内容

    @action
    setLeftExecute = value =>{
        this.leftExecute = value
    }

    @action
    setLeftData = value =>{
        this.leftData = value
    }

    @action
    setRightData = value =>{
        this.rightData = value
    }

    @action
    setRightExecute = value =>{
        this.rightExecute = value
    }

    @action
    setModeData = value =>{
        this.modeData = value
    }
}

export const STRUCTUREDATA_STORE = 'structureDataStore'

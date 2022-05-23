import {action,observable} from "mobx";

class StructureDataStore {

    @observable leftExecute = ''  //左--正在构建
    @observable leftData = []  //左--历史构建列表
    @observable rightExecute = []  //右--正在构建
    @observable rightData = []  //右--历史构建列表的构建详情步骤
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
    setRightExecute = value =>{
        this.rightExecute = value
    }

    @action
    setRightData = value =>{
        this.rightData = value
    }

    @action
    setModeData = value =>{
        this.modeData = value
    }

    constructor(store) {
        this.store = store
    }
}

export default StructureDataStore
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-27 15:54:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-22 09:14:36
 */
import { observable, action} from "mobx";

export class SlateStore {
    @observable selection = [];
    @observable editorType = "";
    @observable workModalVisible = false;
    @observable operationType = ""
    @observable selectPath = [];
    @observable selectRange = []
    @action
    setSelection = (data)=> {
        this.selection = data;
    }

    @action
    setEditorType = (data)=> {
        this.editorType = data;
    }
    @action
    setWorkModalVisible = (data)=> {
        this.workModalVisible = data;
    }
    @action
    setOperationType = (data) => {
        this.operationType = data;
    }

    @action
    setSelectPath = (data) => {
        this.selectPath = data;
    }

    @action
    setSelectRange = (data) => {
        this.selectRange = data;
    }
}
export const SLATE_STORE = "slatestore"
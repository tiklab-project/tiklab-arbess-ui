/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-13 15:42:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 15:52:25
 */
import { observable, action} from "mobx";
class EditorStore {
    @observable isModalVisible = false;
    /**
     * 设置迭代id
     * @param {*} id 
     */
    @action
    setIsModalVisible = (data)=> {
        this.isModalVisible = data;
    }
}
export default EditorStore;

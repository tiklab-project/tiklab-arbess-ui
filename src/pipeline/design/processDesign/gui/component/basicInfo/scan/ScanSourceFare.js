/**
 * @Description: sourceFare
 * @Author: gaomengyuan
 * @Date: 2025/5/29
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/29
 */
import React from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import FormsTool from "../FormsTool";
import {toolSourceFareScanner} from "../../../../../../../common/utils/Constant";

const ScanSourceFare = props =>{

    const {taskStore} = props;

    const {updateTask} = taskStore;

    /**
     * 更新sourceFare扫描数据
     */
    const changSourceFare = (value,type) =>{
        updateTask({[type]:value})
    }

    return (
        <>
           <FormsTool scmType={toolSourceFareScanner}/>
        </>
    )
}

export default observer(ScanSourceFare)

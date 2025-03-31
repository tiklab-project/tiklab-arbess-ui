/**
 * @Description: SonarQuebe代码扫描
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/28
 */
import React from "react";
import {Select} from "antd";
import {observer} from "mobx-react";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import FormsTool from "../FormsTool";
import {toolJdk, toolMaven} from "../../../../../../../common/utils/Constant";

const ScanSpotbugs = props =>{

    const {taskStore} = props

    const {updateTask} = taskStore

    const changSpotbugs = (value,type) =>{
        updateTask({[type]:value})
    }

    return(
        <>
            <FormsTool
                scmType={toolJdk}
            />
            <FormsTool
                scmType={toolMaven}
            />
            <FormsInput
                name={"scanPath"}
                placeholder={"扫描路径"}
                label={"扫描路径"}
                isRequire={true}
            />
            <FormsSelect
                name={"openDebug"}
                label="是否启用调试模式"
                onChange={value=>changSpotbugs(value,"openDebug")}
            >
                <Select.Option value={false}>否</Select.Option>
                <Select.Option value={true}>是</Select.Option>
            </FormsSelect>
            <FormsSelect
                name={"openAssert"}
                label="是否扫描断言"
                onChange={value=>changSpotbugs(value,"openAssert")}
            >
                <Select.Option value={false}>否</Select.Option>
                <Select.Option value={true}>是</Select.Option>
            </FormsSelect>
            <FormsSelect
                name={"scanGrade"}
                label="扫描等级"
                onChange={value=>changSpotbugs(value,"scanGrade")}
            >
                <Select.Option value={"min"}>最小</Select.Option>
                <Select.Option value={"default"}>默认</Select.Option>
                <Select.Option value={"max"}>最大</Select.Option>
            </FormsSelect>
            <FormsSelect
                name={"errGrade"}
                label="扫描错误级别"
                onChange={value=>changSpotbugs(value,"errGrade")}
            >
                <Select.Option value={"default"}>默认</Select.Option>
                <Select.Option value={"max"}>最大</Select.Option>
            </FormsSelect>
        </>
    )
}
export default observer(ScanSpotbugs)


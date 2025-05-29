/**
 * @Description: SonarQube代码扫描
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/5/16
 */
import React from "react";
import FormsInput from "../FormsInput";
import FormsAuth from "../FormsAuth";
import FormsTool from "../FormsTool";
import {toolJdk, toolMaven, toolSonarScanner} from "../../../../../../../common/utils/Constant";
import FormsSelect from "../FormsSelect";
import {Select} from "antd";
import {observer} from "mobx-react";

const ScanSonarQube = props =>{

    const {taskStore} = props;

    const {updateTask,dataItem} = taskStore;

    /**
     * 扫码语言
     * @param value
     * @param type
     */
    const changCodeType = (value,type) => {
        updateTask({[type]:value})
    }

    return(
        <>
            <FormsSelect
                name={"codeType"}
                label="扫描代码语言"
                onChange={value=>changCodeType(value,'codeType')}
            >
                <Select.Option value={'java'}>Java</Select.Option>
                <Select.Option value={'other'}>其他</Select.Option>
            </FormsSelect>
            {
                dataItem?.task?.codeType === 'java' ?
                    <>
                        <FormsTool
                            scmType={toolJdk}
                        />
                        <FormsTool
                            scmType={toolMaven}
                        />
                    </>
                    :
                    <FormsTool
                        scmType={toolSonarScanner}
                    />
            }
            <FormsInput
                name={"projectName"}
                placeholder={"项目名称"}
                label={"项目名称"}
                isRequire={true}
            />
            <FormsInput
                name={"scanPath"}
                placeholder={"扫描代码地址"}
                label={"扫描代码地址"}
                isRequire={true}
            />
            <FormsAuth />
        </>
    )
}

export default observer(ScanSonarQube)


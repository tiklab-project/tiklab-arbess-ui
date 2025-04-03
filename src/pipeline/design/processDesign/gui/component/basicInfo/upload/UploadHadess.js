/**
 * @Description: hadess上传
 * @Author: gaomengyuan
 * @Date: 2025/4/2
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/2
 */
import React from "react";
import FormsInput from "../FormsInput";
import {observer} from "mobx-react";
import FormsAuth from "../FormsAuth";

const UploadHadess = (props) => {

    return (
        <>
            <FormsAuth />
            <FormsInput
                name={"fileAddress"}
                placeholder={"文件"}
                label={"文件"}
                isRequire={true}
            />
            <FormsInput
                name={"rule"}
                placeholder={"文件匹配规则"}
                label={"文件匹配规则"}
            />
            <FormsInput
                name={"version"}
                placeholder={"版本"}
                label={"版本"}
                isRequire={true}
            />
        </>
    )
}

export default observer(UploadHadess)

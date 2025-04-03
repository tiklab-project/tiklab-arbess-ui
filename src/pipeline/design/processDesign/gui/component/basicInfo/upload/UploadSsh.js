/**
 * @Description: ssh上传
 * @Author: gaomengyuan
 * @Date: 2025/4/2
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/2
 */
import React from "react";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

const UploadSsh = (props) => {

    return (
        <>
            <FormsAuth />
            <FormsInput
                name={"putAddress"}
                placeholder={"上传位置"}
                label={"上传位置"}
                isRequire={true}
            />
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
        </>
    )
}

export default UploadSsh

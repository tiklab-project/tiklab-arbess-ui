/**
 * @Description: hadess下载
 * @Author: gaomengyuan
 * @Date: 2025/4/2
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/2
 */
import React from "react";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";
import FormsSelect from "../FormsSelect";
import {Select} from "antd";

const DownloadHadess = (props) => {

    return (
        <>
            <FormsAuth />
            <FormsInput
                name={"artifactName"}
                label={"制品名称"}
                placeholder={"制品名称"}
                isRequire={true}
            />
            <FormsInput
                name={"version"}
                placeholder={"版本"}
                label={"版本"}
                isRequire={true}
            />
            <FormsInput
                name={"localAddress"}
                label={"保存位置"}
                placeholder={"保存位置"}
                isRequire={true}
            />
        </>
    )
}

export default DownloadHadess

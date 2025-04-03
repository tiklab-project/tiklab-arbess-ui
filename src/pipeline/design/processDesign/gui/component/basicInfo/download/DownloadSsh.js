/**
 * @Description: ssh下载
 * @Author: gaomengyuan
 * @Date: 2025/4/2
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/4/2
 */
import React from "react";
import FormsAuth from "../FormsAuth";
import FormsInput from "../FormsInput";

const DownloadSsh = () => {

    return (
        <>
            <FormsAuth />
            <FormsInput
                name={"remoteAddress"}
                placeholder={"拉取文件"}
                label={"拉取文件"}
                isRequire={true}
            />
            <FormsInput
                name={"localAddress"}
                placeholder={"保存位置"}
                label={"保存位置"}
                isRequire={true}
            />
        </>
    )
}

export default DownloadSsh

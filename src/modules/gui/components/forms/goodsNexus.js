import React from "react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";
import {inject,observer} from "mobx-react";

const GoodsNexus = props => {

    const {configDataStore}=props
    const {goodsType} = configDataStore

    return(
        <>
            <Inputs
                placeholder={"groupId"}
                label={"groupId"}
                name={"groupId"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                placeholder={"artifactId"}
                label={"artifactId"}
                name={"artifactId"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                placeholder={"version"}
                label={"version"}
                name={"version"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                placeholder={"文件类型"}
                label={"文件类型"}
                name={"fileType"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                name={"fileAddress"}
                mode={goodsType}
                isValid={true}
            />
            <FindAuth
                type={goodsType}
            />
        </>
    )
}

export default inject("configDataStore")(observer(GoodsNexus))
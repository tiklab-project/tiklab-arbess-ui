import React from "react";
import Inputs from "./inputs";
import FindAuth from "./findAuth";
import {inject,observer} from "mobx-react";

const GoodsNexus = props => {

    const {configDataStore}=props
    const {goodsType} = configDataStore

    return(
        <>
            <Inputs
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                name={"version"}
                placeholder={"version"}
                label={"version"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                mode={goodsType}
                isValid={true}
            />
            <Inputs
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
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
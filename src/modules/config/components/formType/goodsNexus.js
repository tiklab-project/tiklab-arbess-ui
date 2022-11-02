import React from "react";
import Inputs from "./inputs";
import FindAllProof from "./findAllProof";
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
                placeholder={"文件绝对路径"}
                label={"文件地址"}
                name={"fileAddress"}
                mode={goodsType}
                isValid={true}
            />
            <FindAllProof
                type={goodsType}
            />
        </>
    )
}

export default inject("configDataStore")(observer(GoodsNexus))
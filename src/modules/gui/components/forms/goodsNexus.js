import React from "react";
import Inputs from "./inputs";
import FindAuth from "../auth/findAuth";
import {inject,observer} from "mobx-react";

const GoodsNexus = props => {

    const {dataItem} = props

    return(
        <>
            <Inputs
                placeholder={"groupId"}
                label={"groupId"}
                name={"groupId"}
                dataItem={dataItem}
                isValid={true}
            />
            <Inputs
                placeholder={"artifactId"}
                label={"artifactId"}
                name={"artifactId"}
                dataItem={dataItem}
                isValid={true}
            />
            <Inputs
                placeholder={"version"}
                label={"version"}
                name={"version"}
                dataItem={dataItem}
                isValid={true}
            />
            <Inputs
                placeholder={"文件类型"}
                label={"文件类型"}
                dataItem={dataItem}
                isValid={true}
            />
            <Inputs
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                name={"fileAddress"}
                dataItem={dataItem}
                isValid={true}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default GoodsNexus
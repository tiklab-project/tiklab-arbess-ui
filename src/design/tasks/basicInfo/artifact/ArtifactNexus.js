import React from "react";
import Inputs from "../Inputs";
import FindAuth from "../FindAuth";

const ArtifactNexus = props => {

    const {dataItem}=props

    return(
        <>
            <Inputs
                name={"groupId"}
                placeholder={"groupId"}
                label={"groupId"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                name={"artifactId"}
                placeholder={"artifactId"}
                label={"artifactId"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                name={"version"}
                placeholder={"version"}
                label={"version"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                name={"fileType"}
                placeholder={"文件类型"}
                label={"文件类型"}
                isValid={true}
                dataItem={dataItem}
            />
            <Inputs
                name={"fileAddress"}
                placeholder={"文件的唯一标识，如:Jar,zip等（支持正则表达式）"}
                label={"部署文件"}
                isValid={true}
                dataItem={dataItem}
            />
            <FindAuth dataItem={dataItem}/>
        </>
    )
}

export default ArtifactNexus

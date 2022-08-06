import React from "react";
import ConfigCodeOrNewStage from "./configCodeOrNewStage";

const lis=[
    {
        id:1,
        title:"Git",
        desc:[
            {
                type:1,
                tel:"通用Git"
            },
            {
                type:2,
                tel:"Gitee"
            },
            {
                type:4,
                tel: "Gitlab"
            },
            {
                type:3,
                tel: "Github"
            }
        ]
    },
    {
        id:2,
        title:"SVN",
        desc: [
            {
                type:5,
                tel:"SVN"
            }
        ]
    }
]

const ConfigAddCodeModal = props =>{

    const {setCodeData,codeVisible,setCodeVisible,setIsPrompt,setCodeType} = props

    const handleClick = (group,item,index) =>{
        let newCode
        newCode = {
            codeId:index,
            codeType:item.type,
        }
        setCodeData(newCode)
        setCodeType(item.type)
        setCodeVisible(false)
        setIsPrompt(true)
    }

    return  <ConfigCodeOrNewStage
                lis={lis}
                handleClick={handleClick}
                visible={codeVisible}
                setVisible={setCodeVisible}
            />
}

export default ConfigAddCodeModal
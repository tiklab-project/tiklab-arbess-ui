import React from "react";
import ConfigCodeOrNewStage from "./configCodeOrNewStage";

const lis=[
    {
        id:1,
        title:"Git",
        desc:[
            {
                type:1,
                tel:"通用Git",
                icon:"git"
            },
            {
                type:2,
                tel:"Gitee",
                icon:"gitee"
            },
            {
                type:4,
                tel: "Gitlab",
                icon:"gitlab"
            },
            {
                type:3,
                tel: "Github",
                icon:"github"
            }
        ]
    },
    {
        id:2,
        title:"SVN",
        desc: [
            {
                type:5,
                tel:"SVN",
                icon:"-_ssh"
            }
        ]
    }
]

const ConfigCodeAddModal = props =>{

    const {codeVisible,setCodeVisible,setIsPrompt,setCodeType} = props

    const handleClick = (group,item,index) =>{
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

export default ConfigCodeAddModal
import React from "react";
import CodeOrNewStageModal from "./codeOrNewStageModal";

const lis=[
    {
        id:1,
        title:"Git",
        icon:"suyuanmabiaoqian",
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
        id:1,
        title:"SVN",
        icon:"-_ssh",
        desc: [
            {
                type:5,
                tel:"SVN",
                icon:"-_ssh"
            }
        ]
    }
]

const CodeAddModal = props =>{

    const {codeVisible,setCodeVisible} = props

    return  <CodeOrNewStageModal
                lis={lis}
                visible={codeVisible}
                setVisible={setCodeVisible}
            />
}

export default CodeAddModal
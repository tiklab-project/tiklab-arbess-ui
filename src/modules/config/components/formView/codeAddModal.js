import React,{useState} from "react";
import AddModal from "./addModal";

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
                type:3,
                tel: "Github",
                icon:"github"
            },
            {
                type:4,
                tel: "Gitlab",
                icon:"gitlab"
            }
        ]
    },
    {
        id:2,
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
    const [codeInitType,setCodeInitType] = useState(1)

    return  <AddModal
                lis={lis}
                visible={codeVisible}
                setVisible={setCodeVisible}
                initType={codeInitType}
                setInitType={setCodeInitType}
            />
}

export default CodeAddModal
import React from "react";
import {message} from "antd";
import CodeOrNewStageModal from "./codeOrNewStageModal";

const lis=[
    {
        id:2,
        title:"测试",
        desc:[
            {
                type: 11,
                tel:"单元测试",
                icon:"ceshi"
            }
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {

                type: 21,
                tel:"maven",
                icon:"quanxian"
            },
            {
                type: 22,
                tel:"node",
                icon:"nodejs"
            }
        ]
    },
    {
        id:4,
        title: "部署",
        desc:[
            {
                type:31 ,
                tel:"虚拟机",
                icon:"xuniji"
            },
            {
                type:32 ,
                tel:"docker",
                icon:"docker"
            },
        ]
    }
]

const NewStageAddModal = props =>{

    const {newStageVisible,setNewStageVisible} = props

    return   <CodeOrNewStageModal
                 lis={lis}
                 visible={newStageVisible}
                 setVisible={setNewStageVisible}
            />
}

export default NewStageAddModal
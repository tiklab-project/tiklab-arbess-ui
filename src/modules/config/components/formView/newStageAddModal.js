import React,{useState} from "react";
import AddModal from "./addModal";

const lis=[
    {
        id:1,
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
        id:2,
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
        id:3,
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
    const [newStageInitType,setNewStageInitType] = useState(11)

    return   <AddModal
                 lis={lis}
                 visible={newStageVisible}
                 setVisible={setNewStageVisible}
                 initType={newStageInitType}
                 setInitType={setNewStageInitType}
            />
}

export default NewStageAddModal
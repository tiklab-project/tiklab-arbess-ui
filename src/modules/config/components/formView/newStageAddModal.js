import React from "react";
import {message} from "antd";
import CodeOrNewStage from "./codeOrNewStage";

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
            // {
            //     type:33,
            //     tel:"本机"
            // }
        ]
    }
]

const NewStageAddModal = props =>{

    const {pipelineId,updateConfigure,newStageVisible,setNewStageVisible,data,setData,setBuildType,setDeployType} = props

    const handleClick = (group,item,index)=>{
        const newData = [...data]
        const name = data && data.map(item => item.dataType)
        const groupDesc = group.desc.map(item=>item.type)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] === groupDesc[j]){
                    message.info({content:`${group.title}已经存在`,className:"message"})
                    return
                }
            }
        } 
        if(group.id===2){
            setBuildType(item.type)
        }
        else if(group.id===3){
            setDeployType(item.type)
        }
        newData.push({
            dataId:index,
            dataType:item.type
        })
        const params = {
            pipelineId:pipelineId,
            taskType:item.type,
            message:"create"
        }
        updateConfigure(params)
        setData(newData)
        setNewStageVisible(false)
    }

    return   <CodeOrNewStage
                 lis={lis}
                 handleClick={handleClick}
                 visible={newStageVisible}
                 setVisible={setNewStageVisible}
            />
}

export default NewStageAddModal
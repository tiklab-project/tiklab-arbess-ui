import React from "react";
import {message} from "antd";
import ConfigCodeOrNewStage from "./configCodeOrNewStage";

const lis=[
    {
        id:1,
        title:"测试",
        desc:[
            {
                type: 11,
                tel:"单元测试",
            }
        ]
    },
    {
        id:2,
        title: "构建",
        desc:[
            {

                type: 21,
                tel:"maven"
            },
            {
                type: 22,
                tel:"node"
            }
        ]
    },
    {
        id:3,
        title: "部署",
        desc:[
            {
                type:31 ,
                tel:"虚拟机"
            },
            {
                type:32 ,
                tel:"docker"
            },
            // {
            //     type:33,
            //     tel:"本机"
            // }
        ]
    }
]

const ConfigAddNewStageModal = props =>{

    const {newStageVisible,setNewStageVisible,data,setData,setIsPrompt} = props

    const handleClick = (group,item,index)=>{
        const newData = [...data]
        const name = data && data.map(item => item.dataType);
        const groupDesc = group.desc.map(item=>item.type)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] === groupDesc[j]){
                    message.info({
                        content: `${group.title}已经存在`,
                        style: {
                            marginTop: "9vh",
                            marginLeft:"5vh"
                        }
                    }) 
                    return
                }
            }
        } 
        newData.push({
            dataId:index,
            title:group.title,
            dataType:item.type
        })
        setData(newData)
        setIsPrompt(true)
        setNewStageVisible(false) 
    }

    return   <ConfigCodeOrNewStage
                 lis={lis}
                 handleClick={handleClick}
                 visible={newStageVisible}
                 setVisible={setNewStageVisible}
            />
}

export default ConfigAddNewStageModal
import React,{useContext} from "react";
import {message} from "antd";
import TestContext from "./testContext";
import ConfigStore from "../../store/configStore";
import {observer} from "mobx-react";

const NewStageAddDrawerRight = props =>{

    const {rightLis,onScroll,setNewStageDrawer,setTaskFormDrawer,setNewStage,index} = props

    const {updateConfigure} = ConfigStore

    const context = useContext(TestContext)
    const {setBuildType,setDeployType,data,setData} = context.configDataStore
    const pipelineId = context.pipelineId

    const handleClick = (group,item,i) =>{
        const newData = [...data]
        const name = data && data.map(item => item.dataType)
        const groupDesc = group.desc.map(item=>item.type)
        for(let i =0;i<name.length;i++){
            for(let j=0;j<groupDesc.length;j++){
                if(name[i] === groupDesc[j]){
                    message.info({
                        content: `${group.title}已经存在`,
                        className: "custom-class",
                        style: {
                            marginTop: "9vh",
                            marginLeft:"5vh"
                        }
                    })
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
        const params = {
            pipelineId,
            taskType:item.type,
            message:"create"
        }
        updateConfigure(params)
        if(index === ""){
            newData.push({
                dataId:i,
                dataType:item.type
            })
        }else {
            newData.splice(index,0,{
                dataId:i,
                dataType:item.type
            })
        }
        setData(newData)
        setNewStageDrawer(false)
        setTaskFormDrawer(true)
        setNewStage(item.type)
    }

    return(
        <div className="body-menu_right" id="tpl-list-task" onScroll={onScroll}>
            <div className="wrap" >
                {
                    rightLis && rightLis.map((group,groupIndex)=>{
                        return(
                            <div className="group" key={group.id} id={groupIndex+1}>
                                <div className="group-title">{group.title}</div>
                                <div className="group-content">
                                    {
                                        group.desc &&  group.desc.map((item,index)=>{
                                            return(
                                                <div key={index}
                                                     className="group-desc"
                                                     onClick={()=>handleClick(group,item,groupIndex)}
                                                >
                                                    <div className="group-desc-tpl">
                                                        <div className="group-tpl">{item.tel}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default observer(NewStageAddDrawerRight)
import React,{useState} from "react";
import {Modal,message} from "antd";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./codeOrNewStageModal.scss";
import {inject,observer} from "mobx-react";

const CodeOrNewStageModal = props =>{

    const {lis,configDataStore,configStore,pipelineStore,setVisible,visible} = props

    const {setCodeType,setBuildType,setDeployType,data,setData} = configDataStore
    const {updateConfigure} = configStore
    const {pipelineId} = pipelineStore


    const handleClick = (group,item,index) =>{
        const params = {
            pipeline:{pipelineId},
            taskType:item.type,
            message:"create"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                add(group,item,index)
            }
            else if(res.code===50001){
                message.info(res.msg)
            }
        })
        setVisible(false)
    }

    const newData = [...data]
    const add = (group,item,index) =>{
        switch (group.id) {
            case 1 :
                setCodeType(item.type)
                break
            case 3 :
                setBuildType(item.type)
                addData(item,index)
                break
            case 4 :
                addData(item,index)
                setDeployType(item.type)
                break
            default:
                addData(item,index)
        }
    }
    
    const addData = (item,index) =>{
        newData.push({
            dataId:index,
            dataType:item.type
        })
        setData([...newData])
    }

    const renderLis = lis =>{
        return lis && lis.map(group=>{
            return  <div className="group" key={group.title}>
                        <div className="group-title">
                            <span>{group.title}</span>
                        </div>
                        <div className="group-content">
                            {
                                group.desc.map((item,index)=>{
                                    return <div onClick={()=>handleClick(group,item,index)}
                                                className="group-desc"
                                                key={item.type}
                                            >
                                                <div className="group-desc-tpl">
                                                    <div className="group-tpl">
                                                        <span>
                                                            <svg className="icon" aria-hidden="true">
                                                                <use xlinkHref={`#icon-${item.icon}`}/>
                                                            </svg>
                                                        </span>
                                                       <span>
                                                           {item.tel}
                                                       </span>
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
        })
    }

    return(
        <Modal
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={[]}
            closable={false}
        >
            <ModalTitle
                setVisible={setVisible}
                title={"选择任务组"}
            />
            <div className="codeOrNewStage">
                {renderLis(lis)}
            </div>
        </Modal>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(CodeOrNewStageModal))
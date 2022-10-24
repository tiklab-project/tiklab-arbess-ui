import React,{useState} from "react";
import {Modal,message} from "antd";
import {inject,observer} from "mobx-react";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./addModal.scss";
import AddModalStepOne from "./addModalStepOne";

const lis=[
    {
        id:1,
        title:"源码",
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
            },
            {
                type: 5,
                tel:"svn",
                icon:"-_ssh"
            }
        ]
    },
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

const AddModal = props =>{

    const {configDataStore,configStore,pipelineStore,setAddConfigVisible,addConfigVisible} = props

    const {setCodeType,setBuildType,setDeployType,data,setData} = configDataStore

    const {updateConfigure,setEnabledValid,enabledValid} = configStore
    const {pipelineId} = pipelineStore

    const [type,setType] = useState(1) // 左侧
    const [initType,setInitType] = useState(1)  // 右侧
    
    // 保存
    const onOk = () => {
        const params = {
            pipeline:{pipelineId},
            message:"create",
            taskType:initType,
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                add(initType)
            }
            if(res.code===50001){
                message.info(res.msg)
            }
        })
        setAddConfigVisible(false)
    }


    const add = type =>{
        setEnabledValid(!enabledValid)
        if(type>0 && type<10){
            setCodeType(type)
        }else if(type>10 && type<20){
            addData(type)
        }
        else if(type>20 && type<30){
            setBuildType(type)
            addData(type)
        }else if(type>30 && type<40){
            setDeployType(type)
            addData(type)
        }
    }

    const newData = [...data]
    const addData = type =>{
        if(type>10){
            newData.push({
                dataId:type,
                dataType:type
            })
            setData([...newData])
        }
    }

    return(
        <Modal
            visible={addConfigVisible}
            onCancel={()=>setAddConfigVisible(false)}
            closable={false}
            onOk={()=>onOk()}
            width={800}
        >
            <ModalTitle
                setVisible={setAddConfigVisible}
                title={"选择任务组"}
            />
            <div className="codeOrNewStage">
                <AddModalStepOne
                    lis={lis}
                    type={type}
                    setType={setType}
                    initType={initType}
                    setInitType={setInitType}
                />
            </div>
        </Modal>
    )
}

export default inject("configDataStore","configStore","pipelineStore")(observer(AddModal))
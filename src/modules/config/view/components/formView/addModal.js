import React,{useState,useEffect} from "react";
import {Modal,message} from "antd";
import {inject,observer} from "mobx-react";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./addModal.scss";
import AddModalStepOne from "./addModalStepOne";
import Btn from "../../../../common/btn/btn";
import {autoHeight} from "../../../../common/client/client";

const lis=[
    {
        id:1,
        title:"源码",
        icon:"suyuanmabiaoqian",
        desc:[
            {type:1},
            {type:2},
            {type:3},
            {type:4},
            {type:5}
        ]
    },
    {
        id:5,
        title: "代码扫描",
        desc: [
            {type: 41}
        ]
    },
    {
        id:2,
        title:"测试",
        desc:[
            {type: 11},
            // {
            //     type: 12,
            // }
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {type: 21},
            {type: 22},
            // {
            //     type: 23,
            // }
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {type:51},
            {type:52},
        ]
    },
    {
        id:4,
        title: "部署",
        desc:[
            {type:31},
            {type:32},
        ]
    },
]

const AddModal = props =>{

    const {configStore,pipelineStore,setAddConfigVisible,addConfigVisible} = props

    const {createConfig} = configStore
    const {pipelineId} = pipelineStore

    const [type,setType] = useState(1) // 左侧
    const [initType,setInitType] = useState(1)  // 右侧
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    // 保存
    const onOk = () => {
        const params = {
            pipeline:{pipelineId},
            taskType:initType,
        }
        createConfig(params)
        setAddConfigVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setAddConfigVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={onOk}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    return(
        <Modal
            closable={false}
            visible={addConfigVisible}
            onCancel={()=>setAddConfigVisible(false)}
            footer={modalFooter}
            width={800}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="codeOrNewStage">
                <div className="codeOrNewStage-top">
                    <ModalTitle
                        setVisible={setAddConfigVisible}
                        title={"选择任务组"}
                    />
                </div>
                <div className="codeOrNewStage-content">
                    <AddModalStepOne
                        lis={lis}
                        type={type}
                        setType={setType}
                        initType={initType}
                        setInitType={setInitType}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default inject("configStore","pipelineStore")(observer(AddModal))
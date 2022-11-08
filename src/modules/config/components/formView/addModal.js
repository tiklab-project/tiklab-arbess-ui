import React,{useState,useEffect} from "react";
import {Modal,message} from "antd";
import {inject,observer} from "mobx-react";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import "./addModal.scss";
import AddModalStepOne from "./addModalStepOne";
import Btn from "../../../../common/btn/btn";

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
        id:5,
        title: "代码扫描",
        desc: [
            {
                type: 41,
                tel:"sonarQuebe",
                icon:"ceshi"
            }
        ]
    },
    {
        id:2,
        title:"测试",
        desc:[
            {
                type: 11,
                tel:"maven单元测试",
                icon:"ceshi"
            },
            {
                type: 12,
                tel: "junit",
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
            },
            {
                type: 23,
                tel:"gradel",
                icon:"nodejs"
            }
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {
                type:51,
                tel:"nexus",
                icon: "quanxian"
            },
            {
                type:52,
                tel:"SSH",
                icon: "quanxian"
            },
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
    },
]

const AddModal = props =>{

    const {configDataStore,configStore,pipelineStore,setAddConfigVisible,addConfigVisible} = props

    const {setCodeType,setBuildType,setDeployType,setTestType,setScanType,setGoodsType,
        data,setData
    } = configDataStore

    const {updateConfigure} = configStore
    const {pipelineId} = pipelineStore

    const [type,setType] = useState(1) // 左侧
    const [initType,setInitType] = useState(1)  // 右侧
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        autoHeight()
    },[height])


    const autoHeight = () =>{
        let winHeight=0
        if (window.innerHeight)
            winHeight = window.innerHeight-120
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight-120
        if (document.documentElement && document.documentElement.clientHeight)
            winHeight = document.documentElement.clientHeight-120
        setHeight(winHeight)
        window.onresize=autoHeight
    }
    
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
        if(type>0 && type<10){
            setCodeType(type)
        }else if(type>10 && type<20){
            setTestType(type)
        } else if(type>20 && type<30){
            setBuildType(type)
        }else if(type>30 && type<40){
            setDeployType(type)
        }else if(type>40 && type<50){
            setScanType(type)
        }else if(type>50 && type<60){
            setGoodsType(type)
        }
        addData(type)
    }

    const newData = [...data]
    const addData = type =>{
        if(type<10){
            newData.splice(0,0,{
                dataId:type,
                dataType:type
            })
        }
        if(type>10){
            newData.push({
                dataId:type,
                dataType:type
            })
        }
        setData([...newData])
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
            visible={addConfigVisible}
            onCancel={()=>setAddConfigVisible(false)}
            closable={false}
            width={800}
            footer={modalFooter}
            style={{height:height,top:60}}
            className="mf"
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
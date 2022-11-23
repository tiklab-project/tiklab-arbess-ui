import React,{useState,useEffect} from "react";
import {Modal,Space} from "antd";
import {inject,observer} from "mobx-react";
import {autoHeight} from "../../../common/client/client";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {del} from "../common/delData";
import Btn from "../../../common/btn/btn";

const lis=[
    {
        id:1,
        title:"源码",
        icon:"suyuanmabiaoqian",
        desc:[
            {type:1, tel:"通用Git", icon:"git"},
            {type:2, tel:"Gitee", icon:"gitee"},
            {type:3, tel: "Github", icon:"github"},
            {type:4, tel: "Gitlab", icon:"gitlab"
            },
            {type: 5, tel:"svn",icon:"-_ssh"}
        ]
    },
    {
        id:5,
        title: "代码扫描",
        desc: [
            {type: 41,tel:"sonarQuebe",icon:"ceshi"}
        ]
    },
    {
        id:2,
        title:"测试",
        desc:[
            {type: 11,tel:"maven单元测试",icon:"ceshi"},
            {type: 12,tel: "junit",icon:"ceshi"}
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {type: 21,tel:"maven",icon:"quanxian"},
            {type: 22,tel:"node",icon:"nodejs"},
            {type: 23,tel:"gradel",icon:"nodejs"}
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {type:51,tel:"nexus",icon: "quanxian"},
            {type:52,tel:"SSH",icon: "quanxian"},
        ]
    },
    {
        id:4,
        title: "部署",
        desc:[
            {type:31,tel:"虚拟机",icon:"xuniji"},
            {type:32,tel:"docker",icon:"docker"},
        ]
    },
]

const SwitchType = props =>{

    const {visible,setVisible,showType,configStore,configDataStore,pipelineStore} = props

    const {updateConfigure} = configStore
    const {data,setData} = configDataStore
    const {pipelineId} = pipelineStore

    const [height,setHeight] = useState(0)
    const [group,setGroup] = useState("")
    const [newType,setNewType] = useState(null)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        visible && renderGroup(showType)
    },[showType])

    const renderGroup = showType =>{
        const zz = Math.floor(showType/10)
        switch(zz){
            case 0 :
                setGroup(lis[0])
                break
            case 1:
                setGroup(lis[2])
                break
            case 2:
                setGroup(lis[3])
                break
            case 3:
                setGroup(lis[5])
                break
            case 4:
                setGroup(lis[1])
                break
            case 5:
                setGroup(lis[4])
        }
    }

    const handleClick = item =>{
        setNewType(item.type)
    }

    const onOk  = () =>{
        const params = {
            pipeline:{pipelineId},
            taskType:showType,  // 旧类型
            type:newType, // 新类型
            message:"updateType"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                data && data.map(ite=>{
                    if(ite.dataType===showType){
                        ite.dataType = newType
                    }
                })
                setData([...data])
                del(newType,configDataStore)
            }
            setVisible(false)
        })
    }

    const footer = (
        <>
            <Btn
                onClick={()=>setVisible(false)}
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
            visible={visible}
            closable={false}
            onCancel={()=>setVisible(false)}            
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            destroyOnClose={true}
            className="mf"
            footer={footer}
        >
            <div className="switchType-chang">
                <div className="switchType-chang-top">
                    <ModalTitle
                        setVisible={setVisible}
                        title={`切换${group.title}类型`}
                    />
                </div>
                <div className="group">
                    <div className="group-content">
                        {
                            group.desc && group.desc.map(item=>{
                                return <div onClick={item.type===showType?null:()=>handleClick(item)}
                                            className={`group-desc ${item.type===showType?"group-ban":""} ${item.type===newType?"group-select":""}`}
                                            key={item.type}
                                        >
                                    <div className="group-desc-tpl">
                                        <div className="group-tpl">
                                            <Space>
                                                <svg className="icon" aria-hidden="true">
                                                    <use xlinkHref={`#icon-${item.icon}`}/>
                                                </svg>
                                                {item.tel}
                                            </Space>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default inject("configStore","configDataStore","pipelineStore")(observer(SwitchType))
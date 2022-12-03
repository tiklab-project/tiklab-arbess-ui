import React,{useState,useEffect} from "react";
import {Modal,Space} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {autoHeight} from "../../../../common/client/client";
import ModalTitle from "../../../../common/modalTitle/modalTitle";
import {del} from "../delData";
import Btn from "../../../../common/btn/btn";
import SubIcon from "../../../common/components/subIcon";

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
            // {type: 12,tel: "junit",icon:"ceshi"}
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {type: 21},
            {type: 22},
            // {type: 23,tel:"gradel",icon:"nodejs"}
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

const SwitchType = props =>{

    const {visible,setVisible,configStore,pipelineStore,showItem} = props

    const {updateConfigure,data} = configStore
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
        visible && renderGroup(showItem.type)
    },[showItem])

    const renderGroup = type =>{
        const zz = Math.floor(type/10)
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
            configId:showItem.configId,
            pipeline:{pipelineId},
            taskType:newType, // 新类型
        }
        showItem.type!==newType && updateConfigure(params)
        // .then(res=>{
        //     if(res.code===0){
        //         data && data.map(ite=>{
        //             if(ite.type===showItem.type){
        //                 ite.type = newType
        //             }
        //         })
        //         // del(showItem,configStore)
        //     }
        //     setVisible(false)
        // })
        setVisible(false)
    }

    const footer = (
        <Space>
            <div style={{color:"#ff0000",fontSize:13}}>
                <ExclamationCircleOutlined/>
                <span>切换类型数据会丢失</span>
            </div>
            <Btn
                onClick={()=>setVisible(false)}
                title={"取消"}
            />
            <Btn
                onClick={onOk}
                title={"确定"}
                type={"primary"}
            />
        </Space>
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
                                return <div onClick={item.type===showItem.type? null:()=>handleClick(item)}
                                            className={`group-desc ${item.type===showItem.type?"group-ban":""} ${item.type===newType?"group-select":""}`}
                                            key={item.type}
                                        >
                                    <div className="group-desc-tpl">
                                        <div className="group-tpl">
                                            <SubIcon type={item.type}/>
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

export default inject("configStore","pipelineStore")(observer(SwitchType))
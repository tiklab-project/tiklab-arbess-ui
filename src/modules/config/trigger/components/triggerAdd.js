import React,{useState,useEffect} from "react";
import {Modal} from "antd";
import Btn from "../../../common/btn/btn";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";


const TriggerAdd = props =>{

    const {triggerVisible,setTriggerVisible,pipelineId,createBeforeConfig} = props

    const [height,setHeight] = useState(0)
    const [typess,setType] = useState(null)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const getData = item => {
        setType(item.id)
    }

    const onOk = () =>{
        const params = {
            taskType:81,
            pipeline:{pipelineId},
            value:null
        }
        createBeforeConfig(params)
        setTriggerVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setTriggerVisible(false)}
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

    const type = [
        {
            id:81,
            title:"定时触发"
        },
    ]

    return(

        <Modal
            closable={false}
            visible={triggerVisible}
            onCancel={()=>setTriggerVisible(false)}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="trigger-modal">
                <div className="trigger-modal-top">
                    <ModalTitle
                        setVisible={setTriggerVisible}
                        title={"添加"}
                    />
                </div>
                <div className="group">
                    <div className="group-content">
                        {
                            type.map(item=>{
                                return <div
                                    key={item.id}
                                    className={`group-desc ${typess===item.id?"group-select":""}`}
                                    onClick={()=>getData(item)}
                                >
                                    <div className="group-desc-tpl">
                                        <div className="group-tpl">
                                            {item.title}
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

export default TriggerAdd
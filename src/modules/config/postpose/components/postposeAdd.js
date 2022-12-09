import React,{useState,useEffect} from "react";
import {Modal} from "antd";
import Btn from "../../../common/btn/btn";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";
import SubIcon from "../../common/components/subIcon";

const PostposeAdd = props =>{

    const {postposeVisible,setPostposeVisible,createPostConfig,pipelineId} = props

    const [typess,setType] = useState(71)
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const getData = item => {
        setType(item.type)
    }

    const onOk = () => {
        const params = {
            taskType:typess,
            pipeline: {id:pipelineId},
            value:null,
        }
        createPostConfig(params)
        setPostposeVisible(false)
    }

    const type = [
        {
            type:71,
            title:"执行bat脚本"
        },
        {
            type:72,
            title:"执行Shell脚本"
        },
        {
            type:61,
            title:"消息提醒"
        },
    ]

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setPostposeVisible(false)}
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
            visible={postposeVisible}
            onCancel={()=>setPostposeVisible(false)}
            footer={modalFooter}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="postpose-modal">
                <div className="postpose-modal-top">
                    <ModalTitle
                        setVisible={setPostposeVisible}
                        title={"添加后置处理"}
                    />
                </div>
                <div className="group">
                    <div className="group-content">
                        {
                            type.map(item=>{
                                return <div
                                    key={item.type}
                                    className={`group-desc ${typess===item.type?"group-select":""}`}
                                    onClick={()=>getData(item)}
                                >
                                    <SubIcon type={item.type}/>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PostposeAdd
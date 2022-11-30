import React,{useState,useEffect} from "react";
import {Modal} from "antd";
import Btn from "../../../common/btn/btn";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import {autoHeight} from "../../../common/client/client";

const PostposeAdd = props =>{

    const {postposeVisible,setPostposeVisible,postposeData,setPostposeData} = props

    const [typess,setType] = useState(null)
    const [data,setData] = useState([])
    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const getData = item => {
        let newArr = [...postposeData]
        if(!isData(item.id)){
            newArr.push(item)
        }
        setType(item.id)
        setData([...newArr])
    }

    const isData = id =>{
        return postposeData && postposeData.some(item=>item.id===id)
    }

    const onOk = () => {
        setPostposeData([...data])
        setPostposeVisible(false)
    }

    const type = [
        {
            id:1,
            title:"执行bat脚本"
        },
        {
            id:2,
            title:"执行Shell脚本"
        },
        {
            id:3,
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

export default PostposeAdd
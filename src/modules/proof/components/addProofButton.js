import React,{useState,useEffect} from "react";
import "./addProofModal";
import AddProofModal from "./addProofModal";
import {inject,observer} from "mobx-react";
import {Button} from "antd";
import {getUser} from "tiklab-core-ui";
import {PlusOutlined} from "@ant-design/icons";

const AddProofButton = props =>{

    const {proofStore,pipelineStore,type,style,pipelineList,isBtn} = props
    const {createProof,fresh,setFresh} = proofStore
    const {pipelineId} = pipelineStore

    const userId = getUser().userId
    const [visible,setVisible] = useState(false)
    const [isAuthority,setIsAuthority] = useState(false) // 是否显示凭证作用域

    useEffect(()=>{
        if(style){
            setIsAuthority(true)
        }
    },[])

    const addProofVisible = () => {
        setVisible(true)
    }

    const noBtn = {
        // paddingLeft:10
    }

    return (
        <>
            {
                isBtn ?
                    <div style={noBtn} onClick={()=>addProofVisible()}>
                        <PlusOutlined />&nbsp;&nbsp;添加
                    </div>
                    :
                    <Button type={style} onClick={()=>addProofVisible()}>
                        <PlusOutlined />添加
                    </Button>
            }
            <AddProofModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
                userId={userId}
                fresh={fresh}
                setFresh={setFresh}
                isAuthority={isAuthority}
                type={type}
                style={style}
                pipelineList={pipelineList}
                pipelineId={pipelineId}
            />
        </>
    )
}

export default inject("proofStore","pipelineStore")(observer(AddProofButton))
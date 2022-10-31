import React,{useState,useEffect} from "react";
import "./addProofModal";
import AddProofModal from "./addProofModal";
import {inject,observer} from "mobx-react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const AddProofButton = props =>{

    const {proofStore,pipelineStore,type,style,pipelineList,isBtn} = props

    const {createProof} = proofStore
    const {pipelineId} = pipelineStore

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

    return (
        <>
            {
                isBtn ?
                    <div onClick={()=>addProofVisible()}>
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
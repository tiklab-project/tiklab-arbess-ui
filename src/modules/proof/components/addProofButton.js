import React,{useState,useEffect} from "react";
import "./addProofModal";
import AddProofModal from "./addProofModal";
import {inject,observer} from "mobx-react";
import {Button} from "antd";
import {getUser} from "tiklab-core-ui";

const AddProofButton = props =>{

    const {proofStore,matFlowStore,type,style,matFlowList} = props
    const {createProof,fresh,setFresh} = proofStore
    const {matFlowId} = matFlowStore

    const userId = getUser().userId
    const [visible,setVisible] = useState(false)
    const [isAuthority,setIsAuthority] = useState(false) // 项目和系统凭证是否显示凭证作用域

    useEffect(()=>{
        if(style){
            setIsAuthority(true)
        }
    },[])

    const addProofVisible = () => {
        setVisible(true)
    }

    return (
        <div className="config-details-link">
            <Button type={style} onClick={()=>addProofVisible()}>
                添加
            </Button>
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
                matFlowList={matFlowList}
                matFlowId={matFlowId}
            />
        </div>
    )
}

export default inject("proofStore","matFlowStore")(observer(AddProofButton))
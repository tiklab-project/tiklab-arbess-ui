import React,{useState,useEffect} from "react";
import "./addProofModal";
import AddProofModal from "./addProofModal";
import {inject,observer} from "mobx-react";
import {Button} from "antd";
import {getUser} from "tiklab-core-ui";

const AddProofButton = props =>{

    const {proofStore,pipelineStore,type,style,pipelineList} = props
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
                pipelineList={pipelineList}
                pipelineId={pipelineId}
            />
        </div>
    )
}

export default inject("proofStore","pipelineStore")(observer(AddProofButton))
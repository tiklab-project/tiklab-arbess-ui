import React, {Fragment,useState,useEffect} from "react";
import {Button} from "antd";
import "./addProofModal";
import AddProofModal from "./addProofModal";
import {inject, observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";

const AddProofButton = props =>{

    const {proofStore,style,type} = props
    const {createProof,fresh,setFresh} = proofStore

    const userId = getUser().userId
    const [visible,setVisible] = useState(false)
    const [isAuthority,setIsAuthority] = useState(false)

    useEffect(()=>{
        if(style){
            setIsAuthority(true)
        }
    },[])

    const addProofVisible = () => {
        setVisible(true)
    }

    return (
        <Fragment>
            <Button className="config-details-link" type={style} onClick={()=>addProofVisible()}>
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
            />
        </Fragment>
    )

}


export default inject("proofStore")(observer(AddProofButton))
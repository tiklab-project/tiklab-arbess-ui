import React, {Fragment,useState} from "react";
import {Button} from "antd";
import './addProofModal'
import AddProofModal from "./addProofModal";
import {inject, observer} from "mobx-react";

const AddProofButton = props =>{

    const {codeType,proofStore,style} = props
    const {createProof,proofScope,setProofScope} = proofStore
    const [visible,setVisible] = useState(false)

    const addProofVisible = () => {
        switch (codeType){
            case 1:
                setProofScope(1)
                break
            case 4:
                setProofScope(4)
                break
            case 31:
                setProofScope(31)
                break
            case 32:
                setProofScope(32)
        }
        setVisible(true)
    }

    return (
        <Fragment>
            <Button className='config-details-link' type={style} onClick={()=>addProofVisible()}>
                添加
            </Button>
            <AddProofModal
                proofScope={proofScope}
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </Fragment>
    )

}

export default inject('proofStore')(observer(AddProofButton))
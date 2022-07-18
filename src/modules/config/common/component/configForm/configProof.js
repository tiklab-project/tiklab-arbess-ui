import React from "react";
import FindAllProof from "../../../../proof/components/findAllProof";
import AddProofButton from "../../../../proof/components/addProofButton";
import FormTest from "./formTest";
import {Row} from "antd";

const ConfigProof = props =>{
    const {allProofType,proofBtnType,testType} = props
    return (
        <Row>
            <FindAllProof type={allProofType}/>
            <AddProofButton type={proofBtnType}/>
            <FormTest test={testType}/>
        </Row>
    )
}

export default ConfigProof
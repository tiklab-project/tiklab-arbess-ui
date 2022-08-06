import React from "react";
import FindAllProof from "../../../../proof/components/findAllProof";
import AddProofButton from "../../../../proof/components/addProofButton";
import FormTest from "./formTest";
import {Row} from "antd";
import {inject,observer} from "mobx-react";

const ConfigProof = props =>{

    const {configDataStore,configItemStore,proofStore,matFlowStore,
        allProofType,proofBtnType,testType} = props

    return (
        <Row>
            <FindAllProof
                type={allProofType}
                proofStore={proofStore}
                matFlowStore={matFlowStore}
                configDataStore={configDataStore}
            />
            <AddProofButton type={proofBtnType}/>
            <FormTest
                test={testType}
                configDataStore={configDataStore}
                configItemStore={configItemStore}
            />
        </Row>
    )
}

export default inject("configDataStore","configItemStore","proofStore",
                "matFlowStore")(observer(ConfigProof))
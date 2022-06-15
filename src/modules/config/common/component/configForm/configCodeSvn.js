import React,{Fragment} from "react";
import { Form, Input, Row} from "antd";
import AddProofButton from "../../../../proof/components/addProofButton";
import {inject, observer} from "mobx-react";
import FindAllProof from "../../../../proof/components/findAllProof";
import FormTest from "./formTest";

const ConfigCodeSvn = props =>{

    const {configDataStore}=props
    const {setCodeName,codeType} = configDataStore

    const gitProofId = localStorage.getItem('gitProofId')

    const inputCodeNameValue = e =>{
        setCodeName(e.target.value)
    }

    return(
        <Fragment>
            <Form.Item
                name='codeName'
                label="svn地址"
                rules={[
                    {required:true, message:'请输入svn地址'},
                ]}
            >
                <Input onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Row>
                <FindAllProof type={1}/>
                <AddProofButton codeType={codeType}/>
            </Row>

            <FormTest proofId={gitProofId} type={'code'}/>

        </Fragment>
    )
}
export default inject('configDataStore')(observer(ConfigCodeSvn))

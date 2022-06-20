import React,{Fragment} from "react";
import { Form, Input, Row} from "antd";
import AddProofButton from "../../../../proof/components/addProofButton";
import FindAllProof from "../../../../proof/components/findAllProof";
import {inject, observer} from "mobx-react";
import FormTest from "./formTest";

const ConfigCodeSvn = props =>{

    const {configDataStore}=props
    const {codeType} = configDataStore

    return(
        <Fragment>
            <Form.Item
                name='codeName'
                label="svn地址"
                rules={[
                    {required:true, message:'请输入svn地址'},
                ]}
            >
                <Input />
            </Form.Item>
            <Row>
                <FindAllProof type={5}/>
                <AddProofButton codeType={codeType}/>
            </Row>
            <FormTest type={'code'}/>
        </Fragment>
    )
}
export default inject('configDataStore')(observer(ConfigCodeSvn))

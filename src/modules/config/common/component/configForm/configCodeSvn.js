import React,{Fragment} from "react";
import {Form,Input,Row} from "antd";
import AddProofButton from "../../../../proof/components/addProofButton";
import FindAllProof from "../../../../proof/components/findAllProof";
import FormTest from "./formTest";

const ConfigCodeSvn = props =>{

    return(
        <Fragment>
            <Form.Item name="codeName" label="svn地址" rules={[{required:true, message:"请输入svn地址"}]}>
                <Input />
            </Form.Item>
            <Row>
                <FindAllProof type={5}/>
                <AddProofButton type={1}/>
            </Row>
            <FormTest git={"code"}/>
        </Fragment>
    )
}
export default ConfigCodeSvn

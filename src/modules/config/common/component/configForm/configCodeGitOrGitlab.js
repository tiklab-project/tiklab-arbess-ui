import React,{Fragment} from "react";
import AddProofButton from "../../../../proof/components/addProofButton";
import FindAllProof from "../../../../proof/components/findAllProof";
import FormTest from "./formTest";
import {Form,Input,Row} from "antd";
import {inject,observer} from "mobx-react";

const ConfigCodeGitOrGitlab = props =>{

    const {configDataStore}=props
    const {codeType} = configDataStore

    return(
        <Fragment>
            <Form.Item
                name="codeName"
                label="git地址"
                rules={[
                    {required:true, message:"请输入git地址"},
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:"请输入正确的git地址"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="codeBranch" label="分支" className="noRequired">
                <Input style={{width:300}} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <Row>
                <FindAllProof type={codeType}/>
                <AddProofButton type={1}/>
                <FormTest test={"源码地址"}/>
            </Row>
        </Fragment>
    )
}

export default inject("configDataStore")(observer(ConfigCodeGitOrGitlab))

import React, {Fragment} from "react";
import {Form, Input, Row,} from "antd";
import AddProofButton from "../../../../proof/addProofButton";
import FindAllProof from "../../../../proof/findAllProof";
import FormTest from "./formTest";
import {inject, observer} from "mobx-react";

const ConfigCodeGitOrGitlab = props =>{

    const {configDataStore}=props
    const {setCodeName, setCodeBranch,codeType} = configDataStore

    const gitProofId =localStorage.getItem('gitProofId')

    const inputCodeNameValue = e =>{
        setCodeName(e.target.value)
    }

    const inputCodeBranchValue = e =>{
        setCodeBranch(e.target.value)
    }
    
    return(
        <Fragment>
            <Form.Item
                name='codeName'
                label="git地址"
                rules={[
                    {
                        required:true,
                        message:'请输入git地址'
                    },
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:'请输入正确的git地址'
                    }
                ]}
            >
                <Input  onChange={e=>inputCodeNameValue(e)}/>
            </Form.Item>
            <Form.Item name="codeBranch" label="分支">
                <Input
                    style={{ width: 300 }}
                    placeholder="请输入分支，默认是master"
                    onChange={e=>inputCodeBranchValue(e)}
                />
            </Form.Item>
            <Row>
                <FindAllProof type={1}/>
                <AddProofButton codeType={codeType}/>
            </Row>
            <FormTest proofId={gitProofId} type={'code'}/>
        </Fragment>
    )
}

export default inject('configDataStore')(observer(ConfigCodeGitOrGitlab))

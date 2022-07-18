import React,{Fragment} from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";
import ConfigProof from "./configProof";

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
            <ConfigProof
                allProofType={codeType}
                proofBtnType={1}
                testType={"源码地址"}
            />
        </Fragment>
    )
}

export default inject("configDataStore")(observer(ConfigCodeGitOrGitlab))

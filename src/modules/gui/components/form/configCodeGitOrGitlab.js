import React,{Fragment} from "react";
import {Form,Input} from "antd";
import ConfigProof from "./configProof";

const ConfigCodeGitOrGitlab = props =>{

    const {configDataStore}=props
    const {codeType} = configDataStore

    return(
        <Fragment>
            <Form.Item
                name={codeType+"codeName"}
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
            <Form.Item name={codeType+"codeBranch"}  label="分支">
                <Input style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
            </Form.Item>
            <ConfigProof
                {...props}
                allProofType={codeType}
                testType={"源码地址"}
                configDataStore={configDataStore}
            />
        </Fragment>
    )
}

export default ConfigCodeGitOrGitlab

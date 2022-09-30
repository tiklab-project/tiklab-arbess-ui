import React,{Fragment} from "react";
import {Form,Input} from "antd";
import ConfigProof from "../../components/configForm/configProof";
import {inject,observer} from "mobx-react";

const CodeGitOrGitlab = props =>{
    const {configDataStore}=props
    const {codeType} = configDataStore

    const name = codeType =>{
        switch (codeType){
            case 1:
                return "gitCodeName"
            case 4:
                return "gitlabCodeName"
        }
    }

    const branch = codeType =>{
        switch (codeType){
            case 1:
                return "gitCodeBranch"
            case 4:
                return "gitlabCodeBranch"
        }
    }


    return(
        <Fragment>
            <Form.Item name={name(codeType)} label="git地址"
                rules={[
                    {required:true, message:"请输入git地址"},
                    {
                        pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                        message:"请输入正确的git地址"
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={branch(codeType)} label="分支">
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

export default inject("configDataStore")(observer(CodeGitOrGitlab))

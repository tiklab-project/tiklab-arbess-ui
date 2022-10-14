import React,{Fragment} from "react";
import {Form,Input} from "antd";
import ConfigProof from "./configProof";

const ConfigCodeSvn = props =>{

    const {configDataStore}=props

    const {codeType} = configDataStore

    return(
        <Fragment>
            <Form.Item
                name={codeType+"codeName"}
                label="svn地址"
                rules={[
                    {required:true,message:"请输入svn地址"},
                    {
                        pattern: /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/,
                        message:"请输入正确的git地址"
                    }
            ]}
            >
                <Input />
            </Form.Item>
            <ConfigProof
                {...props}
                allProofType={5}
                testType={"源码地址"}
                configDataStore={configDataStore}
            />
        </Fragment>
    )
}

export default ConfigCodeSvn

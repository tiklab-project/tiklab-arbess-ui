import React from "react";
import {Form,Input} from "antd";
import ConfigProof from "../configProof";

const CodeSvn = props =>{

    const {codeType} = props

    return(
        <>
            <Form.Item
                name={codeType+"codeName"}
                label="svn地址"
                rules={[
                    {required:true,message:"请输入svn地址"},
                    {
                        pattern: /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/,
                        message:"请输入正确的svn地址"
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <ConfigProof
                allProofType={5}
                proofBtnType={1}
                testType={"源码地址"}
            />
        </>
    )
}

export default CodeSvn

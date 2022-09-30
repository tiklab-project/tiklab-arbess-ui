import React,{Fragment} from "react";
import {Form,Input} from "antd";
import ConfigProof from "../../components/configForm/configProof";

const CodeSvn = props =>{

    return(
        <Fragment>
            <Form.Item
                name="svnCodeName"
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
        </Fragment>
    )
}

export default CodeSvn

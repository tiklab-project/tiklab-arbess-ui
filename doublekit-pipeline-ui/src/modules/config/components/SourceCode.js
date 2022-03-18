import React, { useState} from 'react'
import {Radio,  Form, Space} from "antd";
import SourceCode_Git from "./SourceCode_GIt";
import SourceCode_Gitee from "./SourceCode_GItee";
import SourceCode_GitModal from "./sourceCode_GitModal";

const SourceCode = props => {

    const {createProof,findAllGitProof,findOneGitProof,allGitProofList,
        gitList,url,code,getAllStorehouse
    }=props

    const [radio,setRadio]=useState(1)
    const [visible,setVisible]=useState(false)

    const handlerRadio = e =>{
        setRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='a'>
            <h1>源码管理</h1>
            <Form.Item className='config-radio' name='configureCodeSource'>
                <Radio.Group  onChange={handlerRadio} value={radio}>
                    <Space>
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >通用Git</Radio>
                        <Radio value={3} >Gitee</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                radio === 2 ?
                    <SourceCode_Git
                        setVisible={setVisible}
                        findAllGitProof={findAllGitProof}
                        findOneGitProof={findOneGitProof}
                        allGitProofList={allGitProofList}
                    />:null
            }
            {
                radio === 3 ?
                    <SourceCode_Gitee
                        gitList={gitList}
                        url={url}
                        code={code}
                        getAllStorehouse={getAllStorehouse}
                    />:null
            }
            <SourceCode_GitModal
                visible={visible}
                setVisible={setVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default SourceCode
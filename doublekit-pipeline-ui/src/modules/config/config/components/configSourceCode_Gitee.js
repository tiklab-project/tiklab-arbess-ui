import React, { useState} from 'react'
import {Button, Form, Row, Select} from "antd";
import { PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/component/SourceCode_GIteeModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigSourceCode_Gitee = props =>{

    const {GitAuthorizeStore,ProofStore}=props
    const {url,getAllStorehouse,gitList,getBranch,branchList,getUserMessage} = GitAuthorizeStore
    const {createProof} = ProofStore

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)

    const clickGitStoreHouse = () =>{
        getAllStorehouse()
    }

    const changeGitStoreHouse = values =>{
        setBranch(false)
        getBranch(values)
    }

    return(
        <div>
            <Row>
                <Form.Item
                    name='configureCodeSourceAddress'
                    label="git地址"
                >
                    <Select
                        placeholder="无"
                        style={{ width: 300 }}
                        onClick={clickGitStoreHouse}
                        onChange={changeGitStoreHouse}
                    >
                        {
                            gitList && gitList.map(item=>{
                                return (
                                    <Option key={item}>
                                        {item}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Button type='link' className='config-link' onClick={()=>setVisible(true)}>
                    <PlusOutlined />
                    新增代码库
                </Button>
            </Row>
            <Form.Item name="configureBranch" label="分支">
                <Select
                    style={{ width: 300 }}
                    disabled={branch}
                >
                    {
                        branchList && branchList.map(item=>{
                            return (
                                <Option key={item}>
                                    {item}
                                </Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>

            <SourceCode_GiteeModal
                visible={visible}
                setVisible={setVisible}
                url={url}
                createProof={createProof}
                getUserMessage={getUserMessage}
            />
        </div>
    )
}

export default inject('GitAuthorizeStore','ProofStore')(observer(ConfigSourceCode_Gitee))
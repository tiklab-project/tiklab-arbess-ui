import React, {useEffect, useState,Fragment} from 'react'
import {Button, Form, Row, Select} from "antd";
import { PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/component/SourceCode_GIteeModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigSourceCode_Gitee = props =>{

    const {GitAuthorizeStore}=props
    const {url,getAllStorehouse,gitList,getBranch,
        branchList,getUserMessage,getGiteeProof} = GitAuthorizeStore

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)
    const [readOnly,setReadOnly] =useState(false)
    const [proofUsername,setProofUsername] =useState('')
    const configureId = localStorage.getItem('configureId')

    useEffect(()=>{
        getUserMessage().then(res=>{
            console.log('getUserMessage',res)
            if(res.data){
                setReadOnly(true)
                setProofUsername(res.data)
            }
        })
    },[])

    const clickGitStoreHouse = () =>{
        getAllStorehouse()
    }

    const changeGitStoreHouse = values =>{
        setBranch(false)
        getBranch(values)
    }

    return(
        <Fragment>
            <Row>
                <Form.Item
                    name='giteeCodeName'
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
            <Form.Item name="giteeBranch" label="分支">
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
                readOnly={readOnly}
                proofUsername={proofUsername}
                getGiteeProof={getGiteeProof}
                configureId={configureId}
            />
        </Fragment>
    )
}

export default inject('GitAuthorizeStore')(observer(ConfigSourceCode_Gitee))
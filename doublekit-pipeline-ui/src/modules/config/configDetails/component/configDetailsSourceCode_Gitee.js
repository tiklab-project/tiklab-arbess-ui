import React, {useEffect, useState,Fragment} from 'react'
import {  Form, Row, Select,Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/component/SourceCode_GIteeModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const ConfigDetailsSourceCode_Gitee = props =>{

    const {GitAuthorizeStore,form,ProofStore}=props
    const {url,getAllStorehouse,gitList,getBranch,branchList,getUserMessage} = GitAuthorizeStore
    const {createProof} = ProofStore
    const { getFieldValue } = form

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
        const se = setTimeout(()=>{
            if(getFieldValue('giteeAddress')!==' '){
                setBranch(false)
            }
        },10)
        return ()=> clearTimeout(se)
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
                    name='giteeAddress'
                    label="git地址"
                >
                    <Select
                        id='StoreHouse'
                        style={{ width: 300 }}
                        onChange={changeGitStoreHouse}
                        onClick={clickGitStoreHouse}
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
                <Button className='config-details-link' type="link" onClick={()=>setVisible(true)}>
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
                createProof={createProof}
                getUserMessage={getUserMessage}
            />
        </Fragment>
    )
}

export default inject('GitAuthorizeStore','ProofStore')(observer(ConfigDetailsSourceCode_Gitee))
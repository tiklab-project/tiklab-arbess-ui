import React, {useEffect, useState} from 'react'
import {  Form, Row, Select,Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/SourceCode_GIteeModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const configDetailsSourceCode_Gitee = props =>{

    const {GitAuthorizeStore,ConfigStore}=props
    const {url,getAllStorehouse,gitList,getBranch,branchList,getProof} = GitAuthorizeStore
    const {configureId} = ConfigStore

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
        getAllStorehouse()
    },[])

    const goUrl = () =>{
        localStorage.setItem('code','code')
        url().then(res=>{
            window.open(res.data)
        })
    }

    const changeGitStoreHouse = values =>{
        setBranch(false)
        getBranch(values)
    }

    const  changeBranch = values =>{
        getProof(configureId)
    }

    return(
        <div>
            <Row>
                <Form.Item
                    name='giteeAddress'
                    label="git地址"
                >
                    <Select
                        placeholder="无"
                        style={{ width: 300 }}
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
                <Button className='config-details-link' type="link" onClick={goUrl}>
                    <PlusOutlined />
                    新增代码库
                </Button>
            </Row>
            <Form.Item name="giteeBranch" label="分支">
                <Select
                    style={{ width: 300 }}
                    disabled={branch}
                    onChange={changeBranch}
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
            />
        </div>
    )
}

export default inject('GitAuthorizeStore','ConfigStore')(observer(configDetailsSourceCode_Gitee))
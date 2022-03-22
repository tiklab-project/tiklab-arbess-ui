import React, {useEffect, useState} from 'react'
import {Button, Form, Row, Select} from "antd";
import { PlusOutlined} from "@ant-design/icons";
import SourceCode_GiteeModal from "../../common/SourceCode_GIteeModal";
import {inject, observer} from "mobx-react";

const {Option} =Select

const SourceCode_Gitee = props =>{

    const {GitAuthorizeStore}=props

    const {url,getAllStorehouse,gitList,getBranch,branchList} = GitAuthorizeStore

    const [branch,setBranch]=useState(true)
    const [visible,setVisible]=useState(false)

    useEffect(()=>{
        getAllStorehouse()
    },[])

    const changeGitStoreHouse = values =>{
        setBranch(false)
        getBranch(values)
    }

    const goUrl = () =>{
        localStorage.setItem('code','code')
        url().then(res=>{
            window.open(res.data)
        })
    }

    return(
        <div>
            <Row>
                <Form.Item
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
                <Button className='config-link' onClick={goUrl}>
                    <PlusOutlined />
                    新增代码库
                </Button>
            </Row>
            <Form.Item name="configureBranch" label="分支" defaultValue='master'>
                <Select
                    style={{ width: 300 }}
                    disabled={branch}
                    placeholder='master'
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

export default inject('GitAuthorizeStore')(observer(SourceCode_Gitee))
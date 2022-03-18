import React, {useEffect, useState} from 'react'
import { Col, Form, Row, Select} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";

const {Option} =Select

//获取第三方授权code id
const getUrlParam = name => {
    // 取得url中?后面的字符
    const query = window.location.search.substring(1);
    // 把参数按&拆分成数组
    const param_arr = query.split("&");
    for (let i = 0; i < param_arr.length; i++) {
        let pair = param_arr[i].split("=");
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return false;
}

const SourceCode_Gitee = props =>{

    const {url,code,getAllStorehouse,gitList} = props

    const [branch,setBranch]=useState(true)

    const codeValue = getUrlParam('code') //code新值

    //授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),500)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue)
        }
        return () => clearTimeout(se)
    }, [codeValue])

    useEffect(()=>{
        getAllStorehouse()
    },[])

    const changeGitStoreHouse = values =>{
        setBranch(false)
    }

    const goUrl = () =>{
        localStorage.setItem('code','code')
        url().then(res=>{
            window.location.href=res.data
        })
    }

    return(
        <div>
            <Row>
                <Col>
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
                </Col>
                <Col>
                    <div className='config-link' onClick={goUrl}>
                        <PlusCircleOutlined/>
                        新增代码库
                    </div>
                </Col>
            </Row>
            <Form.Item name="configureBranch" label="分支" defaultValue='master'>
                <Select
                    style={{ width: 300 }}
                    disabled={branch}
                    placeholder='master'
                >
                    <Option value={'1'}>master</Option>
                    <Option value={'2'}>1</Option>
                </Select>
            </Form.Item>
        </div>
    )
}

export default SourceCode_Gitee
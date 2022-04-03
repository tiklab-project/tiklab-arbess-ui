import React, { useState } from 'react'
import {Radio,  Form, Space} from "antd";
import ConfigSourceCode_Git from "./configSourceCode_Git";
import ConfigSourceCode_Gitee from "./configSourceCode_Gitee";
import ConfigDetailsSourceCode_Gitlab from "../../configDetails/component/configDetailsSourceCode_Gitlab";

const ConfigSourceCode = () => {

    const [sourceRadio,setSourceRadio]=useState(0)

    const handlerRadio = e =>{
        setSourceRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='a'>
            <h1>源码管理</h1>
            <Form.Item className='config-radio' name='codeType'>
                <Radio.Group  onChange={handlerRadio} value={sourceRadio}>
                    <Space>
                        <Radio value={0}>无</Radio>
                        <Radio value={2} >通用Git</Radio>
                        <Radio value={3} >Gitee</Radio>
                        <Radio value={4} >Gitlab</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                sourceRadio === 2 ?
                    <ConfigSourceCode_Git/>:null
            }
            {
                sourceRadio === 3 ?
                    <ConfigSourceCode_Gitee/>:null
            }
            {
                sourceRadio === 4 ?
                    <ConfigDetailsSourceCode_Gitlab/> :null
            }
        </div>
    )
}

export default ConfigSourceCode
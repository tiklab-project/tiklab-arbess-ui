import React, { useState,useEffect} from 'react'
import {Radio,  Form, Space} from "antd";
import SourceCode_Git from "./SourceCode_GIt";
import SourceCode_Gitee from "./SourceCode_GItee";

const SourceCode = () => {

    const [sourceRadio,setSourceRadio]=useState(1)

    const handlerRadio = e =>{
        setSourceRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='a'>
            <h1>源码管理</h1>
            <Form.Item className='config-radio' name='configureCodeSource'>
                <Radio.Group  onChange={handlerRadio} value={sourceRadio}>
                    <Space>
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >通用Git</Radio>
                        <Radio value={3} >Gitee</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                sourceRadio === 2 ?
                    <SourceCode_Git/>:null
            }
            {
                sourceRadio === 3 ?
                    <SourceCode_Gitee/>:null
            }
        </div>
    )
}

export default SourceCode
import React from 'react'
import { Radio,  Form, Space } from "antd";
import ConfigDetailsSourceCode_Git from "./configDetailsSourceCode_Git";
import ConfigDetailsSourceCode_Gitee from "./configDetailsSourceCode_Gitee"
import ConfigDetailsSourceCode_Gitlab from "./configDetailsSourceCode_Gitlab";

const ConfigDetailsSourceCode = props =>{

    const {setSourceRadio,sourceRadio,form,configureId} = props

    const handlerRadio = e =>{
        setSourceRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='a'>
            <h2>源码管理</h2>
            <Form.Item name='codeType'>
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
                sourceRadio===2 ?
                    <ConfigDetailsSourceCode_Git/>
                    :null
            }
            {
                sourceRadio===3 ?
                    <ConfigDetailsSourceCode_Gitee
                        form={form}
                        configureId={configureId}
                    />
                    :null
            }
            {
                sourceRadio===4 ?
                    <ConfigDetailsSourceCode_Gitlab/>
                    :null
            }
        </div>
    )
}



export default ConfigDetailsSourceCode
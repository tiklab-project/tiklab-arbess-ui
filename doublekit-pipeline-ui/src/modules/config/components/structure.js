import React,{useState} from "react";
import {Input, Form, Radio,Space} from "antd";

const { TextArea } = Input;

const Structure = props =>{
    const [value,setValue]=useState(1)

    const handlerRadio=(e)=>{
        setValue(e.target.value)
    }

    return(
        <div className=' anchor-content'>
            <h1>构建</h1>
            <Form.Item name={'configureCodeStructure'} className='newDeployment-radio'>
                <Radio.Group  onChange={handlerRadio} value={value}>
                    <Space direction="vertical">
                        <Radio value={1}>无</Radio>
                        <Radio value={2}>maven</Radio>
                        {
                            value===2 ?
                                <div className={'newDeployment-hidden'}>
                                    <Form.Item
                                        name="configureStructureAddress"
                                        label="pom文件地址"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="configureStructureOrder" label="执行命令">
                                        <TextAreaautoSize autoSize  />
                                    </Form.Item>
                                </div>:null
                        }
                    </Space>
                </Radio.Group>
            </Form.Item>
        </div>
    )
}


export default Structure
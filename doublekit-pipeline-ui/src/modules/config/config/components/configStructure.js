import React,{useState} from "react";
import {Input, Form, Radio,Space} from "antd";

const { TextArea } = Input;

const ConfigStructure = props =>{

    const [value,setValue]=useState(0)

    const handlerRadio=(e)=>{
        setValue(e.target.value)
    }

    return(
        <div className='anchor-content' id='c'>
            <h1>构建</h1>
            <Form.Item name='structureType' className='config-radio'>
                <Radio.Group  onChange={handlerRadio} value={value}>
                    <Space >
                        <Radio value={0}>无</Radio>
                        <Radio value={2}>maven</Radio>
                        <Radio value={3}>node</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                value===2 || value===3 ?
                    <>
                        <Form.Item
                            name='structureAddress'
                            label="文件地址"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name='structureOrder' label='执行命令'>
                            <TextArea autoSize  />
                        </Form.Item>
                    </>:null
            }
        </div>
    )
}


export default ConfigStructure
import React, { useState} from 'react'
import { Radio, Input, Form, Space} from "antd";

const {TextArea} = Input

const Test = props => {

    const [radio,setRadio]=useState(1)

    const handlerRadio = e =>{
        setRadio(e.target.value)
    }

    return(
        <div className='anchor-content' id='b'>
            <h1>单元测试</h1>
            <Form.Item className='config-radio' name='configureTestType'>
                <Radio.Group  onChange={handlerRadio} value={radio}>
                    <Space >
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >单元测试</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {
                radio === 2 ?
                    <Form.Item
                        name='configureTestText'
                    >
                        <TextArea  autoSize/>
                    </Form.Item>
                    :null
            }
        </div>
    )
}

export default Test
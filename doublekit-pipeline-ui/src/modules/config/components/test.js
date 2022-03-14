import React, { useState} from 'react'
import { Radio, Input, Form, Space} from "antd";

const {TextArea} = Input

const Test = props => {

    const [radio,setRadio]=useState(1)

    const handlerRadio = e =>{
        setRadio(e.target.value)
    }

    return(
        <div className='anchor-content'>
            <h1>单元测试</h1>
            <Form.Item className='newDeployment-radio' name={'configureTestType'}>
                <Radio.Group  onChange={handlerRadio} value={radio}>
                    <Space direction="vertical">
                        <Radio value={1}>无</Radio>
                        <Radio value={2} >单元测试</Radio>
                        {
                            radio === 2 ?
                                <div className={'newDeployment-hidden'}>
                                    <Form.Item
                                        name="configureTestText"
                                    >
                                        <TextArea  autoSize/>
                                    </Form.Item>
                                </div>:null
                        }
                    </Space>
                </Radio.Group>
            </Form.Item>
        </div>
    )
}

export default Test
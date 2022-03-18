import React from 'react'
import {Button, Form} from "antd";

const Btn = () =>{
    return(
        <Form.Item >
            <div className='btn-sticker-inner'>
                <Button htmlType='submit' type='primary' style={{marginRight:30}}>
                    保存
                </Button>
                <Button>取消</Button>
            </div>
        </Form.Item>
    )
}

export default Btn
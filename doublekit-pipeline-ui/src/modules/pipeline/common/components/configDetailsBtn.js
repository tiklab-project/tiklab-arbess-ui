import React from 'react'
import {Button, Form} from "antd";

const ConfigDetailsBtn = () =>{
    return(
        <Form.Item >
            <div className='config-details-btn' id='bottom-sticker'>
                <Button htmlType='submit' type='primary' style={{marginRight:30}}>
                    保存
                </Button>
                <Button>取消</Button>
            </div>
        </Form.Item>
    )
}

export default ConfigDetailsBtn
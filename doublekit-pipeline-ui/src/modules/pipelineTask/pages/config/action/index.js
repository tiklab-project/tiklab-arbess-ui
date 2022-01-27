import React,{Component} from "react";
import {Form, Input,Checkbox } from "antd";

class Action extends Component{
    render() {
        return(
            <Form
                layout="vertical"
            >
                <Form.Item
                    label='部署位置'
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Checkbox >
                        Checkbox
                    </Checkbox>
                </Form.Item>
            </Form>
        )
    }
}

export default Action
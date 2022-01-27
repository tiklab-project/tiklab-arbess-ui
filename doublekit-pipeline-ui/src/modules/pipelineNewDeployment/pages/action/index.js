import React,{Component} from "react";
import {Form, Input,Checkbox } from "antd";

class ActionNewDeployment extends Component{
    render() {
        return(
           <div className='newDeployment-action anchor'>
               <h1>部署</h1>
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
           </div>
        )
    }
}

export default ActionNewDeployment
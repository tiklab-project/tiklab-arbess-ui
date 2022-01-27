import React,{Component} from 'react'
import {Button,Radio,Input,Form} from "antd";
import ModalSource from "./modal";
import { Select } from 'antd';

const { Option } = Select;
class SourceCode extends Component{
    state={
        formStatus:'none',
        visible:false
    }
    handlerRadio=(e)=>{
        if(e.target.value==='b'){
            if(this.state.formStatus==='none'){
                this.setState({
                    formStatus:"block"
                })
            }
        }
        if(e.target.value==='a'){
            if(this.state.formStatus){
                this.setState({
                    formStatus:"none"
                })
            }
        }
    }
    showModal=()=>{
        this.setState({
            visible:true
        })
    }
    onCreate=(values)=>{
        console.log(values)
        this.setState({
            visible:false
        })
    }
    onCancel=()=>{
        this.setState({
            visible:false
        })
    }
    render() {
        return(
            <div className='task-config-sourceCode'>
               <div className='task-config-radio'>
                   <Radio.Group
                       defaultValue='a'
                       onChange={this.handlerRadio}
                   >
                       <Radio value='a'>无</Radio>
                       <Radio value='b' >git</Radio>
                   </Radio.Group>
               </div>
                <Form
                    layout="vertical"
                    style={{display:this.state.formStatus}}
                >
                    <Form.Item
                        name="address"
                        label="地址"
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item name='option'>
                        <Select  placeholder="凭证" style={{ width: 150 }} >
                            <Option value="a">凭证</Option>
                            <Option value="b">SSH</Option>
                            <Option value="c">password</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.showModal}>
                            添加
                        </Button>
                    </Form.Item>
                </Form>
                <ModalSource
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    onCancel={this.onCancel}
                />
            </div>

        )
    }
}
export default SourceCode
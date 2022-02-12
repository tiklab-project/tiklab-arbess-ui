import React,{Component} from 'react'
import {Button,Radio,Input,Form,Modal} from "antd";
import SourceCodeAddModal from "./sourceCodeAddModal";
import { Select } from 'antd';

const { Option } = Select;
class SourceCode extends Component{
    state={
        formStatus:'none',
        isModalVisible:false
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
            isModalVisible:true
        })
    }
    onCreate=()=>{
        this.setState({
            isModalVisible:false
        })
    }
    onCancel=()=>{
        this.setState({
            isModalVisible:false
        })
    }
    render() {
        return(
            <div className='anchor'>
                <h1>源码管理</h1>
               <div className='newDeployment-radio'>
                   <Radio.Group defaultValue='a' onChange={this.handlerRadio}>
                       <Radio value='a'>无</Radio>
                       <Radio value='b' >git</Radio>
                   </Radio.Group>
               </div>
                <Form
                    layout="vertical"
                    style={{display:this.state.formStatus}}
                >
                    <Form.Item name="address" label="地址">
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
                <SourceCodeAddModal
                    visible={this.state.isModalVisible}
                    onCreate={this.onCreate}
                    onCancel={this.onCancel}
                    okText="确认"
                    cancelText="取消"
                />
            </div>

        )
    }
}
export default SourceCode
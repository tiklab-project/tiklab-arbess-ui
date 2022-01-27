import React,{Component} from "react";
import {Input, Form, Radio} from "antd";

class StructureNewDeployment extends Component{
    state={
        formStatus:'none'
    }
    /*
    单选框互斥显示表单
     */
    handlerRadio=(e)=>{
        if(e.target.value==='a'){
            if(this.state.formStatus==='none'){
                this.setState({
                    formStatus:"block"
                })
            }
        }
        if(e.target.value==='b'){
            if(this.state.formStatus==='block'){
                this.setState({
                    formStatus:"none"
                })
            }
        }
    }
    render() {
        return(
           <div className='newDeployment-structure anchor'>
               <h1>构建</h1>
               <div className='newDeployment-radio'>
                   <Radio.Group
                       defaultValue='b'
                       onChange={this.handlerRadio}
                   >
                       <Radio value="a">maven</Radio>
                       <Radio value="b">其他</Radio>
                   </Radio.Group>
               </div>
               <Form
                   layout="vertical"
                   style={{display:this.state.formStatus}}>
                   <Form.Item
                       name="pom"
                       label="pom文件地址"
                   >
                       <Input />
                   </Form.Item>
                   <Form.Item
                       name="command"
                       label="执行命令"
                   >
                       <Input  />
                   </Form.Item>

               </Form>
           </div>
        )
    }
}

export default StructureNewDeployment
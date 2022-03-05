import React,{Component} from "react";
import {Input, Form, Radio, Space} from "antd";

const { TextArea } = Input;

class ConfigDetailsStructure  extends Component{

    constructor(props) {
        super(props)
        this.state = {
            value:this.props.structure
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.structure !== this.props.structure) {
            this.setState({value:nextProps.structure})
            return true
        }
        return nextState.structure !== this.state.value;
    }

    handlerRadio=(e)=>{
        this.setState({value:e.target.value})
    }

    render() {
        const {value}=this.state
        return(
            <div className=' anchor-content'>
                <h1>构建</h1>
                <Form.Item  className='newDeployment-radio'>
                   <Form.Item name={'configureCodeStructure'}>
                       <Radio.Group  onChange={this.handlerRadio} value={value}>
                           <Space direction="vertical">
                               <Radio value={'a'}>maven</Radio>
                               {
                                   value==='a' ?
                                       <div className={'task-config-hidden'}>
                                           <Form.Item name="configureStructureAddress" label="pom文件地址">
                                               <Input />
                                           </Form.Item>
                                           <Form.Item name="configureStructureOrder" label="执行命令">
                                               <TextArea  />
                                           </Form.Item>
                                       </div>:null
                               }
                               <Radio value={'b'}>其他</Radio>
                           </Space>
                       </Radio.Group>
                   </Form.Item>
                </Form.Item>
            </div>
        )
    }
}

export default ConfigDetailsStructure
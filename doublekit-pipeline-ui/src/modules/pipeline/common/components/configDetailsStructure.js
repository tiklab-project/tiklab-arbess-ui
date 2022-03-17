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
                <h2>构建</h2>
                <Form.Item name='configureCodeStructure'>
                    <Radio.Group  onChange={this.handlerRadio} value={value}>
                        <Space>
                            <Radio value={1}>无</Radio>
                            <Radio value={2}>maven</Radio>
                            <Radio value={3}>node</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    value===2 ?
                        <>
                            <Form.Item name="configureStructureAddress" label="文件地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="configureStructureOrder" label="执行命令">
                                <TextArea  autoSize/>
                            </Form.Item>
                        </>:null
                }
                {
                    value===3 ?
                        <div className='radio-opt'>
                            <Form.Item name="configureStructureAddress" label="文件地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="configureStructureOrder" label="执行命令">
                                <TextArea  autoSize/>
                            </Form.Item>
                        </div>:null
                }
            </div>
        )
    }
}

export default ConfigDetailsStructure
import React,{Component} from "react";
import {Input, Form, Radio, Space} from "antd";

const { TextArea } = Input;

class ConfigDetailsStructure  extends Component{

    constructor(props) {
        super(props)
        this.state = {
            structureRadio:this.props.structureRadio
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.structureRadio !== this.props.structureRadio) {
            this.setState({structureRadio:nextProps.structureRadio})
            return true
        }
        return nextState.structureRadio !== this.state.value;
    }

    handlerRadio=(e)=>{
        this.setState({structureRadio:e.target.value})
    }

    render() {
        const {structureRadio}=this.state
        return(
            <div className=' anchor-content' id='c'>
                <h2>构建</h2>
                <Form.Item name='configureCodeStructure'>
                    <Radio.Group  onChange={this.handlerRadio} value={structureRadio}>
                        <Space>
                            <Radio value={1}>无</Radio>
                            <Radio value={2}>maven</Radio>
                            <Radio value={3}>node</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    structureRadio===2 ||  structureRadio===3 ?
                        <>
                            <Form.Item name="configureStructureAddress" label="文件地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="configureStructureOrder" label="执行命令">
                                <TextArea  autoSize/>
                            </Form.Item>
                        </>:null
                }
            </div>
        )
    }
}

export default ConfigDetailsStructure
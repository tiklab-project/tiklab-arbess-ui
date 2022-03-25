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
                <Form.Item name='structureType'>
                    <Radio.Group  onChange={this.handlerRadio} value={structureRadio}>
                        <Space>
                            <Radio value={0}>无</Radio>
                            <Radio value={2}>maven</Radio>
                            <Radio value={3}>node</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    structureRadio===2 ?
                        <>
                            <Form.Item name="mavenAddress" label="文件地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="mavenOrder" label="执行命令">
                                <TextArea  autoSize/>
                            </Form.Item>
                        </>:null
                }
                {
                    structureRadio===3 ?
                        <>
                            <Form.Item name="nodeAddress" label="文件地址">
                                <Input />
                            </Form.Item>
                            <Form.Item name="nodeOrder" label="执行命令">
                                <TextArea  autoSize/>
                            </Form.Item>
                        </>:null
                }
            </div>
        )
    }
}

export default ConfigDetailsStructure
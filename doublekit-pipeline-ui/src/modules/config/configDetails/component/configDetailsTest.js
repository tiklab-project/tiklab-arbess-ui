import React,{Component} from "react";
import {Input, Form, Radio, Space} from "antd";

const { TextArea } = Input;

class ConfigDetailsTest extends Component{

    constructor(props) {
        super(props)
        this.state = {
            testRadio:this.props.testRadio
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.testRadio !== this.props.testRadio) {
            this.setState({testRadio:nextProps.testRadio})
            return true
        }
        return nextState.testRadio !== this.state.testRadio;
    }

    handlerRadio=(e)=>{
        this.setState({testRadio:e.target.value})
    }


    render() {
        const {testRadio}=this.state
        return(
            <div className=' anchor-content' id='b'>
                <h2>单元测试</h2>
                <Form.Item   name='testType'>
                    <Radio.Group  onChange={this.handlerRadio} value={testRadio}>
                        <Space>
                            <Radio value={0}>无</Radio>
                            <Radio value={2} >单元测试</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    testRadio === 2 ?
                        <>
                            <Form.Item name="testOrder">
                                <TextArea  autoSize  />
                            </Form.Item>
                        </>:null
                }
            </div>
        )
    }
}

export default ConfigDetailsTest
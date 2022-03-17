import React,{Component} from "react";
import {Input, Form, Radio, Space} from "antd";

const { TextArea } = Input;

class ConfigDetailsTest extends Component{

    constructor(props) {
        super(props)
        this.state = {
            value:this.props.test
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.test !== this.props.test) {
            this.setState({value:nextProps.test})
            return true
        }
        return nextState.test !== this.state.value;
    }

    handlerRadio=(e)=>{
        this.setState({value:e.target.value})
    }


    render() {
        const {value}=this.state
        return(
            <div className=' anchor-content'>
                <h2>单元测试</h2>
                <Form.Item   name='configureTestType'>
                    <Radio.Group  onChange={this.handlerRadio} value={value}>
                        <Space>
                            <Radio value={1}>无</Radio>
                            <Radio value={2} >单元测试</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    value === 2 ?
                        <>
                            <Form.Item name="configureTestText">
                                <TextArea  autoSize  />
                            </Form.Item>
                        </>:null
                }
            </div>
        )
    }
}

export default ConfigDetailsTest
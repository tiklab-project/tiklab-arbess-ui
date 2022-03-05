import React,{Component} from 'react'
import {Button, Radio, Input, Form, Select, Space} from "antd";
import ConfigDetailsSourceAddModal from "./configDetailsSourceAddModal";

const { Option } = Select;

class ConfigDetailsSourceCode extends Component{

    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            value:this.props.sourceValue,
            formValue:[],
            proofName:localStorage.getItem('proofName')
        }
    }

    //componentDidUpdate    会在1秒中后发生修改操作
    //shouldComponentUpdate     在组件被更新之前执行
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.sourceValue !== this.props.sourceValue) {
            this.setState({value:nextProps.sourceValue})
            return true
        }
        return nextState.sourceValue !== this.state.value;
    }

    handlerRadio = e =>{
        this.setState({value:e.target.value})
    }

    onCreate=(values)=>{
        let param = {
            proofScope:1,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe
        }
        this.props.createProof(param)
        this.setState({visible:false})
    }

    onClick=()=>{
        this.props.selectAllProof()
    }

    onChange = (value) =>{
        this.props.selectProofName(value)
        localStorage.setItem('proofId',value)
    }

    render() {
        const {value}=this.state
        return(
            <div className='anchor-content'>
                <h1>源码管理</h1>
                <Form.Item  className='newDeployment-radio' name={'configureCodeSource'}>
                    <Radio.Group  onChange={this.handlerRadio} value={value}>
                        <Space direction="vertical">
                            <Radio value='a'>无</Radio>
                            <Radio value='b' >git</Radio>
                            {
                                value==='b' ?
                                    <div className={'task-config-hidden'}>
                                        <Form.Item
                                            name="configureCodeSourceAddress"
                                            label="git地址"
                                            rules={[
                                                {
                                                    pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                                                    message:'请输入正确的git地址'
                                                }
                                            ]}
                                        >
                                            <Input  />
                                        </Form.Item>
                                        <Form.Item name="master" label="分支" defaultValue={'master'}>
                                            <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Select
                                                placeholder="无"
                                                style={{ width: 300 }}
                                                onChange={this.onChange}
                                                onClick={this.onClick}
                                                defaultValue={this.state.proofName}
                                            >
                                                {
                                                    this.props.allProof.map(item=>{
                                                        return(
                                                            <Option key={item.proofId}>
                                                                {item.proofName}
                                                            </Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                            &nbsp;
                                            <Button onClick={() =>{this.setState({visible:true})}}>
                                                添加
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    :null
                            }
                            </Space>
                    </Radio.Group>
                </Form.Item>
                <ConfigDetailsSourceAddModal
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    onCancel={() =>{this.setState({visible:false})}}
                    okText="确认"
                    cancelText="取消"
                />
            </div>
        )
    }
}

export default ConfigDetailsSourceCode
import React,{Component} from 'react'
import {Button, Radio, Input, Form, Select, Space} from "antd";
import SourceCodeAddModal from "./configSourceAddModal";

const { Option } = Select;


class ConfigSourceCode extends Component{
    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            value:this.props.sourceValue,
            formValue:[],
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
            proofScope:values.proofScope,
            proofType:values.proofType,
            proofName:values.proofName,
            proofUsername:values.proofUsername,
            proofPassword:values.proofPassword,
            proofDescribe:values.proofDescribe
        }
        this.props.createProof(param)
        this.setState({visible:false})
    }
    onClick= () =>{
       this.props.selectAllProof()
    }
    onChange = (value) =>{
        this.props.selectProofName(value)
    }

    render() {

        const {value}=this.state
        // const allProof=JSON.parse(localStorage.getItem('allProof'))
        const proofName=localStorage.getItem('proofName')

        return(
            <div className='anchor'>
                <h1>源码管理</h1>
                <Form.Item name={'configureCodeSource'} className='newDeployment-radio'>
                    <Radio.Group  onChange={this.handlerRadio} value={value}>
                        <Space direction="vertical">
                            <Radio value='a'>无</Radio>
                            <Radio value='b' >git
                                {
                                    value==='b' ?
                                    <div className={'task-config-hidden'}>
                                        <Form.Item
                                            name="configureCodeSourceAddress"
                                            label="地址"
                                            rules={[
                                                {
                                                    pattern: /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/,
                                                    message:'请输入正确的git地址'
                                                }
                                            ]}
                                        >
                                            <Input  />
                                        </Form.Item>
                                        <Form.Item>
                                            <Select
                                                placeholder="无"
                                                style={{ width: 300 }}
                                                onChange={this.onChange}
                                                onClick={this.onClick}
                                                defaultValue={proofName}
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
                                    </div>:null
                                }
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <SourceCodeAddModal
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
export default ConfigSourceCode
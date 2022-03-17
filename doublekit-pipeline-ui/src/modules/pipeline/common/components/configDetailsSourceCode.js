import React,{Component} from 'react'
import {withRouter} from "react-router-dom";
import {Button, Radio, Input, Form, Select, Space,Row,Col} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import ConfigDetailsSourceAddModal from "./configDetailsSourceAddModal";

const { Option } = Select;

class ConfigDetailsSourceCode extends Component{

    constructor(props) {
        super(props)
        this.state = {
            visible:false,
            value:this.props.sourceValue,
            oneGitProof:this.props.oneGitProof,
            setGitOrGitee:'',
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

    AddGit = () =>{
        this.setState({setGitOrGitee:'Git'})
        this.setState({visible:true})
    }

    AddGitee = () =>{
        this.setState({setGitOrGitee:'Gitee'})
        this.setState({visible:true})
    }

    onCreate = values =>{
        if(this.state.setGitOrGitee==='Git'){
            const param = {
                proofScope:1,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe
            }
            this.props.createProof(param)
            this.setState({visible:false})
        } else if(this.state.setGitOrGitee==='Gitee'){
            const param = {
                proofScope:3,
                proofType:values.proofType,
                proofName:values.proofName,
                proofUsername:values.proofUsername,
                proofPassword:values.proofPassword,
                proofDescribe:values.proofDescribe
            }
            this.props.createProof(param)
            this.setState({visible:false})
        }
    }

    clickFindAllGit=()=>{
        this.props.findAllGitProof()
    }

    changeGitSelect = value =>{
        this.props.findOneGitProof(value)
        localStorage.setItem('gitProofId',value)
    }

    goUrl = () =>{
        localStorage.setItem('code','code')
        this.props.url().then(res=>{
            window.close()
            window.open(res.data)   //这个是git授权页面
        })
    }

    render() {
        const {value,oneGitProof}=this.state
        return(
            <div className='anchor-content'>
                <h2>源码管理</h2>
                <Form.Item  name='configureCodeSource'>
                    <Radio.Group  onChange={this.handlerRadio} value={value}>
                        <Space>
                            <Radio value={1}>无</Radio>
                            <Radio value={2} >Git</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    value===2 ?
                        <div>
                            <Row>
                                <Col>
                                    <Form.Item>
                                        <Select
                                            placeholder="无"
                                            style={{ width: 300 }}
                                        >
                                            <Option value={1}> 1 </Option>
                                            <Option value={2}> 2 </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <div className='config-details-link' onClick={this.goUrl}>
                                        <PlusCircleOutlined/>
                                        添加服务链接
                                    </div>
                                </Col>
                            </Row>

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
                            <Form.Item name="configureBranch" label="分支" defaultValue='master'>
                                <Input placeholder="请输入分支，默认是master"/>
                            </Form.Item>
                            <Form.Item >
                                <Select
                                    placeholder="无"
                                    style={{ width: 300 }}
                                    onChange={this.changeGitSelect}
                                    onClick={this.clickFindAllGit}
                                    defaultValue=  { oneGitProof.proofName+ "(" + oneGitProof.proofUsername + ")"}
                                >
                                    {
                                        this.props.allGitProofList && this.props.allGitProofList.map(item=>{
                                            return(
                                                <Option key={item.proofId}>
                                                    { item.proofName+ "(" + item.proofUsername + ")"}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                                &nbsp;
                                <Button onClick={this.AddGit}>
                                    添加
                                </Button>
                            </Form.Item>
                        </div>
                        :null
                }
                {/*
                             <Radio value={3}>Gitee</Radio>
                            {
                                value === 3 ?
                                    <div className={'newDeployment-hidden'}>
                                        <Form.Item
                                            name="configureCodeSourceAddress"
                                            label="Gitee地址"
                                        >
                                            <Input  />
                                        </Form.Item>
                                        <Form.Item
                                            name="configureBranch"
                                            label="分支"
                                            defaultValue={'master'}
                                        >
                                            <Input  style={{ width: 300 }} placeholder="请输入分支，默认是master"/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Select
                                                placeholder="无"
                                                style={{ width: 300 }}
                                            >

                                            </Select>
                                            &nbsp;
                                            <Button onClick={this.AddGitee}>
                                                添加
                                            </Button>
                                        </Form.Item>
                                    </div>:null
                            }
                            */}
                <ConfigDetailsSourceAddModal
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    onCancel={()=>this.setState({visible:false})}
                />
            </div>
        )
    }
}

export default withRouter(ConfigDetailsSourceCode)
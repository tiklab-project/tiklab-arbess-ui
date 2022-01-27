import React,{Component} from 'react'
import {Button, Popconfirm} from "antd";
import { Card, Col, Row } from 'antd';

class BuildTask extends Component{
    render() {
        return(
            <div className='task-build'>
                <div className='task-build-top'>
                    <h1>构建1</h1>
                    <div className='task-build-top-btn'>
                        <Button type='primary' onClick={()=>this.props.history.push('/task/history')}>
                            返回
                        </Button>
                            <Popconfirm
                                placement="bottom"
                                title="确定删除吗"
                                onConfirm={()=>{
                                    this.props.history.push('/task/history')
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button >
                               删除本次构建
                                </Button>
                            </Popconfirm>

                    </div>
                </div>
                <div className='task-build-center'>
                    <Row gutter={30}>
                        <Col span={6}>
                            <Card title="持续集成" >
                                <div className='task-build-center-div'>
                                    成功
                                </div>
                                <div className='task-build-center-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="日常环境测试" >
                                <div className='task-build-center-div'>
                                    暂停
                                </div>
                                <div className='task-build-center-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="预发环境测试" >
                                <div className='task-build-center-div'>
                                    失败
                                </div>
                                <div className='task-build-center-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="发布">
                                <div className='task-build-center-div'>
                                    成功
                                </div>
                                <div>
                                    <ul className='task-build-center-ul'>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className='task-build-bottom'>
                    <h1>控制台输出</h1>
                </div>
            </div>
        )
    }
}
export default BuildTask
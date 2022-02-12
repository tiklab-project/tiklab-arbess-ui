import React from 'react'
import {Button} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import { Card, Col, Row } from 'antd';

const StructureTask=props=>{
    return(
        <div className='task-structure'>
            <div className='task-structure-top'>
                <div className='task-structure-top-btn'>
                    <Button>
                        <PoweroffOutlined />停止
                    </Button>
                </div>
                <div className='task-structure-top-card'>
                    <Row gutter={30}>
                        <Col span={6}>
                            <Card title="持续集成" >
                                <div className='task-structure-top-div'>
                                    成功
                                </div>
                                <div className='task-structure-top-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="日常环境测试" >
                                <div className='task-structure-top-div'>
                                    暂停
                                </div>
                                <div className='task-structure-top-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="预发环境测试" >
                                <div className='task-structure-top-div'>
                                    失败
                                </div>
                                <div className='task-structure-top-ul'>
                                    <ul>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="发布">
                                <div className='task-structure-top-div'>
                                    成功
                                </div>
                                <div>
                                    <ul className='task-structure-top-ul'>
                                        <li>版本：1.10.10.2</li>
                                        <li>构建时间：23s</li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='task-structure-bottom'>
                <h1>控制台输出</h1>
            </div>
        </div>
    )
}
export default StructureTask
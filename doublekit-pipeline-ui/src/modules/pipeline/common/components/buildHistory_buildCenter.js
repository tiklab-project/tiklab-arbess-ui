import React from 'react'
import {Card, Col,  Row} from "antd";

const BuildHistory_buildCenter=props=>{
    return(
       <div>
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
export default BuildHistory_buildCenter
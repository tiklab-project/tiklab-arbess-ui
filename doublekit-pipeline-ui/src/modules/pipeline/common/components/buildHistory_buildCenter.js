import React from 'react'
import {Card, Col,  Row} from "antd";

const lis=[
    {
        id:'1',
        title:"持续集成",
        icon:"#icon-yunhangchenggong",
        edition:"1.10.10.2",
        time:"23s",

    },
    {
        id:'2',
        title:"日常环境测试",
        icon:"#icon-zanting2",
        edition:"1.10.10.2",
        time:"23s",
    },
    {
        id:'3',
        title:"持续集成",
        icon:"#icon-yunhangshibai1",
        edition:"1.10.10.2",
        time:"23s",
    },
    {
        id:'4',
        title:"持续集成",
        icon:"#icon-yunhangchenggong",
        edition:"1.10.10.2",
        time:"23s",
    },
]

const BuildHistory_buildCenter=props=>{
    return(
       <div>
           <div className='task-build-center'>
               {
                   lis && lis.map(item=>{
                       return(
                           <Card title={item.title} key={item.id} className='task-build-card'>
                               <div className='task-build-div'>
                                   <svg className="icon" aria-hidden="true">
                                       <use xlinkHref={item.icon}></use>
                                   </svg>
                               </div>
                               <div className='task-build-ul'>
                                   <ul>
                                       <li>版本：{item.edition}</li>
                                       <li>构建时间：{item.time}</li>
                                   </ul>
                               </div>
                           </Card>
                       )
                   })
               }
           </div>
           <div className='task-build-out'>
               <h1>控制台输出</h1>
           </div>
       </div>
    )
}
export default BuildHistory_buildCenter
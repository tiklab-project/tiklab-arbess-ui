import React from 'react'
import { Card } from 'antd';
import Running from "../../../../common/running/running";

const StructureTest = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"/>
                </svg>
            )
        }else {
            if(logList.logCodeState===10 && logList.logTestState===0){
                return (
                    <div className='structure-running'>
                        <Running/>
                    </div>
                )
            }else if(logList.logTestState===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"/>
                    </svg>
                )
            }else if(logList.logTestState===1){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhangshibai1"/>
                    </svg>
                )
            }else {
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhang"/>
                    </svg>
                )
            }
        }
    }

    const time = () => {
        if(!logList){
            return (
                <li>测试时间：0</li>
            )
        }else {
            return (
                <li>测试时间：{logList.logTestTime}</li>
            )
        }
    }

    return(
        <Card title="测试" className='structure-card'>
            <div className='structure-div'>
                {state()}
            </div>
            <div className='structure-ul'>
                <ul>
                    {time()}
                </ul>
            </div>
        </Card>
    )
}

export default StructureTest
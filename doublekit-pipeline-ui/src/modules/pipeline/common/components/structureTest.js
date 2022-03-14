import React from 'react'
import { Card } from 'antd';
import Running from "../../../../common/running/running";

const StructureTest = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"></use>
                </svg>
            )
        }else {
            if(logList.logCodeState===10 && logList.logTestState===0){
                return (
                    <div className='task-structure-running'>
                        <Running/>
                    </div>
                )
            }else if(logList.logTestState===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"></use>
                    </svg>
                )
            }else if(logList.logTestState===1){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhangshibai1"></use>
                    </svg>
                )
            }else {
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhang"></use>
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
        <Card title="测试" className='task-structure-card'>
            <div className='task-structure-div'>
                {state()}
            </div>
            <div className='task-structure-ul'>
                <ul>
                    {time()}
                </ul>
            </div>
        </Card>
    )
}

export default StructureTest
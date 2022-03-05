import React from 'react'
import { Card } from 'antd';
import Running from "../../../../common/running/running";

const BuildClone = props =>{

    const {logList}=props


    const state = () =>{
        if(!logList){
            return (
                <div className='task-structure-running'>
                    <Running/>
                </div>
            )
        }else {
            if(logList.logCodeState===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"></use>
                    </svg>
                )
            }else if(logList.logCodeState===1){
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
                <li>克隆时间：0</li>
            )
        }else {
            return (
                <li>克隆时间：{logList.logCodeTime}</li>
            )
        }
    }

    return(
        <Card title="克隆" className='task-structure-card'>
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

export default BuildClone
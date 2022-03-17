import React from 'react'
import { Card } from 'antd';
import Running from "../../../../common/running/running";

const StructureClone = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"></use>
                </svg>
            )
        }else {
            if(logList.logCodeState===2){
                return (
                    <div className='structure-running'>
                        <Running/>
                    </div>
                )
            }else if(logList.logCodeState===10){
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
        <Card title="克隆" className='structure-card'>
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

export default StructureClone
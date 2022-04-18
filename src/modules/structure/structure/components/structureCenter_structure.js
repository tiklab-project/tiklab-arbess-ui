import React,{useState} from 'react'
import { Card,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const StructureCenter_structure = props =>{

    const {logList}=props
    const [data,setData] =useState(0)
    let se

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"/>
                </svg>
            )
        }else {
            const structureLog=logList.structureLog
            //如果测试时间为10 --运行
            if(logList.testLog.testRunStatus ===10 && structureLog.structureRunStatus===0){
                se = setTimeout(()=>setData(data+1),1000)
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            //如果构建状态为10--成功
            else if(structureLog.structureRunStatus){
                clearTimeout(se)
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            }
            //如果构建状态为1--失败
            else if(structureLog.structureRunStatus===1){
                clearTimeout(se)
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            }else {
                clearTimeout(se)
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            }
        }
    }

    const time = () => {
        if(!logList){
            return 0
        }else {
            return data
        }
    }

    return(
        <Card className='structure-mid-cart'>
            <div className='cart-top'>构建</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>{state()}</div>
                    <div>构建时间： {time()}</div>
                </div>
            </div>
            <div className='cart-bottom' >
                日志
            </div>
        </Card>
    )
}

export default StructureCenter_structure
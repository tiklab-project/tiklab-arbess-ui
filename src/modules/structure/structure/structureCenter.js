import React, {Fragment, useState} from "react";
import {Card,Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const StructureCenter = props =>{

    const {logList,structureStepList} = props
    const [time,setTime] = useState(0)

    const type = item =>{
        if(item){
            switch(item.taskType){
                case 1:
                    return '通用Git'
                case 2:
                    return 'Gitee'
                case 11:
                    return '单元测试'
                case 21:
                    return 'maven'
                case 22:
                    return 'node'
                case 31:
                    return 'linux'
                case 32:
                    return 'docker'
            }
        }
    }

    const status = i =>{
        switch(i){
            case 0 :{
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            case 1 :{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            }
            case 2 :{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            }
            case 3:{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            }
        }
    }

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10  
    const state = index =>{
        if(logList){
            const i = logList.status;
            const j = logList.sort;
            if(i == j ){
                return  status(0)                        
            }else if ((index + 1)*j === i || i === 1  ){
                return  status(1)
            }else if(i === index*j+i  && index*j < i ){
                return  status(2)
            }else if(index *j >i){
                return  status(3)
            }       
        }
    }

    const aa = () =>{
        if(logList){
            return logList.status
        }
    }

    return(
        <div className='structure-mid'>
            {
                structureStepList.length ===0 ? '没有'
                : <Fragment>
                    {                          
                        structureStepList.map((item,index)=>{
                            return(
                                <Card className='structure-mid-cart' key={index} >
                                    <div className='cart-top'>
                                        {item.taskAlias} --
                                        <span style={{paddingLeft:5}}>{type(item)}</span>
                                    </div>
                                    <div className='cart-center'>
                                        <div className='cart-center-item'>
                                            <div>{state(index+1)}</div>
                                            <div>时间:</div>
                                        </div>
                                    </div>
                                    <div className='cart-bottom' >
                                        <span className='cart-bottom-span' onClick={()=>log(item.runLog)}>
                                            日志
                                        </span>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </Fragment>
            }
           
        </div>
    )
}

export default StructureCenter
import React ,{useEffect,useState} from 'react'
import {Card,Divider } from "antd"

const lis=[
    {
        id:1,
        desc:'数量',
        index:'123'
    },
    {
        id:2,
        desc:'数量',
        index:'123'
    },
    {
        id:3,
        desc:'数量',
        index:'123'
    },
    {
        id:4,
        desc:'数量',
        index:'123'
    },
]

const StructureHistoryDetailsLeft = props =>{

    const {historyLog}=props

    return(
        <div className='structureHistory-details-center'  >
            <div className='structureHistory-details-center-test'>构建1</div>
            <Card className='structureHistory-details-center-cart'>
                <div className='cart-top'>Java 代码扫描</div>
                <div className='cart-center'>
                    {
                        lis.map(item=>{
                            return(
                                <div className='cart-center-item' key={item.id}>
                                    <div className='cart-center-info'>{item.index}</div>
                                    <div >{item.desc}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='cart-bom'>
                    <span>日志</span>
                </div>
            </Card>
            <Card className='structureHistory-details-center-cart'>
                <div className='cart-top'>Java 代码扫描</div>
                <div className='cart-center'>
                    {
                        lis.map(item=>{
                            return(
                                <div className='cart-center-item' key={item.id}>
                                    <div className='cart-center-info'>{item.index}</div>
                                    <div >{item.desc}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='cart-bom'>
                    <span>日志</span>
                </div>
            </Card>

        </div>
    )
}

export default StructureHistoryDetailsLeft
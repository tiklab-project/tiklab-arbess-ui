import React from "react";
import StructureLeft_dropdown from "./structureLeft_dropdown";
const li = [
    {
        title:'构建',
        state:'构建状态',
        one:'执行人',
        time:'创建时间'
    },
    {
        title:'构建',
        state:'构建状态',
        one:'执行人',
        time:'创建时间'
    },
    {
        title:'构建',
        state:'构建状态',
        one:'执行人',
        time:'创建时间'
    },
    {
        title:'构建',
        state:'构建状态',
        one:'执行人',
        time:'创建时间'
    }
]

const StructureLeft = props =>{

    const {buildHistoryList} = props

    const sta = item =>{
        if(buildHistoryList){
            switch (item.runStatus) {
                case 0:
                    return  <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dengdai1"/>
                            </svg>
                case 1:
                    return  <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-yunhangshibai1"/>
                            </svg>
                case 30:
                    return  <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-chenggong-"/>
                            </svg>
            }
        }
    }

    const runWay = item => {
        if(buildHistoryList){
            switch (item.runWay) {
                case 1:
                    return  <span>
                                用户点击执行
                            </span>
                default:
                    return  <span>
                                自动
                            </span>
            }
        }
    }

    return(
        <div className='structure-left'>
            <StructureLeft_dropdown/>
            <div className='structure-left-history'>
                <div className='history-content'>
                    {
                        buildHistoryList && buildHistoryList.map((item,index)=>{
                            return(
                                <div className='history-content-list' key={index}>
                                    <div className='list-title'>
                                        <span>
                                            {index}
                                        </span>
                                    </div>
                                    <div className='list-group'>
                                        <div className='list-group-item'>
                                            <div className='list-state'>
                                                <span>状态 : {sta(item)}</span>
                                            </div>
                                            <div className='list-one'>
                                                <span>执行人 : {item.execName}</span>
                                            </div>
                                        </div>
                                        <div className='list-time'>
                                            <span>执行方式 : {runWay(item)}</span>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default StructureLeft
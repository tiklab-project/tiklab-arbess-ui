import React from "react";

const Head = props =>{
    const lis = [
        {
            id:1,
            title:'我的收藏',
            to:'/index/collect',
        },
        {
            id:2,
            title: '我的流水线',
            to:'/index/pipeline',
        },
        {
            id:3,
            title: '用户中心',
            to:'/index/system/base',
        },
        {
            id:4,
            title: '权限管理',
            to:'/index/system/power/feature',
        },
        {
            id:5,
            title: '凭证管理',
            to:'/index/system/proof',
        }
    ]
    return(
        <div className='homePage-head'>
            {
                lis.map(item=>{
                    return(
                        <div key={item.id} className='head-group' onClick={()=>props.history.push(item.to)}>
                            <div className='head-group-wrap'>
                                <div className='head-group-wrap-title'>{item.title}</div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Head
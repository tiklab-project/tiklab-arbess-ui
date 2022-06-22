import React, {Fragment, useEffect} from "react";
import {Button, List} from "antd";

const Dynamic = props =>{

    const {userId,findUserAction,dynamicList} = props

    useEffect(()=>{
        const param = {
            userId:userId
        }
        findUserAction(param)
    },[])

    const goUser = () => {
        props.history.push('/index/system/base')
    }
    
    const goPipeline = item =>{
        localStorage.setItem('pipelineName',item.pipelineName)
        localStorage.setItem('pipelineId',item.pipelineId)
        props.history.push('/index/task/work')
    }

    return(
        <div className='homePage-content-dynamic'>
            <div className='dynamic-top'>
                <div className='dynamic-top-title'>动态</div>
                <div><Button>更多</Button></div>
            </div>
            <div className='dynamic-bottom'>
                <List
                    size="large"
                    bordered
                    dataSource={dynamicList}
                    renderItem={(item,index) => <List.Item>
                        <div  className='dynamic-bottom-listHeader'>
                            <div>{index+1}、
                                用户
                                <span className='name' onClick={()=>goUser(item.user)}>
                                   {item.user && item.user.name}
                                </span>
                                {item.massage}
                                <span className='name' onClick={()=>goPipeline(item.pipeline)}>
                                    {item.pipeline && item.pipeline.pipelineName}
                                </span>
                                {item.news}
                            </div>
                            <div>{item.createTime}</div>
                        </div>
                    </List.Item>}
                    locale={{emptyText:
                        <Fragment>
                            <svg className="icon" aria-hidden="true" >
                                <use xlinkHref="#icon-meiyouxiangguan"/>
                            </svg>
                            <div>没有数据</div>
                        </Fragment>
                    }}
                />
            </div>
        </div>
    )
}

export default Dynamic
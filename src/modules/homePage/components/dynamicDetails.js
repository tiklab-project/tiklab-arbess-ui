import React, {useEffect, Fragment, useState} from "react";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import {getUser} from "doublekit-core-ui";
import {List,ConfigProvider} from "antd";
import "./dynamicDetails.scss";
import zhCN from "antd/es/locale/zh_CN";

const DynamicDetails = props =>{

    const {homePageStore} = props
    const {findUserAction,dynamicList,page} = homePageStore
    const [pageNumber,setPageNumber] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:15,
        }
        findUserAction(params)
    },[])

    const onChangePage = page =>{
        const params = {
            userId:userId,
            page:page,
            pageSize:15,
        }
        setPageNumber(page)
        findUserAction(params)
    }

    const goUser = item => {
        if(item.id === userId){
            props.history.push("/index/system")
        }else {
            props.history.push("/index/system/list")
        }
    }

    const goPipeline = item =>{
        localStorage.setItem("pipelineName",item.pipelineName)
        localStorage.setItem("pipelineId",item.pipelineId)
        props.history.push("/index/task")
    }

    return(
        <div className="dynamicDetails">
            <ConfigProvider locale={zhCN}>
                <List
                    size="large"
                    bordered
                    pagination={{
                        ...page,
                        onChange:(page) => {onChangePage(page)},
                        hideOnSinglePage:true,  //只有一页时是否隐藏分页器
                        showQuickJumper:true,   //是否可以快速跳转至某页
                        showSizeChanger:false, //是否展示 pageSize 切换器
                    }}
                    locale={{emptyText:
                            <Fragment>
                                <svg className="icon" aria-hidden="true" >
                                    <use xlinkHref="#icon-meiyouxiangguan"/>
                                </svg>
                                <div>没有数据</div>
                            </Fragment>
                    }}
                    dataSource={dynamicList}
                    renderItem={(item,index) => <List.Item>
                        <div  className="dynamicDetails-bottom-listHeader">
                            <div>
                                <span>{(index+1)+(pageNumber-1)*15}、用户</span>
                                <span className="name" onClick={()=>goUser(item.user)}>
                                   {item.user && item.user.name}
                                </span>
                                <span>{item.massage}</span>
                                <span className="name" onClick={()=>goPipeline(item.pipeline)}>
                                    {item.pipeline && item.pipeline.pipelineName}
                                </span>
                                <span>{item.news}</span>
                            </div>
                            <div>{item.createTime}</div>
                        </div>
                    </List.Item>}
                />
            </ConfigProvider>
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(DynamicDetails)))
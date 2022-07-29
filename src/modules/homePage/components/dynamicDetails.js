import React,{Fragment,useEffect,useState} from "react";
import "./dynamicDetails.scss";
import zhCN from "antd/es/locale/zh_CN";
import {getUser} from "tiklab-core-ui";
import {List,ConfigProvider,Button} from "antd";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

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

    const goMatFlow = item =>{
        props.history.push(`/index/task/${item.matFlowName}/work`)
    }

    return(
        <div className="dynamic">
            <div className="dynamic-top">
                <div className="dynamic-top-title">全部动态</div>
                <div>
                    <Button onClick={()=>props.history.push("/index/home")}>
                        返回
                    </Button>
                </div>
            </div>
            <ConfigProvider locale={zhCN}>
                <List
                    size="large"
                    bordered
                    pagination={{
                        ...page,
                        onChange:(page) => {onChangePage(page)},
                        hideOnSinglePage:true,
                        showQuickJumper:true,
                        showSizeChanger:false,
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
                        <div  className="dynamic-bottom-listHeader">
                            <div>
                                <span>{(index+1)+(pageNumber-1)*15}、用户</span>
                                <span className="name" onClick={()=>goUser(item.user)}>
                                   {item.user && item.user.name}
                                </span>
                                <span>{item.massage}</span>
                                <span className="name" onClick={()=>goMatFlow(item.matFlow)}>
                                    {item.matFlow && item.matFlow.matFlowName}
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
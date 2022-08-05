import React,{useEffect} from "react";
import "./homePage.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {PrivilegeButton} from "tiklab-privilege-ui";
import {Button} from "antd";
import echarts from "../../../common/echarts/echarts";

const HomePage = props =>{

    const {homePageStore} = props
    const {findAllOpen,matFlowNearList,runState,findUserAction,dynamicList} = homePageStore
    const userId = getUser().userId

    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:10,
        }

        // 最近动态
        findUserAction(params)

        // 最近打开的流水线
        findAllOpen(userId)

        // 折线图，近期构建状态
        runState(userId).then(res=>{
            if(res.code === 0 && res.data){
                renderChart(res.data)
            }
        })
    },[])

    const renderChart = data => {
        const x = []
        const success = []
        const fail = []
        const stop = []
        for (let i = 0;i < data.length;i++){
            x.push(data[i].time)
            success.push(data[i].successNumber)
            fail.push(data[i].errorNumber)
            stop.push(data[i].removeNumber)
        }
        burnDownChart(x,success,fail,stop)
    }

    // 不受控制
    const stableList = [
        {
            id:1,
            title:"我的收藏",
            to:"/index/collect",
        },
        {
            id:2,
            title: "我的流水线",
            to:"/index/matFlow",
        },
    ]

    // 受控制
    const inStableLis = [
        {
            id:3,
            title: "用户中心",
            to:"/index/system/base",
            enCode:"A",
        },
        {
            id:4,
            title: "权限管理",
            to:"/index/system/power/role",
            enCode:"E2",
        },
        {
            id:5,
            title: "凭证管理",
            to:"/index/system/proof",
            enCode:"F",
        },
    ]

    const renderStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <div key={item.id} className="head-group" onClick={()=>props.history.push(item.to)}>
                    <div className="head-group-wrap">
                        <div className="head-group-wrap-title">{item.title}</div>
                    </div>
                </div>
            )
        })
    }

    const renderInStableList = lis => {
        return lis && lis.map(item=>{
            return(
                <PrivilegeButton key={item.id} code={item.enCode} {...props}>
                    <div key={item.id} className="head-group" onClick={()=>props.history.push(item.to)}>
                        <div className="head-group-wrap">
                            <div className="head-group-wrap-title">{item.title}</div>
                        </div>
                    </div>
                </PrivilegeButton>
            )
        })
    }

    const goMatFlow = matFlowName => {
        props.history.push(`/index/task/${matFlowName}/work`)
    }

    const burnDownChart = (timerXaixs, successYaixs, failsYaxis,stopYaxis) => {
        const burnDown = echarts.init(document.getElementById("burn-down"))
        let option;
        option = {
            title: {
                text: "近期构建状态",
            },
            color: [ "#1890ff", "#e5323e","#222222"],
            xAxis: {
                data: timerXaixs,
            },
            yAxis: {
                name: "单位：次",
            },
            // tooltip:{},
            legend: {
                data: ["成功", "失败","停止"],
                show: true,
                // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。
                selectedMode: true,
                top: 0,
                width: "80%",
                right: 0,
            },
            series: [
                {
                    name: "成功",
                    type: "bar",
                    seriesLayoutBy: "column",
                    data: successYaixs,
                },
                {
                    name: "失败",
                    type: "bar",
                    data: failsYaxis,
                },
                {
                    name: "停止",
                    type: "bar",
                    data: stopYaxis,
                }],
        };
        burnDown.setOption(option)
        // 折线图随窗口大小改变
        window.onresize = function () {
            burnDown.resize();
        }
    }

    const goUser = item => {
        props.history.push("/index/system/base")
        // if(item.id === userId){
        //     props.history.push("/index/system/base")
        // }else {
        //     props.history.push("/index/system/list")
        // }
    }
    
    const emptyText = (<div style={{textAlign:"center"}}>
                            <svg className="icon" aria-hidden="true" >
                                <use xlinkHref="#icon-meiyouxiangguan"/>
                            </svg>
                            <div>没有数据</div>
                        </div>)

    return(
        <div className="homePage">
            <div className="homePage-head">
                {renderStableList(stableList)}
                {renderInStableList(inStableLis)}
            </div>
            <div className="homePage-content">
                <div className="homePage-content-left">
                    <div className="homePage-content-matFlowNear">
                        <div className="matFlowNear-title">最近打开的流水线</div>
                        <div className="matFlowNear-active">
                            {
                                matFlowNearList && matFlowNearList.length>0 ?
                                    matFlowNearList.map((item,index)=>{
                                        return  <div key={item.matFlowId} className="matFlowNear-active-group">
                                                    <div className="matFlowNear-active-group-desc">
                                                        <span>{index+1}、</span>
                                                        <span onClick={()=>goMatFlow(item.matFlowName)} className="name">
                                                            {item.matFlowName}
                                                         </span>
                                                    </div>
                                                </div>
                                    })
                                    :
                                    emptyText
                            }
                        </div>
                    </div>
                    <div className="homePage-content-dynamic">
                        <div className="dynamic-top">
                            <div className="dynamic-top-title">近期动态</div>
                            <div>
                                <Button onClick={()=>props.history.push("/index/dynamic")}>
                                    更多
                                </Button>
                            </div>
                        </div>
                        <div className="dynamic-bottom">
                            {
                                dynamicList && dynamicList.length>0 ?
                                    dynamicList.map((item,index)=>{
                                        return <div className="dynamic-bottom-listHeader" key={index}>
                                                    <div>
                                                        <span>{index+1}、用户</span>
                                                        <span className="name" onClick={()=>goUser(item.user)}>
                                                            {item.user && item.user.name}
                                                        </span>
                                                        <span>{item.massage}</span>
                                                        <span className="name"
                                                              onClick={()=>goMatFlow(item.matFlow && item.matFlow.matflowName)}
                                                        >
                                                            {item.matFlow && item.matFlow.matflowName}
                                                        </span>
                                                        <span>{item.news}</span>
                                                    </div>
                                                    <div>{item.createTime}</div>
                                                </div>
                                    })
                                    :
                                    emptyText
                            }
                        </div>
                    </div>
                </div>
                <div className="homePage-content-right">
                    <div className="homePage-content-statusChart">
                        <div className="statusChart" id="burn-down"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore")(observer(HomePage)))
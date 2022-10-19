import React,{useEffect} from "react";
import echarts from "../../../common/echarts/echarts";
import {getUser} from "tiklab-core-ui";
import DynamicList from "./dynamicList";
import PipelineNear from "./pipelineNear";
import QuickIn from "./quickIn";
import Agency from "./agency";
import Tidings from "./tidings";
import "./homePage.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const HomePage = props =>{

    const {homePageStore,pipelineStore} = props
    const {findAllOpen,pipelineNearList,runState,findLog,dynamicList} = homePageStore
    const {findAllFollow,findAllPipelineStatus,pipelineLength,followLength,setListType} = pipelineStore

    const userId = getUser().userId

    useEffect(()=>{
        const params = {
            userId:userId,
            page:1,
            pageSize:10,
        }

        // 所有流水线
        findAllPipelineStatus(userId)
        // 我收藏的流水线
        findAllFollow(userId)

        // 最近动态
        findLog(params)

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

    const burnDownChart = (timerXaixs,successYaixs, failsYaxis,stopYaxis) => {
        const burnDown = echarts.init(document.getElementById("burn-down"))
        let option
        option = {
            color: [ "#1890ff", "#e5323e","#222222"],
            xAxis: {
                data: timerXaixs,
            },
            yAxis: {
                name: "单位：次",
                type: "value",
                interval:1, // 步长
                min:1, // 起始
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
            burnDown.resize()
        }
    }

    return(
        <div className="homePage home-limited">
            <div className="homePage-content">
                <div className="homePage-content-left">
                    <QuickIn
                        {...props}
                        setListType={setListType}
                        pipelineLength={pipelineLength}
                        followLength={followLength}
                    />
                    <PipelineNear
                        {...props}
                        pipelineNearList={pipelineNearList}
                    />
                    <Agency
                        {...props}
                    />
                    <DynamicList
                        {...props}
                        dynamicList={dynamicList}
                    />
                </div>
                <div className="homePage-content-left">
                    <div className="statusChart">
                        <div className="statusChart-title">近期构建状态</div>
                        <div className="statusChart-box" id="burn-down"/>
                    </div>
                    <Tidings
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("homePageStore","pipelineStore")(observer(HomePage)))
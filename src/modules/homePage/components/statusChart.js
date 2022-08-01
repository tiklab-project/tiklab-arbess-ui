import React,{useEffect} from "react";
import echarts from "../../../common/echarts/echarts";

const StatusChart = props =>{

    const {runState,userId} = props

    useEffect(()=>{
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

    return (
        <div className="homePage-content-statusChart">
            <div className="statusChart" id="burn-down" />
        </div>
    )
}

export default StatusChart
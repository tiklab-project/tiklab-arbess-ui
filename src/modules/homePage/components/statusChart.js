import React, {useEffect, useState} from "react";
import ReactEcharts from 'echarts-for-react';

const StatusChart = props =>{

    const {runState,userId} = props
    const [xData,setXData] = useState([])
    const [successData,setSuccessData] = useState([])
    const [failData,setFailData] = useState([])
    const [stopData,setStopData] = useState([])

    useEffect(()=>{
        const x = []
        const success = []
        const fail = []
        const stop = []
        runState(userId).then(res=>{
            for (let i = 0;i<res.data.length;i++){
                x.push(res.data[i].time)
                success.push(res.data[i].successNumber)
                fail.push(res.data[i].errorNumber)
                stop.push(res.data[i].removeNumber)
            }
            setXData([...x])
            setSuccessData([...success])
            setFailData([...fail])
            setStopData([...stop])
        })
        return
    },[])


    const getOption = {
        title: {
            text: '近期构建状态',
        },
        color: [ "#1890ff", "#e5323e",'#222222'],
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {
            name: '单位：次',
        },
        legend: {
            data: ['成功', '失败','停止'],
            show: true,
            // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。
            selectedMode: true,
            top: 0,
            width: '80%',
            right: 0,
        },
        series: [
            {
                name: '成功',
                type: 'bar',
                seriesLayoutBy: "column",
                data: successData
            },
            {
                name: '失败',
                type: 'bar',
                data: failData
            },
            {
                name: '停止',
                type: 'bar',
                data: stopData
            }]
    }

    return(
        <div className='homePage-content-statusChart'>
            <ReactEcharts option={getOption}/>
        </div>
    )
}

export default StatusChart
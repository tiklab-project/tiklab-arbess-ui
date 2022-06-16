import React from "react";
import ReactEcharts from 'echarts-for-react'

const StatusChart = props =>{

    const getOption = () => {
        return {
            title: {
                text: '近期构建状态',

            },
            color: [ "#1890ff", "#e5323e"],
            tooltip: {},
            legend: {
                data: ['成功', '失败']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋"]
            },
            yAxis: {},
            series: [
                {
                    name: '成功',
                    type: 'bar',
                    data: [1,2,3,4,6]
                },
                {
                    name: '失败',
                    type: 'bar',
                    data: [1,2,3,4,6]
                }]
        }
    }

    return(
        <div className='homePage-content-statusChart'>
            <ReactEcharts option={getOption()}/>
        </div>
    )
}

export default StatusChart
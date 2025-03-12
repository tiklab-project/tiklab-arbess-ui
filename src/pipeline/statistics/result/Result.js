/**
 * @Description: 流水线结果统计
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React, {useEffect, useRef, useState} from 'react';
import {Col, Row, Select, Spin} from "antd";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import statisticsStore from "../common/StatisticsStore";
import echarts from "../../../common/component/echarts/Echarts";
import '../common/Statistics.scss';
import SearchSelect from "../../../common/component/search/SearchSelect";

const Result = props =>{

    const {match} = props;

    const {findPipelineRunResultCount} = statisticsStore

    const chartRefs = {
        numberTrend:useRef(null),
        rateTrend: useRef(null)
    }

    //加载状态
    const [spinning, setSpinning] = useState({
        numberTrend: false,
        rateTrend: false,
    })
    //时间筛选
    const [countDay,setCountDay] = useState(7);

    useEffect(() => {
        //echart宽度自适应
        const handleResize = () => {
            Object.keys(chartRefs).forEach((key) => {
                const chartDom = chartRefs[key].current;
                if (chartDom) {
                    const chart = echarts.getInstanceByDom(chartDom);
                    if (chart) {
                        chart.resize();
                    }
                }
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            Object.keys(chartRefs).forEach((key) => {
                const chartDom = chartRefs[key].current;
                if (chartDom) {
                    const chart = echarts.getInstanceByDom(chartDom);
                    if (chart) {
                        chart.dispose();
                    }
                }
            });
        };
    }, []);

    useEffect(() => {
        fetchStatistics()
    }, [countDay]);

    /**
     * 获取结果统计
     */
    const fetchStatistics = () =>{
        fetchTrendStatistics('number','numberTrend','次')
        fetchTrendStatistics('rate','rateTrend','%')
    }

    /**
     * 获取运行结果
     */
    const fetchTrendStatistics = (type, chartKey, unit) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineRunResultCount({pipelineId:match.params.id, countDay,type}).then(res=>{
            if(res.code===0){
                renderTrendChart(res.data, chartKey, unit);
            }
        }).finally(()=>setSpinning(pev=>({...pev, [chartKey]: false})))
    }

    const renderTrendChart = (data,chartKey,unit) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    let tooltipText = params[0].name;
                    params.forEach((item) => {
                        tooltipText += `<br/>${item.seriesName}: ${item.value}${unit}`;
                    });
                    return tooltipText;
                }
            },
            xAxis: {
                type: 'category',
                data: data && data.map(item=>item.day),
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: `{value}${unit}`
                }
            },
            legend:{
                data: unit==='次'? ['成功数', '失败数', '终止数']:['成功率', '失败率', '终止率'],
                top:20
            },
            series: [
                {
                    type: 'line',
                    name: unit==='次'?'成功数':'成功率',
                    data: data && data.map(item => item.successNumber),
                },
                {
                    type: 'line',
                    name: unit==='次'?'失败数':'失败率',
                    data: data && data.map(item => item.errorNumber),
                },
                {
                    type: 'line',
                    name: unit==='次' ? '终止数':'终止率',
                    data: data && data.map(item => item.haltNumber),
                }
            ]
        }
        chart && chart.setOption(option);
    }

    return (
        <Row className='pipeline-statistics'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
                className="arbess-home-limited"
            >
                <div className='statistics-select'>
                    <BreadCrumb firstItem={'结果统计'}/>
                    <SearchSelect
                        onChange={value=>{setCountDay(value)}}
                        value={countDay}
                        style={{width:150}}
                    >
                        <Select.Option value={7}>最近7天</Select.Option>
                        <Select.Option value={14}>最近14天</Select.Option>
                        <Select.Option value={30}>最近30天</Select.Option>
                        <Select.Option value={90}>最近90天</Select.Option>
                    </SearchSelect>
                </div>
                <div className='statistics-box'>
                    {['numberTrend', 'rateTrend'].map((key) => (
                        <div className='statistics-item' key={key}>
                            <div className='statistics-title'>
                                {key === 'numberTrend' && '结果数量统计'}
                                {key === 'rateTrend' && '结果概率统计'}
                            </div>
                            <Spin spinning={spinning[key]}>
                                <div ref={chartRefs[key]} style={{ height: 360 }} />
                            </Spin>
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    )
}

export default Result;

import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Spin, Select } from 'antd';
import BreadCrumb from '../../../common/component/breadcrumb/BreadCrumb';
import SearchSelect from "../../../common/component/search/SearchSelect";
import echarts from '../../../common/component/echarts/Echarts';
import statisticsStore from '../common/StatisticsStore';
import '../common/Statistics.scss';

/**
 * Operate Statistics
 * @param props
 * @returns {Element}
 * @constructor
 */
const Operate = (props) => {

    const { match } = props;
    const { findPipelineRunTimeSpan, findPipelineRunCount } = statisticsStore;

    const chartRefs = {
        runTimeSpan: useRef(null),
        timeTrend: useRef(null),
        successTrend: useRef(null),
        errorTrend: useRef(null),
        haltTrend: useRef(null)
    };

    const [countDay, setCountDay] = useState(7);
    const [spinning, setSpinning] = useState({
        runTimeSpan: false,
        timeTrend: false,
        successTrend: false,
        errorTrend: false,
        haltTrend: false
    });

    useEffect(() => {
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
        fetchStatistics();
    }, [countDay]);

    const fetchStatistics = () => {
        fetchRunTimeSpan();
        fetchTrendStatistics('time', 'timeTrend', '平均执行时长趋势', 's');
        fetchTrendStatistics('success', 'successTrend', '成功率趋势', '%');
        fetchTrendStatistics('error', 'errorTrend', '失败率趋势', '%');
        fetchTrendStatistics('halt', 'haltTrend', '终止率趋势', '%');
    };

    const fetchRunTimeSpan = () => {
        setSpinning(pev=>({...pev, runTimeSpan: true}));
        findPipelineRunTimeSpan({ pipelineId: match.params.id, countDay }).then(res=>{
            if (res.code === 0) {
                renderRunTimeSpanChart(res.data);
            }
            setSpinning(pev=>({...pev, runTimeSpan: false}));
        })
    };

    const fetchTrendStatistics = (type, chartKey, title, unit) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineRunCount({ pipelineId: match.params.id, countDay, type }).then(res=>{
            if (res.code === 0) {
                renderTrendChart(res.data, chartKey, title, unit);
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    };

    const renderRunTimeSpanChart = (runSpan) => {
        const chartDom = chartRefs.runTimeSpan.current;
        if(!chartDom){return;}
        let myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const hoursA = ['04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];
        const xAxisData = runSpan.map((item) => item.day);
        const processData = (rawData) => {
            const data = [];
            rawData.forEach((dayData, dayIndex) => {
                hoursA.forEach((time, timeIndex) => {
                    const timeData = dayData.runTimeCountList.find((t) => t.time === time);
                    const value = timeData ? timeData.number : 0;
                    data.push([dayIndex, timeIndex, value]);
                });
            });
            return data;
        };
        const data = processData(runSpan);

        const option = {
            tooltip: {
                position: 'top',
                formatter: (params) => {
                    const startHour = hoursA[params.value[1]].split(':')[0] - 3;
                    return `${xAxisData[params.value[0]]} ${Number(startHour < 23 ? startHour - 1 : startHour)}:00 - ${hoursA[params.value[1]]} <br/> 运行次数: ${params.value[2]}`;
                }
            },
            grid: {
                top: '20%',
                height: '50%'
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#f8f8f8']
                    }
                }
            },
            yAxis: {
                type: 'category',
                data: hoursA,
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            },
            visualMap: {
                type: 'piecewise',
                min: 1,
                max: 50,
                maxOpen: true,
                calculable: true,
                show: true,
                orient: 'horizontal',
                right: '10%',
                top: '10%',
                inRange: { color: ['#ececec', '#c0e6ff', '#7abaff', '#309eff', '#007fff'] },
                outOfRange: { color: '#f8f8f8' },
                text: ['多', '少'],
                itemWidth: 10,
                itemHeight: 10
            },
            series: [
                {
                    name: '运行时段',
                    type: 'heatmap',
                    data: data,
                    label: { show: false },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    emphasis: { itemStyle: {} }
                }
            ]
        };
        myChart.setOption(option);
    };

    const renderTrendChart = (data, chartKey, title, unit) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            xAxis: {
                type: 'category',
                data: data.map((item) => item.day)
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: `{value}${unit}`
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value}${unit}`;
                }
            },
            legend: {
                data: [title],
                top: 20
            },
            series: [
                {
                    type: 'line',
                    name: title,
                    data: data.map((item) => item.number)
                }
            ]
        };
        chart.setOption(option);
    };

    return (
        <Row className='pipeline-statistics'>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
                className="mf-home-limited"
            >
                <div className='statistics-select'>
                    <BreadCrumb firstItem='运行统计' />
                    <SearchSelect onChange={(value) => setCountDay(value)} value={countDay} style={{ width: 150 }}>
                        <Select.Option value={7}>最近7天</Select.Option>
                        <Select.Option value={14}>最近14天</Select.Option>
                        <Select.Option value={30}>最近30天</Select.Option>
                        <Select.Option value={90}>最近90天</Select.Option>
                    </SearchSelect>
                </div>
                <div className='statistics-box'>
                    {['runTimeSpan', 'timeTrend', 'successTrend', 'errorTrend', 'haltTrend'].map((key) => (
                        <div className='statistics-item' key={key}>
                            <div className='statistics-title'>
                                {key === 'runTimeSpan' && '运行时间段统计'}
                                {key === 'timeTrend' && '平均执行时长趋势'}
                                {key === 'successTrend' && '成功率趋势'}
                                {key === 'errorTrend' && '失败率趋势'}
                                {key === 'haltTrend' && '终止率趋势'}
                            </div>
                            <Spin spinning={spinning[key]} tip={key === 'runTimeSpan' ? '查询中' : ''}>
                                <div ref={chartRefs[key]} style={{ height: 360 }} />
                            </Spin>
                        </div>
                    ))}
                </div>
            </Col>
        </Row>
    );
};

export default Operate;

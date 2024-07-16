import React,{useEffect,useState,useRef} from 'react'
import {Row, Col, Spin, Select} from 'antd';
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import echarts from "../../../common/component/echarts/Echarts";
import statisticsStore from "../common/StatisticsStore";
import '../common/Statistics.scss';

/**
 * 运行统计
 * @param props
 * @returns {Element}
 * @constructor
 */
const Operate = props =>{

    const {match} = props;

    const {findPipelineRunTimeSpan,findPipelineRunCount} = statisticsStore;

    const chartRef = useRef(null);
    const timeRef = useRef(null);
    const successRef = useRef(null);
    const errorRef = useRef(null);
    const haltRef = useRef(null);

    //时间筛选
    const [countDay,setCountDay] = useState(7);
    //加载状态
    const [spinning,setSpinning] = useState(false);
    const [timeSpinning,setTimeSpinning] = useState(false);
    const [successSpinning,setSuccessSpinning] = useState(false);
    const [errorSpinning,setErrorSpinning] = useState(false);
    const [haltSpinning,setHaltSpinning] = useState(false);

    let myChart,timeChart,successChart,errorChart,haltChart;

    useEffect(() => {
        return ()=>{
            if(myChart){
                myChart.dispose();
            }
            if(timeChart){
                timeChart.dispose()
            }
            if(successChart){
                successChart.dispose()
            }
            if(errorChart){
                errorChart.dispose()
            }
            if(haltChart){
                haltChart.dispose()
            }
        }
    }, []);

    useEffect(() => {
        //运行时间段统计
        findRunTimeSpan();
        //平均执行时长趋势
        findTimeOperate()
        //成功率趋势
        findSuccessOperate()
        //失败率趋势
        findErrorOperate()
        //终止率趋势
        findHaltOperate()
    }, [countDay]);

    /**
     * 运行时间段统计
     */
    const findRunTimeSpan = () => {
        setSpinning(true)
        findPipelineRunTimeSpan({
            pipelineId: match.params.id,
            countDay,
        }).then(res=>{
            if(res.code===0){
                renderEchart(res.data)
            }
            setSpinning(false)
        })
    }

    const renderEchart = (runSpan) => {

        const chartDom = chartRef.current;
        // 获取实例
        myChart = echarts.getInstanceByDom(chartDom);

        if (!myChart) {
            myChart = chartDom && echarts.init(chartDom);
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        }

        const hoursA = ['04:00', '08:00', '12:00', '16:00', '20:00', '23:59'];

        const xAxisData = runSpan.map(item=>item.day);

        // 示例数据，替换为您的实际数据
        // [dayIndex, hourIndex, value]
        // dayIndex: 日期在 days 数组中的索引
        // hourIndex: 小时在 hours 数组中的索引
        // value: 代表某一时间段的值。
        const processData = (rawData) => {
            const data = [];
            rawData.forEach((dayData, dayIndex) => {
                hoursA.forEach((time, timeIndex) => {
                    const timeData = dayData.runTimeCountList.find(t=>t.time===time);
                    const value = timeData ? timeData.number : 0;
                    data.push([dayIndex, timeIndex, value]);
                });
            });
            return data;
        };

        const data = runSpan && processData(runSpan);

        const option = {
            tooltip: {
                position: 'top',
                formatter: function (params) {
                    const startHour = hoursA[params.value[1]].split(':')[0]-3;
                    return `${xAxisData[params.value[0]]} ${Number(startHour<23?(startHour-1):startHour)}:00 - ${hoursA[params.value[1]]} <br/> 运行次数: ${params.value[2]}`;
                }
            },
            grid: {
                top: '20%',
                height:'50%'
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLine: {show: false,},
                axisTick: {show: false,},
                splitLine: {show: false,},
                splitArea: {
                    show: true,
                    areaStyle:{
                        color: ['#f8f8f8']
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: hoursA,
                axisLine: {show: false,},
                axisTick: {show: false,},
                splitLine: {show: false,},
            },
            visualMap: {
                type: 'piecewise',
                min: 1,
                max: 30,
                calculable: true,
                show: true,
                orient: 'horizontal',
                right: '10%',
                top: '10%',
                inRange: {color: ['#ececec','#c0e6ff', '#7abaff', '#309eff', '#007fff']},
                outOfRange: {color: '#f8f8f8'},
                text: ['多', '少'],
                itemWidth: 10,
                itemHeight: 10,
            },
            series: [
                {
                    name: '运行时段',
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    emphasis: {
                        itemStyle: {

                        }
                    }
                }
            ]
        };
        myChart && myChart.setOption(option);
    }

    const findOperate = type =>{
        return findPipelineRunCount({
            pipelineId:match.params.id,
            countDay,type
        })
    }

    /**
     * 平均执行时长趋势
     */
    const findTimeOperate = () => {
        setTimeSpinning(true)
        findOperate('time').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,timeChart,timeRef,'平均执行时长趋势')
            }
            setTimeSpinning(false)
        })
    }

    /**
     * 成功率趋势
     */
    const findSuccessOperate = () => {
        setSuccessSpinning(true)
        findOperate('success').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,successChart,successRef,'成功率趋势')
            }
            setSuccessSpinning(false)
        })
    }

    /**
     * 失败率趋势
     */
    const findErrorOperate = () => {
        setErrorSpinning(true)
        findOperate('error').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,errorChart,errorRef,'失败率趋势')
            }
            setErrorSpinning(false)
        })
    }

    /**
     * 终止率趋势
     */
    const findHaltOperate = () => {
        setHaltSpinning(true)
        findOperate('halt').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,haltChart,haltRef,'终止率趋势')
            }
            setHaltSpinning(false)
        })
    }

    const echartsHtml = (data,chart,ref,title) => {
        const chartDom = ref.current;
        chart = echarts.getInstanceByDom(chartDom);
        if (!chart) {
            chart = chartDom && echarts.init(chartDom);
        }
        const option = {
            xAxis: {
                type: 'category',
                data: data && data.map(item=>item.day),
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: title==='平均执行时长趋势' ? '{value}S' : '{value}%'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                data:[title],
                top:20
            },
            series: [
                {
                    type: 'line',
                    name: title,
                    data: data && data.map(item=>item.number),
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
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
                className="mf-home-limited mf"
            >
                <div className='statistics-select'>
                    <BreadCrumb firstItem={'运行统计'}/>
                    <Select
                        onChange={value=>{setCountDay(value)}}
                        value={countDay}
                        style={{width:180}}
                    >
                        <Select.Option value={7}>最近7天</Select.Option>
                        <Select.Option value={14}>最近14天</Select.Option>
                        <Select.Option value={30}>最近30天</Select.Option>
                        <Select.Option value={90}>最近90天</Select.Option>
                    </Select>
                </div>
                <div className='statistics-box'>
                    <div className='statistics-item'>
                        <div className='statistics-title'>运行时间段统计</div>
                        <Spin spinning={spinning} tip={'查询中'}>
                            <div ref={chartRef} style={{ height: 360 }} />
                        </Spin>
                    </div>
                    <div className='statistics-item'>
                        <div className='statistics-title'>平均执行时长趋势</div>
                        <Spin spinning={timeSpinning}>
                            <div ref={timeRef} style={{ height:360 }} />
                        </Spin>
                    </div>
                    <div className='statistics-item'>
                        <div className='statistics-title'>成功率趋势</div>
                        <Spin spinning={successSpinning}>
                            <div ref={successRef} style={{ height: 360 }} />
                        </Spin>
                    </div>
                    <div className='statistics-item'>
                        <div className='statistics-title'>失败率趋势</div>
                        <Spin spinning={errorSpinning}>
                            <div ref={errorRef} style={{ height: 360 }} />
                        </Spin>
                    </div>
                    <div className='statistics-item'>
                        <div className='statistics-title'>终止率趋势</div>
                        <Spin spinning={haltSpinning}>
                            <div ref={haltRef} style={{ height: 360 }} />
                        </Spin>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Operate

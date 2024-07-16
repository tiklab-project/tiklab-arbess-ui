import React, {useEffect, useRef, useState} from 'react';
import {Col, Row, Select, Spin} from "antd";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import statisticsStore from "../common/StatisticsStore";
import echarts from "../../../common/component/echarts/Echarts";
import '../common/Statistics.scss';


const Result = props =>{

    const {match} = props;

    const {findPipelineRunResultCount} = statisticsStore

    const numberRef = useRef(null);
    const rateRef = useRef(null);

    //加载状态
    const [numberSpinning,setNumberSpinning] = useState(false);
    const [rateSpinning,setRateSpinning] = useState(false);
    //时间筛选
    const [countDay,setCountDay] = useState(7);

    let numberChart,rateChart;
    useEffect(() => {
        return ()=>{
            if(numberChart){
                numberChart.dispose();
            }
            if(rateChart){
                rateChart.dispose();
            }
        }
    }, []);

    useEffect(() => {
        findNumberResult()
        findRateResult()
    }, [countDay]);

    const findResultCount = (type) => {
        return findPipelineRunResultCount({
            pipelineId:match.params.id,
            countDay,type
        })
    }

    const findNumberResult = () => {
        setNumberSpinning(true)
        findResultCount('number').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,numberChart,numberRef,'number')
            }
            setNumberSpinning(false)
        })
    }

    const findRateResult = () => {
        setRateSpinning(true)
        findResultCount('rate').then(res=>{
            if(res.code===0){
                echartsHtml(res.data,rateChart,rateRef,'rate')
            }
            setRateSpinning(false)
        })
    }

    const echartsHtml = (data,chart,ref,title) => {
        const chartDom = ref.current;
        chart = echarts.getInstanceByDom(chartDom);
        if (!chart) {
            chart = chartDom && echarts.init(chartDom);
        }
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: data && data.map(item=>item.day),
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: title==='number' ? '{value}次' : '{value}%'
                }
            },
            legend:{
                data: title==='number'? ['成功数', '失败数', '终止数']:['成功率', '失败率', '终止率'],
                top:20
            },
            series: [
                {
                    type: 'line',
                    name: title==='number'?'成功数':'成功率',
                    data: data && data.map(item => item.successNumber),
                },
                {
                    type: 'line',
                    name: title==='number'?'失败数':'失败率',
                    data: data && data.map(item => item.errorNumber),
                },
                {
                    type: 'line',
                    name: title==='number'? '终止数':'终止率',
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
                className="mf-home-limited mf"
            >
                <div className='statistics-select'>
                    <BreadCrumb firstItem={'结果统计'}/>
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
                        <div className='statistics-title'>结果数量统计</div>
                        <Spin spinning={numberSpinning}>
                            <div ref={numberRef} style={{ height:360 }} />
                        </Spin>
                    </div>
                    <div className='statistics-item'>
                        <div className='statistics-title'>结果概率统计</div>
                        <Spin spinning={rateSpinning}>
                            <div ref={rateRef} style={{ height: 360 }} />
                        </Spin>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Result;

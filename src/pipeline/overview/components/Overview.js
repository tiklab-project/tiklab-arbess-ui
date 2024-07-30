import React, {useEffect, useRef, useState} from "react";
import {Row, Col, Spin, Select} from "antd";
import {
    RightOutlined,
} from "@ant-design/icons";
import echarts from "../../../common/component/echarts/Echarts";
import statisticsStore from "../../statistics/common/StatisticsStore";
import overviewStore from "../store/OverviewStore";
import historyStore from "../../history/store/HistoryStore";
import DynamicList from "../../../common/component/list/DynamicList";
import ListEmpty from "../../../common/component/list/ListEmpty";
import {runStatusIcon} from "../../history/components/HistoryCommon";
import "./Overview.scss";
import GaugeChart from "../../../common/component/echarts/GaugeChart";
import SearchSelect from "../../../common/component/search/SearchSelect";


/**
 * 概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overview = props =>{

    const {match:{params}} = props

    const {findRecentDaysFormatted,findRunResultCount,findRunTimeSpan} = statisticsStore;
    const {findLogPageByTime} = overviewStore;
    const {findPipelineInstance} = historyStore;

    const chartRefs = {
        releaseTrend: useRef(null),
    }

    //加载状态
    const [spinning,setSpinning] = useState({
        logPage:false,
        pipelineInstance:false,
        runResult:false,
        releaseTrend:false,
    })
    //流水线动态
    const [dynamicList,setDynamicList] = useState([]);
    //最近发布
    const [instanceList,setInstanceList] = useState([]);
    //最近运行统计
    const [runResult,setRunResult] = useState(null);
    //日期
    const [date,setDate] = useState(null);
    //运行统计请求参数
    const [runParams,setRunParams] = useState(0);

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

    useEffect(()=>{
        //流水动态
        findLogPage('logPage');
        //最近发布
        findInstance('pipelineInstance')
        //获取近十天的日期
        findRecentDaysFormatted().then(res=>{
            if(res.code===0){
                setDate(res.data);
            }
        })
    },[])

    useEffect(() => {
        //最近运行统计
        findRunResult('runResult');
        //发布总次数
        findRunTime('releaseTrend');
    }, [runParams]);

    /**
     * 流水动态
     */
    const findLogPage = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findLogPageByTime({data:{pipelineId:[params.id]},pageParam:{pageSize:10,currentPage:1}}).then(res=>{
            if(res.code===0){
                setDynamicList(res.data?.dataList || [])
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 最近发布
     * @param chartKey
     */
    const findInstance = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineInstance({pipelineId:params.id,pageParam:{pageSize:4,currentPage:1}}).then(res=>{
            if(res.code===0){
                setInstanceList(res.data?.dataList || [])
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 最近运行统计
     * @param chartKey
     */
    const findRunResult = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findRunResultCount({pipelineId:params.id,countDay:runParams}).then(res=> {
            if(res.code===0){
                setRunResult(res.data)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 发布总次数
     */
    const findRunTime = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findRunTimeSpan({pipelineId:params.id,countDay:runParams}).then(res=> {
            if(res.code===0){
                renderRunTimeSpanChart(res.data,chartKey)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    const renderRunTimeSpanChart = (data, chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            title: {
                text: '发布次数',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                },
            },
            tooltip: {trigger: 'axis'},
            legend: {data: ['全部', '成功', '失败']},
            color: ['#ffa500', '#0d66e4', '#f06f6f'],
            xAxis: {
                type: 'category',
                data: data && data.map(item=>item.time),
            },
            yAxis: [{type: 'value'}],
            series:  [
                {
                    name: '全部',
                    type: 'line',
                    data: data?.map(item => item.timeCount?.allNumber) || []
                },
                {
                    name: '成功',
                    type: 'line',
                    data: data?.map(item => item.timeCount?.successNumber) || []
                },
                {
                    name: '失败',
                    type: 'line',
                    data: data?.map(item => item.timeCount?.errNumber) || []
                }
            ]
        };

        chart.setOption(option);
    }

    return(
        <Row className="overview">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited">
                    <div className="overview-upper">
                        <div className='overview-guide-title'>
                            最近发布
                        </div>
                        <div className="overview-upper-content">
                            {
                                instanceList && instanceList.length > 0 ?
                                    <div className='overview-upper-instance'>
                                        {
                                            instanceList.map(item=>{
                                                const {instanceId,findNumber,runStatus,runTimeDate,user,user:{nickname,name}} = item;
                                                return (
                                                    <div
                                                        key={instanceId}
                                                        className='instance-item'
                                                        onClick={()=>props.history.push(`/pipeline/${params.id}/history/${instanceId}`)}
                                                    >
                                                        <div className='instance-item-up'>
                                                            <div className='instance-item-findNumber'># {findNumber}</div>
                                                        </div>
                                                        <div className='instance-item-center'>
                                                            <div className='instance-item-center-info'>
                                                                <div>状态</div>
                                                                <div className='instance-item-runStatus'>{runStatusIcon(runStatus)}</div>
                                                            </div>
                                                            <div className='instance-item-center-info'>
                                                                <div>耗时</div>
                                                                <div>{runTimeDate}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <ListEmpty title={'暂无发布'} />
                            }
                        </div>
                    </div>
                    <div className='overview-center'>
                        <div className='overview-guide'>
                            <div className='overview-guide-title'>
                                运行统计
                            </div>
                            <SearchSelect
                                value={runParams}
                                style={{width:120}}
                                onChange={value=>setRunParams(value)}
                            >
                                {
                                    date && date.map((value,index)=>(
                                        <Select.Option key={index} value={index}>{value}</Select.Option>
                                    ))
                                }
                            </SearchSelect>
                        </div>
                        <Spin spinning={spinning.runResult}>
                            <GaugeChart runResult={runResult}/>
                        </Spin>
                        <div className="overview-center-release">
                            <Spin spinning={spinning['releaseTrend']}>
                                <div ref={chartRefs['releaseTrend']} style={{ height: 360 }} />
                            </Spin>
                        </div>
                    </div>
                    <div className='overview-bottom'>
                        <div className='overview-guide'>
                            <div className='overview-guide-title'>
                                动态
                            </div>
                            <RightOutlined
                                className='overview-bottom-right'
                                onClick={()=>props.history.push(`/pipeline/${params.id}/dyna`)}
                            />
                        </div>
                        <div className='overview-bottom-box'>
                            <Spin spinning={spinning.logPage}>
                                <DynamicList dynamicList={dynamicList}/>
                            </Spin>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Overview

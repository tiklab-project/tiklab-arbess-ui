import React, {useEffect, useRef, useState} from "react";
import {Row, Col, Spin} from "antd";
import {
    BorderOuterOutlined,
    CalendarOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined,
    DashboardOutlined,
    ExclamationCircleOutlined,
    FundProjectionScreenOutlined,
} from "@ant-design/icons";
import echarts from "../../../common/component/echarts/Echarts";
import ListIcon from "../../../common/component/list/ListIcon";
import Profile from "../../../common/component/profile/Profile";
import statisticsStore from "../../statistics/common/StatisticsStore";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import "./Overview.scss";

/**
 * 概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overview = props =>{

    const {match:{params}} = props

    const {
        findPipelineSurveyCount,findPipelineRunResultCount,findPipelineSurveyResultCount,
        findPipelineLogTypeCount,findPipelineLogUserCount
    } = statisticsStore;

    const chartRefs = {
        survey: useRef(null),
        surveyResult: useRef(null),
        rateTrend: useRef(null),
        logTypeTrend:useRef(null),
        logUserTrend:useRef(null),
    }

    //流水线概况
    const [pipelineSurveyCount,setPipelineSurveyCount] = useState(null);
    //加载状态
    const [spinning,setSpinning] = useState({
        survey:false,
        surveyResult:false,
        rateTrend:false,
        logTypeTrend:false,
        logUserTrend:false,
    })

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
        fetchSurveyCount()
    },[])

    const fetchSurveyCount = () => {
        findPipelineSurvey('survey');
        fetchTrendStatistics('rate','rateTrend');
        findPipelineSurveyResult('surveyResult');
        findPipelineLogType('logTypeTrend');
        findPipelineLogUser('logUserTrend');
    }

    /**
     * 流水线概况统计
     */
    const findPipelineSurvey = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineSurveyCount(params.id).then(res=>{
            if(res.code===0){
                setPipelineSurveyCount(res.data)
                renderSurveyChart(res.data,chartKey)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 最近运行概率统计
     */
    const fetchTrendStatistics = (type, chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineRunResultCount({pipelineId:params.id, countDay:30,type}).then(res=>{
            if(res.code===0){
                renderTrendChart(res.data, chartKey);
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 最近运行结果统计
     */
    const findPipelineSurveyResult = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineSurveyResultCount(params.id).then(res=>{
            if(res.code===0){
                renderSurveyResultChart(res.data,chartKey)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 动态类型
     */
    const findPipelineLogType = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineLogTypeCount(params.id).then(res=>{
            if(res.code===0){
                renderLogTypeChart(res.data,chartKey)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }

    /**
     * 动态用户操作
     */
    const findPipelineLogUser = (chartKey) => {
        setSpinning(pev=>({...pev, [chartKey]: true}));
        findPipelineLogUserCount(params.id).then(res=>{
            if(res.code===0){
                renderLogUserChart(res.data,chartKey)
            }
            setSpinning(pev=>({...pev, [chartKey]: false}));
        })
    }


    /**
     * 饼图(概况统计)
     * @param data
     * @param chartKey
     */
    const renderSurveyChart = (data,chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            tooltip: {formatter: "{b}: {c} ({d}%)"},
            label: {formatter: '{b}: {@2012} ({d}%)'},
            legend: {
                orient: 'vertical',
                right: 15,
                data: ["成功", "失败", "终止"],
            },
            color:["#77b3eb","#f06f6f","#f6c659"],
            type: "pie",
            series: [{
                type: "pie",
                data: [
                    { value: data && data.successNumber, name: "成功" },
                    { value: data && data.errorNumber, name: "失败" },
                    { value: data && data.haltNumber, name: "终止" },
                ],
            }]
        }
        chart && chart.setOption(option);
    }

    /**
     * 折线图(最近运行概率统计)
     * @param data
     * @param chartKey
     */
    const renderTrendChart = (data,chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    let tooltipText = params[0].name;
                    params.forEach((item) => {
                        tooltipText += `<br/>${item.seriesName}: ${item.value}%`;
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
                    formatter: `{value}%`
                }
            },
            legend:{show:false},
            series: [
                {
                    type: 'line',
                    name: '成功率',
                    data: data && data.map(item => item.successNumber),
                },
                {
                    type: 'line',
                    name: '失败率',
                    data: data && data.map(item => item.errorNumber),
                },
                {
                    type: 'line',
                    name: '终止率',
                    data: data && data.map(item => item.haltNumber),
                }
            ]
        }
        chart && chart.setOption(option);
    }

    /**
     * 柱状图(最近运行结果统计)
     * @param data
     * @param chartKey
     */
    const renderSurveyResultChart = (data,chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: ['成功数', '失败数', '终止数'],
            },
            yAxis: {type: 'value',},
            series: [
                {
                    data: [
                        { value: data.successNumber || 0, itemStyle: { color: '#77b3eb' } },
                        { value: data.errorNumber || 0, itemStyle: { color: '#f06f6f' } },
                        { value: data.haltNumber || 0, itemStyle: { color: '#f6c23e' } }
                    ],
                    type: 'bar'
                }
            ]
        }
        chart && chart.setOption(option);
    }

    /**
     * 柱状图(动态类型)
     * @param data
     * @param chartKey
     */
    const renderLogTypeChart = (data,chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        const option = {
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: data.map(item=>item?.loggingType?.name),
            },
            yAxis: {type: 'value',},
            series: [
                {
                    data: data.map(item => item?.typeNumber || 0),
                    type: 'bar',
                }
            ]
        }
        chart && chart.setOption(option);
    }

    /**
     * 折线图(用户操作)
     * @param data
     * @param chartKey
     */
    const renderLogUserChart = (data,chartKey) => {
        const chartDom = chartRefs[chartKey].current;
        if(!chartDom){return;}
        let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
        // 初始化 x 轴数据和 series 数据
        const xAxisData = data.map(item=>item?.loggingType.id);
        const seriesData = data.map(item => {
            const userCountList = item.userCountList;
            return userCountList.map(dl => ({
                id: dl.user.id,
                name: dl.user?.nickname || dl.user.name,
                value: dl.typeNumber,
            }));
        }).flat();
        const uniqueSeriesData =  seriesData.reduce((acc, dl) => {
            // 检查当前 dl 是否已经存在于 acc 中，如果不存在则添加到 acc 中
            if (!acc.some(item => item.id === dl.id)) {
                acc.push({
                    id: dl.id,
                    name: dl.name,
                    type: 'line',
                    data: xAxisData.map(id => {
                        const loggingType = data.find(item => item?.loggingType.id === id);
                        const loggingTypeUser = loggingType.userCountList.find(d => d.user.id === dl.id);
                        return loggingTypeUser ? loggingTypeUser.typeNumber : 0;
                    })
                });
            }
            return acc;
        }, [])
        const option = {
            tooltip: {trigger: 'axis'},
            xAxis: {
                type: 'category',
                data: data.map(item=>item?.loggingType.name),
            },
            yAxis: {type: 'value',},
            series: uniqueSeriesData
        }
        chart && chart.setOption(option);
    }


    return(
        <Row className="overview">
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "18", offset: "3" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div className="mf-home-limited">
                    <div className="overview-upper">
                        <div className="upper-pipeline-box">
                            <Spin spinning={spinning.survey}>
                                <div className='upper-pipeline-info'>
                                    <ListIcon
                                        colors={pipelineSurveyCount?.pipeline?.color}
                                        text={pipelineSurveyCount?.pipeline?.name}
                                    />
                                    <div className='overview-title'>
                                        {pipelineSurveyCount?.pipeline?.name}
                                    </div>
                                </div>
                                <div className='upper-pipeline-user'>
                                    <Profile
                                        userInfo={pipelineSurveyCount?.user}
                                    />
                                    <div className='pipeline-user-name'>
                                        <div>{pipelineSurveyCount?.user.nickname || pipelineSurveyCount?.user.name}</div>
                                        <div className='pipeline-user-name-desc'>负责人</div>
                                    </div>
                                </div>
                                <div className='upper-pipeline-status'>
                                    <div className="pipeline-status-item">
                                        <div className='pipeline-status-item-icon'>
                                            <BorderOuterOutlined className='pipeline-status-item-num'/>
                                        </div>
                                        <div>
                                            <div>{pipelineSurveyCount?.allInstanceNumber || '0'}</div>
                                            <div className='pipeline-status-item-text'>全部</div>
                                        </div>
                                    </div>
                                    <div className="pipeline-status-item">
                                        <div className='pipeline-status-item-icon'>
                                            <CheckSquareOutlined className='pipeline-status-item-success'/>
                                        </div>
                                        <div className='pipeline-status-item-icon'>
                                            <div>{pipelineSurveyCount?.successNumber || '0'}</div>
                                            <div className='pipeline-status-item-text'>成功</div>
                                        </div>
                                    </div>
                                    <div className="pipeline-status-item">
                                        <div className='pipeline-status-item-icon'>
                                            <CloseSquareOutlined className='pipeline-status-item-error'/>
                                        </div>
                                        <div>
                                            <div>{pipelineSurveyCount?.errorNumber || '0'}</div>
                                            <div className='pipeline-status-item-text'>失败</div>
                                        </div>
                                    </div>
                                    <div className="pipeline-status-item">
                                        <div className='pipeline-status-item-icon'>
                                            <ExclamationCircleOutlined className='pipeline-status-item-halt'/>
                                        </div>
                                        <div>
                                            <div>{pipelineSurveyCount?.haltNumber || '0'}</div>
                                            <div className='pipeline-status-item-text'>终止</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='upper-pipeline-state'>
                                    <div className='pipeline-state-icon'>
                                        <FundProjectionScreenOutlined />
                                    </div>
                                    <div>
                                        <div>
                                            {pipelineSurveyCount?.pipeline?.state === '1' ? '运行中' : '未运行'}
                                        </div>
                                        <div className='pipeline-state-desc'>
                                            状态
                                        </div>
                                    </div>
                                </div>
                                <div className='upper-pipeline-state'>
                                    <div className='pipeline-state-icon'>
                                        <DashboardOutlined />
                                    </div>
                                    <div>
                                        <div>
                                            {pipelineSurveyCount?.runTime || '无'}
                                        </div>
                                        <div className='pipeline-state-desc'>
                                            上次运行时长
                                        </div>
                                    </div>
                                </div>
                                <div className='upper-pipeline-state'>
                                    <div className='pipeline-state-icon'>
                                        <CalendarOutlined />
                                    </div>
                                    <div>
                                        <div>
                                            {pipelineSurveyCount?.recentlyRunTime || '无'}
                                        </div>
                                        <div className='pipeline-state-desc'>
                                            上次运行时间
                                        </div>
                                    </div>
                                </div>
                            </Spin>
                        </div>
                        <div className='upper-echarts-box'>
                            <div className='echarts-result-title overview-title'>
                                运行概率统计
                            </div>
                            <Spin spinning={spinning.survey}>
                                <div ref={chartRefs['survey']} style={{ height: 300 }} />
                            </Spin>
                        </div>
                    </div>
                    <div className='overview-center'>
                        <BreadCrumb firstItem={'最近运行统计'}/>
                        <div className='overview-center-box'>
                            {['surveyResult', 'rateTrend'].map((key) => (
                                <div className='center-echarts-box' key={key}>
                                    <div className='echarts-result-title overview-title'>
                                        {key === 'surveyResult' && '最近运行结果统计'}
                                        {key === 'rateTrend' && '最近运行概率统计'}
                                    </div>
                                    <Spin spinning={spinning[key]}>
                                        <div ref={chartRefs[key]} style={{ height: 400 }} />
                                    </Spin>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='overview-bottom'>
                        <BreadCrumb firstItem={'动态统计'}/>
                        <div className='overview-bottom-box'>
                            {['logTypeTrend', 'logUserTrend'].map((key) => (
                                <div className='bottom-echarts-box' key={key}>
                                    <div className='echarts-result-title overview-title'>
                                        {key === 'logTypeTrend' && '动态类型统计'}
                                        {key === 'logUserTrend' && '动态人员统计'}
                                    </div>
                                    <Spin spinning={spinning[key]}>
                                        <div ref={chartRefs[key]} style={{ height: 400 }} />
                                    </Spin>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Overview

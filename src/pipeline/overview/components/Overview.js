import React,{useEffect,useState} from "react";
import {Row,Col} from "antd";
import {
    AimOutlined,
    BorderOuterOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    CloseSquareOutlined,
    ExclamationCircleOutlined,
    PieChartOutlined,
    RightOutlined
} from "@ant-design/icons";
import DynamicList from "../../../common/component/list/DynamicList";
import BreadCrumb from "../../../common/component/breadcrumb/BreadCrumb";
import echarts from "../../../common/component/echarts/Echarts";
import overviewStore from "../store/OverviewStore";
import "./Overview.scss";

/**
 * 概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overview = props =>{

    const {match:{params}} = props

    const {pipelineCensus,findlogpage} = overviewStore

    // 运行概况
    const [census,setCensus] = useState(null)

    // 动态
    const [dynaData,setDynaData] = useState({});

    useEffect(()=>{
        // 运行概况
        pipelineCensus(params.id).then(res=>{
            const data = res.data
            if(res.code===0){
                setCensus(data)
                renderEchart(data)
            }
        })
        // 流水线动态
        findlogpage({
            data:{pipelineId:[params.id]},
            pageParam:{
                pageSize:10,
                currentPage:1
            }
        }).then(res=>{
            if(res.code===0){
                setDynaData({
                    dynamicList: res.data.dataList || [],
                })
            }
        })
    },[])

    /**
     * 渲染图表
     * @param data：图标所需数据
     */
    const renderEchart = data =>{
        const chartDom=document.getElementById("burn-down")
        // 获取实例
        let myChart=chartDom && echarts.getInstanceByDom(chartDom)

        if (!myChart) // 如果不存在则创建
        {
            myChart=chartDom && echarts.init(chartDom)
        }
        const option={
            tooltip: {
                formatter: "{b}: {c} ({d}%)"
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
        myChart && myChart.setOption(option)
    }

    const status = [
        {
            title:"成功",
            num:<span className="census-successNumber">{census?.successNumber || 0} 次</span>,
            icon:<CheckSquareOutlined className="census-successNumber"/>,
        },
        {
            title:"终止",
            num: <span className="census-removeNumber">{census?.haltNumber || 0} 次</span>,
            icon:<ExclamationCircleOutlined className="census-removeNumber"/>,
        },
        {
            title:"失败",
            num:<span className="census-errorNumber">{census?.errorNumber || 0} 次</span>,
            icon:<CloseSquareOutlined className="census-errorNumber"/>,
        },
        {
            title:"执行次数",
            num:<span className="census-number">{census?.allNumber || 0} 次</span>,
            icon:<BorderOuterOutlined className="census-number"/>,
        },
        {
            title:"平均执行时长",
            num:<span className="census-time">{census?.time || '--'}</span>,
            icon:<ClockCircleOutlined className="census-time"/>
        },
    ]

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
                    <div className="overview-top">
                        <BreadCrumb firstItem={"概况"}/>
                    </div>
                    <div className="overview-bottom">
                        <div className="overview-census">
                            <div className='overview-guide'>
                                <div className='overview-guide-title'>
                                    <PieChartOutlined className='overview-guide-title-icon'/>
                                    <span className='overview-guide-title-name'>运行概况</span>
                                </div>
                            </div>
                            <div className="overview-census-bottom">
                                <div className="chart-box" id="burn-down" style={{width:400,height:300}}/>
                                <div className="overview-census-stat">
                                    {
                                        status.map(item=>{
                                            return(
                                                <div className="stat-div" key={item.title}>
                                                    <div className="stat-div-title">
                                                        <span className="stat-div-title-icon">{item.icon}</span>
                                                        <span className="stat-div-title-name">{item.title}</span>
                                                    </div>
                                                    <div className="census-num">{item.num} </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="overview-dyna">
                            <div className='overview-guide'>
                                <div className='overview-guide-title'>
                                    <AimOutlined className='overview-guide-title-icon'/>
                                    <span className='overview-guide-title-name'>最新动态</span>
                                </div>
                                <div onClick={()=>props.history.push(`/pipeline/${params.id}/dyna`)}
                                     className="overview-guide-skip"
                                >
                                    <RightOutlined />
                                </div>
                            </div>
                            <DynamicList dynamicList={dynaData?.dynamicList || []}/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Overview

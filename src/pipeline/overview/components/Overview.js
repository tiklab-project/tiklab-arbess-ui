import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import {AimOutlined, PieChartOutlined, RightOutlined} from "@ant-design/icons";
import DynamicList from "../../../common/component/list/DynamicList";
import Breadcrumb from "../../../common/component/breadcrumb/Breadcrumb";
import echarts from "../../../common/component/echarts/Echarts";
import OverviewCensus from "./OverviewCensus";
import overviewStore from "../store/OverviewStore";
import "./Overview.scss";

/**
 * 概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overview = props =>{

    const {pipelineStore} = props

    const {pipelineCensus,census,findlogpage,dynamicList,dynaPage} = overviewStore
    const {pipeline} = pipelineStore

    useEffect(()=>{
        // 运行概况
        pipelineCensus(pipeline.id).then(res=>{
            const data = res.data
            if(res.code===0){
                renderEchart(data)
            }
        })
        // 流水线动态
        findlogpage({
            content:{pipelineId:[pipeline.id]},
            bgroup:"matflow",
            pageParam:{
                pageSize:10,
                currentPage:1
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
                    { value: data && data.removeNumber, name: "其他" },
                ],
            }]
        }
        myChart && myChart.setOption(option)

    }

    return(
        <div className="overview">
            <div className="overview-content">
                <div className="overview-top">
                    <Breadcrumb firstItem={"概况"}/>
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
                            <OverviewCensus census={census}/>
                        </div>
                    </div>
                    <div className="overview-dyna">
                        <div className='overview-guide'>
                            <div className='overview-guide-title'>
                                <AimOutlined className='overview-guide-title-icon'/>
                                <span className='overview-guide-title-name'>流水线动态</span>
                            </div>
                            {
                                dynaPage?.totalPage > 1 &&
                                <div onClick={()=>props.history.push(`/index/pipeline/${pipeline.id}/survey/dyna`)}
                                     className="overview-guide-skip"
                                >
                                    <RightOutlined />
                                </div>
                            }
                        </div>
                        <DynamicList dynamicList={dynamicList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("pipelineStore")(observer(Overview))

import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {AimOutlined, PieChartOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/Breadcrumb";
import echarts from "../../../common/echarts/Echarts";
import OverviewCensus from "./OverviewCensus";
import Guide from "../../../common/guide/Guide";
import DynamicList from "../../../common/dynamic/DynamicList";
import "./Overview.scss";

/**
 * 概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overview = props =>{

    const {OverviewStore,pipelineStore,homePageStore} = props

    const {findlogpage,dynamicList} = homePageStore
    const {pipelineCensus,census} = OverviewStore
    const {pipeline} = pipelineStore

    useEffect(()=>{
        if(pipeline){
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
                pageParam:{
                    pageSize:10,
                    currentPage:1
                }
            })
        }
    },[pipeline])

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
            <div className="overview-content mf-home-limited">
                <div className="overview-top">
                    <BreadcrumbContent firstItem={"概况"}/>
                </div>
                <div className="overview-content">
                    <div className="overview-census">
                        <Guide icon={<PieChartOutlined />} title={"运行概况"}/>
                        <div className="overview-census-bottom">
                            <div className="chart-box" id="burn-down" style={{width:400,height:300}}/>
                            <OverviewCensus census={census}/>
                        </div>
                    </div>
                    <div className="overview-dyna">
                        <Guide title={"流水线动态"} icon={<AimOutlined/>} type={"dynamic"} pipelineId={pipeline && pipeline.id}/>
                        <DynamicList dynamicList={dynamicList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("OverviewStore","pipelineStore","homePageStore")(observer(Overview))

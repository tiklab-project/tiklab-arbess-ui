import React,{useState,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {AimOutlined, PieChartOutlined} from "@ant-design/icons";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import echarts from "../../../common/echarts/echarts";
import SurverCensus from "../components/surveyCensus";
import Guide from "../../../common/guide/guide";
import DynaList from "../../../dyna/common/dynaList";
import "../components/survey.scss";

const Survey = props =>{

    const {surveyStore,pipelineStore,homePageStore} = props

    const {findlogpage,dynamicList} = homePageStore
    const {pipelineCensus,census} = surveyStore
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
        <div className="survey">
            <div className="survey-content mf-home-limited">
                <div className="survey-top">
                    <BreadcrumbContent firstItem={"概况"}/>
                </div>
                <div className="survey-content">
                    <div className="survey-census">
                        <Guide icon={<PieChartOutlined />} title={"运行概况"}/>
                        <div className="survey-census-bottom">
                            <div className="chart-box" id="burn-down" style={{width:400,height:300}}/>
                            <SurverCensus census={census}/>
                        </div>
                    </div>
                    <div className="survey-dyna">
                        <Guide title={"流水线动态"} icon={<AimOutlined/>} type={"dynamic"} pipelineId={pipeline && pipeline.id}/>
                        <DynaList dynamicList={dynamicList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inject("surveyStore","pipelineStore","homePageStore")(observer(Survey))

import React,{useState,useEffect} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {AimOutlined, PieChartOutlined} from "@ant-design/icons";
import "../components/survey.scss";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import echarts from "../../../common/echarts/echarts";
import SurverCensus from "../components/surveyCensus";
import Guide from "../../../common/guide/guide";
import DynaList from "../../../dyna/common/dynaList";


const Survey = props =>{

    const {surveyStore,pipelineStore,homePageStore} = props

    const {findlogpage,dynamicList} = homePageStore
    const {pipelineCensus} = surveyStore
    const {pipelineId,pipeline} = pipelineStore

    const [census,setCensus] = useState("")

    //运行概况
    useEffect(()=>{
        pipelineId && pipelineCensus(pipelineId).then(res=>{
            const data = res.data
            if(res.code===0){
                setCensus(data)
                renderEchart(data)
            }
        })
    },[pipelineId])

    // 流水线动态
    useEffect(()=>{
        const params = {
            content:{pipelineId:[pipelineId]},
            pageParam:{
                pageSize:10,
                currentPage:1
            }
        }
        findlogpage(params)
    },[pipelineId])

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
            <div className="survey-content home-limited">
                <div className="survey-top">
                    <BreadcrumbContent firstItem={pipeline.name} secondItem={"概况"}/>
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
                        <Guide title={"流水线动态"} icon={<AimOutlined/>} type={"dynamic"} pipelineId={pipelineId}/>
                        <DynaList dynamicList={dynamicList} pipelineId={[pipelineId]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("surveyStore","pipelineStore","homePageStore")(observer(Survey)))
import React,{useState,useEffect} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/survey.scss";
import Dyna from "../../../common/dyna/dynaList";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import echarts from "../../../common/echarts/echarts";
import SurverCensus from "../components/surveyCensus";
import Guide from "../../../common/guide/guide";
import {PieChartOutlined} from "@ant-design/icons";


const Survey = props =>{

    const {surveyStore,pipelineStore,homePageStore} = props

    const {findlogpage,dynaPageTotal,dynamicList,setDynamicList} = homePageStore
    const {pipelineCensus} = surveyStore
    const {pipelineId,pipeline} = pipelineStore

    const [dynaPagination,setDynaPagination] = useState(1)
    const [census,setCensus] = useState("")
    const [isDyna,setIsDyna] = useState(false)

    useEffect(()=>{
        setDynamicList([])
    },[pipelineId])

    //运行概况
    let myChart
    useEffect(()=>{
        if(pipelineId){
            pipelineCensus(pipelineId).then(res=>{
                const data = res.data
                if(res.code===0){
                    setCensus(data)
                    renderEchart(data)
                }
            })
        }
        return () => {
            // myChart.dispose() 销毁实例。实例销毁后无法再被使用
            myChart.dispose()
        }
    },[pipelineId])

    // 流水线动态
    useEffect(()=>{
        const params = {
            content:pipelineId,
            pageParam:{
                currentPage:dynaPagination
            }
        }
        findlogpage(params).then(res=>{
            res.code===0 && dynaPagination > 1 && setIsDyna(false)
        })
    },[pipelineId,dynaPagination])

    const renderEchart = data =>{
        const chartDom=document.getElementById("burn-down")
        // 获取实例
        myChart=chartDom && echarts.getInstanceByDom(chartDom)

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

    const moreDynamic = () =>{
        setIsDyna(true)
        setDynaPagination(dynaPagination+1)
    }

    return(
        <div className="survey">
            <div className="survey-content home-limited mf">
                <div className="survey-top">
                    <BreadcrumbContent
                        firstItem={pipeline.pipelineName}
                        secondItem={"概况"}
                    />
                </div>
                <div className="survey-content">
                    <div className="survey-census survey-div">
                        <Guide
                            icon={<PieChartOutlined />}
                            title={"运行概况"}
                        />
                        <div className="survey-census-bottom">
                            <div className="chart-box" id="burn-down"
                                 style={{width:400,height:300}}
                            />
                            <SurverCensus
                                census={census}
                            />
                        </div>
                    </div>
                    <Dyna
                        dynamicList={dynamicList}
                        moreDynamic={moreDynamic}
                        isDyna={isDyna}
                        dynaPageTotal={dynaPageTotal}
                        dynaPagination={dynaPagination}
                        guideTitle={"流水线动态"}
                        pipelineId={pipelineId}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("surveyStore","pipelineStore","homePageStore")(observer(Survey)))
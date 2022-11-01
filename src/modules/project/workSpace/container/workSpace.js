import React,{useState,useEffect} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/workSpace.scss";
import WorkSpaceDyna from "../components/workSpaceDyna";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import echarts from "../../../../common/echarts/echarts";
import WorkSpaceCensus from "../components/workSpaceCensus";
import WorkLine from "../components/workLine";
import {PieChartOutlined} from "@ant-design/icons";

const WorkSpace = props =>{

    const {workSpaceStore,pipelineStore,homePageStore} = props

    const {findlogpage,dynaPageTotal} = homePageStore
    const {pipelineCensus} = workSpaceStore
    const {pipelineId,pipeline} = pipelineStore

    const [isDyna,setIsDyna] = useState(false)
    const [dynamicList,setDynamicList] = useState([])
    const [dynaPagination,setDynaPagination] = useState(1)
    const [census,setCensus] = useState("")

    //运行概况
    useEffect(()=>{
        if(pipelineId){
            pipelineCensus(pipelineId).then(res=>{
                const data = res.data
                if(res.code===0){
                    setCensus(data)
                    const myChart = echarts.init(document.getElementById("burn-down"))
                    myChart && myChart.setOption({
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
                    })
                }
            })
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
            if(res.code===0){
                setDynamicList(dynamicList.concat(res.data.dataList))
                dynaPagination > 1 && setIsDyna(false)
            }
        })
    },[pipelineId,dynaPagination])

    const moreDynamic = () =>{
        setIsDyna(true)
        setDynaPagination(dynaPagination+1)
    }

    return(
        <div className="workSpace">
            <div className="workSpace-top workSpace-top-limited">
                <BreadcrumbContent
                    firstItem={pipeline.pipelineName}
                    secondItem={"概况"}
                />
            </div>
            <div className="workSpace-content">
                <div className="workSpace-census workSpace-div">
                    <WorkLine
                        icon={<PieChartOutlined />}
                        title={"运行概况"}
                    />
                    <div className="workSpace-census-bottom">
                        <div className="chart-box" id="burn-down"
                             style={{width:400,height:300}}
                        />
                        <WorkSpaceCensus
                            census={census}
                        />
                    </div>
                </div>
                <WorkSpaceDyna
                    dynamicList={dynamicList}
                    moreDynamic={moreDynamic}
                    isDyna={isDyna}
                    dynaPageTotal={dynaPageTotal}
                    dynaPagination={dynaPagination}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("workSpaceStore","pipelineStore","homePageStore")(observer(WorkSpace)))
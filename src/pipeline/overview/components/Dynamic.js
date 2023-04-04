import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import DynamicDetail from "../../../home/components/DynamicDetail";

/**
 * 单个流水线动态
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineDyna = props =>{

    const {pipelineStore,homePageStore} = props

    const {pipeline} = pipelineStore
    const {findlogpage,dynamicList,dynaPage} = homePageStore

    // 获取近期动态请求数据
    const [params,setParams] = useState({
        pageParam:{
            pageSize:15,
            currentPage:1
        },
        bgroup:"matflow",
    })

    useEffect(()=>{
        // 初始化流水线动态
        pipeline && findlogpage({
            content:{pipelineId:[pipeline.id]},
            ...params
        })
    },[pipeline,params])

    /**
     * 去流水线概况页
     * @returns {*}
     */
    const goBack = () => props.history.push(`/index/pipeline/${pipeline.id}/survey`)

    return  <DynamicDetail
                firstItem={"流水线动态详情"}
                goBack={goBack}
                params={params}
                setParams={setParams}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
            />
}

export default inject("pipelineStore","homePageStore")(observer(PipelineDyna))

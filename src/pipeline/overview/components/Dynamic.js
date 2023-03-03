import React,{useEffect} from "react";
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

    useEffect(()=>{
        const params = {
            content:{pipelineId:[pipeline.id]},
            pageParam:{
                pageSize:15,
                currentPage:1
            },
            bgroup:"matflow",
        }
        // 初始化流水线动态
        pipeline && findlogpage(params)
    },[pipeline])

    /**
     * 去流水线概况页
     * @returns {*}
     */
    const goBack = () => props.history.push(`/index/pipeline/${pipeline.id}/survey`)

    return  <DynamicDetail
                firstItem={"流水线动态详情"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={[pipeline.id]}
            />
}

export default inject("pipelineStore","homePageStore")(observer(PipelineDyna))

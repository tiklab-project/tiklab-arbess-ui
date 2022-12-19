import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import DynaDetail from "../../dyna/common/dynaDetail";

const PipelineDyna = props =>{

    const {pipelineStore,homePageStore} = props

    const {pipelineId,pipeline} = pipelineStore
    const {findlogpage,dynamicList,dynaPage} = homePageStore

    // 流水线动态
    useEffect(()=>{
        const params = {
            content:{pipelineId:[pipelineId]},
            pageParam:{
                pageSize:15,
                currentPage:1
            },
            bgroup:"matflow",
        }
        findlogpage(params)
    },[pipelineId])

    const goBack = () => props.history.push(`/index/task/${pipelineId}/survey`)

    return  <DynaDetail
                firstItem={pipeline.name}
                secondItem={"流水线动态详情"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={[pipelineId]}
            />
}

export default inject("pipelineStore","homePageStore")(observer(PipelineDyna))
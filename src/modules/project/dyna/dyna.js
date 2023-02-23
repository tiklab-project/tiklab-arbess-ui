import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import DynaDetail from "../../dyna/common/dynaDetail";

const PipelineDyna = props =>{

    const {pipelineStore,homePageStore} = props

    const {pipeline} = pipelineStore
    const {findlogpage,dynamicList,dynaPage} = homePageStore

    // 流水线动态
    useEffect(()=>{
        const params = {
            content:{pipelineId:[pipeline.id]},
            pageParam:{
                pageSize:15,
                currentPage:1
            },
            bgroup:"matflow",
        }
        pipeline && findlogpage(params)
    },[pipeline])

    const goBack = () => props.history.push(`/index/pipeline/${pipeline.id}/survey`)

    return  <DynaDetail
                firstItem={"流水线动态详情"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={[pipeline.id]}
            />
}

export default inject("pipelineStore","homePageStore")(observer(PipelineDyna))

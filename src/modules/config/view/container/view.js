import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import Gui from "../components/guiView/gui";
import Loading from "../../../common/loading/loading";

const View = props =>{

    const {configStore,pipelineStore} = props

    const {findAllTaskConfig,isFindConfig,isLoading} = configStore

    const {pipelineId} = pipelineStore

    // 表单初始化
    useEffect(()=>{
        pipelineId && findAllTaskConfig(pipelineId)
    },[pipelineId,isFindConfig])

    // 加载状态
    if(isLoading){
        return <Loading/>
    }

    return  <Gui
                {...props}
                configStore={configStore}
                pipelineStore={pipelineStore}
            />
}

export default observer(View)
import React,{useEffect,useState} from "react";
import {observer} from "mobx-react";
import Gui from "../components/guiView/gui";
import Loading from "../../../common/loading/loading";

const View = props =>{

    const {configStore,pipelineStore} = props

    const {findAllTaskConfig,isFindConfig} = configStore
    const {pipelineId} = pipelineStore

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        pipelineId && setIsLoading(true)
    },[pipelineId])

    // 表单初始化
    useEffect(()=>{
        pipelineId && findAllTaskConfig(pipelineId).then(res=>{
            setIsLoading(false)
        })
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
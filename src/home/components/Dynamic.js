import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import DynamicDetail from "./DynamicDetail";

/**
 * 动态详情页面
 * @param props
 * @returns
 * @constructor
 */
const Dynamic = props =>{

    const {homePageStore,pipelineStore} = props

    const {findlogpage,dynamicList,dynaPage} = homePageStore
    const {findUserPipeline,pipelineList} = pipelineStore

    // 获取近期动态请求数据
    const [params,setParams] = useState({
        pageParam:{
            pageSize:15,
            currentPage:1
        },
        bgroup:"matflow",
        content:{}
    })

    useEffect(()=>{
        // 获取所有流水线
        findUserPipeline()
    },[])

    useEffect(()=>{
        // 获取近期动态
        findlogpage(params)
    },[params])

    /**
     * 返回首页
     * @returns {*}
     */
    const goBack = () => props.history.push(`/index/home`)

    return <DynamicDetail
                firstItem={"动态"}
                goBack={goBack}
                dynaPage={dynaPage}
                params={params}
                setParams={setParams}
                dynamicList={dynamicList}
                pipelineList={pipelineList}
            />
}

export default inject("homePageStore","pipelineStore")(observer(Dynamic))

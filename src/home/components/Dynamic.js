import React,{useEffect} from "react";
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
    const {findAllPipelineStatus,pipelineList} = pipelineStore

    useEffect(()=>{
        // 获取所有流水线
        findAllPipelineStatus().then(res=>{
            if(res.code===0){
                const params = {
                    pageParam:{
                        pageSize:15,
                        currentPage:1
                    },
                    bgroup:"matflow",
                    content:{
                        pipelineId:setPipelineId(res.data)
                    }
                }
                // 获取近期动态
                findlogpage(params)
            }
        })
    },[])

    /**
     * 获取流水线所有id
     * @param data
     * @returns {*[流水线id]}
     */
    const setPipelineId = data =>{
        const newArr = []
        data && data.map(item => {
            newArr.push(item.id)
        })
        return newArr
    }

    /**
     * 返回首页
     * @returns {*}
     */
    const goBack = () => props.history.push(`/index/home`)

    return <DynamicDetail
                firstItem={"动态"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={setPipelineId(pipelineList)}
                pipelineList={pipelineList}
            />
}

export default inject("homePageStore","pipelineStore")(observer(Dynamic))

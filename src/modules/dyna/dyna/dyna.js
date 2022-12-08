import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import DynaDetail from "../common/dynaDetail";

const Dyna = props =>{

    const {homePageStore,pipelineStore} = props

    const {findlogpage,dynamicList,dynaPage} = homePageStore
    const {findAllPipelineStatus,pipelineList} = pipelineStore

    useEffect(()=>{
        findAllPipelineStatus().then(res=>{
            if(res.code===0){
                const params = {
                    pageParam:{
                        pageSize:15,
                        currentPage:1
                    },
                    bgroup:"matflow",
                    content:{
                        pipelineId:pipeline(res.data)
                    }
                }
                // 近期动态
                findlogpage(params)
            }
        })
    },[])

    const pipeline = data =>{
        const newArr = []
        data && data.map(item => {
            newArr.push(item.id)
        })
        return newArr
    }

    const goBack = () => props.history.push(`/index/home`)

    return <DynaDetail
                firstItem={"动态详情"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={pipeline(pipelineList)}
                pipelineList={pipelineList}
            />
}

export default inject("homePageStore","pipelineStore")(observer(Dyna))
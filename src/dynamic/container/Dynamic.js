import React,{useEffect} from "react";
import {inject,observer} from "mobx-react";
import DynamicDetail from "../components/DynamicDetail";

const Dynamic = props =>{

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

    return <DynamicDetail
                firstItem={"动态"}
                goBack={goBack}
                findlogpage={findlogpage}
                dynaPage={dynaPage}
                dynamicList={dynamicList}
                pipelineIdList={pipeline(pipelineList)}
                pipelineList={pipelineList}
            />
}

export default inject("homePageStore","pipelineStore")(observer(Dynamic))

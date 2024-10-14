import React,{useEffect} from "react";
import {inject,observer,Provider} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import pipelineStore from "../pipeline/store/PipelineStore";
import {renderRoutes} from "react-router-config";
import ListEmpty from "../../common/component/list/ListEmpty";

/**
 * 流水线左侧导航（二级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAside= (props)=>{

    const store = {
        pipelineStore
    }

    const {match,systemRoleStore,route}=props;

    const {findOnePipeline,updateOpen,pipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id;
    const userId = getUser().userId;

    useEffect(()=>{
        if(id){
            // 获取单个流水线信息
            findOnePipeline(id).then(res=>{
                if(res.data){
                    // 获取流水线权限
                    getInitProjectPermissions(userId,id,res.data?.power===1)
                    // 当前流水线打开
                    updateOpen(id).then()
                }
            })
        }
    },[id])


    return (
        <Provider {...store}>
            {
                pipeline ?
                renderRoutes(route.routes)
                :
                <div style={{paddingTop:50}}>
                    <ListEmpty />
                </div>
            }
        </Provider>
    )

}

export default inject("systemRoleStore")(observer(PipelineAside))


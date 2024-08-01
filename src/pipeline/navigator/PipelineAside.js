import React,{useEffect,useState} from "react";
import {inject,observer,Provider} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import {message} from "antd";
import pipelineStore from "../pipeline/store/PipelineStore";
import {renderRoutes} from "react-router-config";

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

    const {findOnePipeline,updateOpen} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id;
    const userId = getUser().userId;

    useEffect(()=>{
        if(id){
            // 获取单个流水线信息
            findOnePipeline(id).then(res=>{
                if(res.data===null || !res.data){
                    message.info("当前流水线不存在或没有权限！")
                    props.history.push('/pipeline')
                    return
                }
                // 获取流水线权限
                getInitProjectPermissions(userId,id,res.data?.power===1)
                // 当前流水线打开
                updateOpen(id).then()
            })
        }
    },[id])


    return (
        <Provider {...store}>
            {renderRoutes(route.routes)}
        </Provider>
    )

}

export default inject("systemRoleStore")(observer(PipelineAside))


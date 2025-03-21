/**
 * @Description: 流水线导航
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useEffect,useState} from "react";
import {inject,observer,Provider} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import pipelineStore from "../pipeline/store/PipelineStore";
import {renderRoutes} from "react-router-config";
import ListEmpty from "../../common/component/list/ListEmpty";
import ChangeRootUser from "../../common/component/user/changeRootUser";

const PipelineAside= (props)=>{

    const store = {
        pipelineStore
    }

    const {match,systemRoleStore,route}=props;

    const {findOnePipeline,updateOpen,pipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id;
    const userId = getUser().userId;

    //弹出框状态
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        if(id){
            findPipeline();
        }
    },[id])

    const findPipeline = () =>{
        // 获取单个流水线信息
        findOnePipeline(id).then(res=>{
            if(res.data){
                const data = res.data;
                if(data?.user?.status===0){
                    setVisible(true);
                    return;
                }
                // 获取流水线权限
                getInitProjectPermissions(userId,id,data?.power===1)
                // 当前流水线打开
                updateOpen(id).then()
            }
        })
    }

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
            <ChangeRootUser
                domainId={id}
                visible={visible}
                setVisible={setVisible}
                onRefresh={findPipeline}
            />
        </Provider>
    )

}

export default inject("systemRoleStore")(observer(PipelineAside))


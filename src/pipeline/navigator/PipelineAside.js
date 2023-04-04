import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {SYSTEM_ROLE_STORE} from "tiklab-user-ui/es/store";
import {ApartmentOutlined, ClockCircleOutlined, CreditCardOutlined} from "@ant-design/icons";
import {Loading,Aside} from "../../common";

/**
 * 流水线左侧导航（二级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAside= (props)=>{

    const {match,pipelineStore,systemRoleStore}=props

    const {findUserPipeline,setPipeline,findOnePipeline,pipelineList,pipeline,updateOpen} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const pipelineId = match.params.id
    const userId = getUser().userId
    const [isAside,setIsAside] = useState(true)

    useEffect(()=>{
        findUserPipeline()
        // 组件销毁清空流水线信息
        return setPipeline("")
    },[])

    useEffect(()=>{
        // 获取单个流水线信息
        findOnePipeline(pipelineId).then(res=>{
            if(res.data===null){
                props.history.push('/index/404')
            }else {
                setIsAside(false)
                // 获取流水线权限
                getInitProjectPermissions(userId,pipelineId,res.data && res.data.power===1)
            }
        })
        // 当前流水线打开
        updateOpen(pipelineId)
    },[pipelineId])

    // 左侧菜单（二级菜单）
    const firstRouters=[
        {
            to:`/index/pipeline/${pipelineId}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
            key:"2",
        },
        {
            to:`/index/pipeline/${pipelineId}/config`,
            title: "设计",
            icon: <CreditCardOutlined />,
            key:"3",
        },
        {
            to:`/index/pipeline/${pipelineId}/structure`,
            title: "历史",
            icon: <ClockCircleOutlined />,
            key:"4",
        },
    ]

    if(isAside){
        return <Loading/>
    }

    return  <Aside
                {...props}
                pipelineList={pipelineList}
                pipeline={pipeline}
                firstRouters={firstRouters}
            />

}

export default inject("pipelineStore",SYSTEM_ROLE_STORE)(observer(PipelineAside))



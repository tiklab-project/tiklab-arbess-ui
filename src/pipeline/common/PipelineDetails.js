import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {SYSTEM_ROLE_STORE} from "tiklab-privilege-ui/lib/store";
import {ApartmentOutlined, ClockCircleOutlined, CreditCardOutlined} from "@ant-design/icons";
import {Loading} from "../../common/loading/Loading";
import Aside from "../../common/aside/Aside";

const PipelineDetails= (props)=>{

    const {match,pipelineStore,systemRoleStore}=props

    const {findAllPipelineStatus,setPipeline,findOnePipeline,pipelineList,pipeline} = pipelineStore
    const {getInitProjectPermissions} = systemRoleStore

    const pipelineId = match.params.id
    const userId = getUser().userId
    const [isAside,setIsAside] = useState(true)

    useEffect(()=>{
        // 所有流水线
        findAllPipelineStatus()
        return ()=>setPipeline()
    },[])

    useEffect(()=>{
        // 所有流水线
        findOnePipeline(pipelineId).then(res=>{
            if(res.data===null){
                props.history.push('/index/404')
            }else {
                setIsAside(false)
                getInitProjectPermissions(userId,pipelineId,res.data.power===1)
            }
        })
    },[pipelineId])

    // 侧边第一栏导航
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
            to:`/index/pipeline/${pipelineId}/history`,
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

export default inject("pipelineStore",SYSTEM_ROLE_STORE)(observer(PipelineDetails))



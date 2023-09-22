import React,{useEffect,useState} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {ApartmentOutlined, ClockCircleOutlined, CreditCardOutlined,ExperimentOutlined} from "@ant-design/icons";
import {Loading} from "../../common/component/loading/Loading";
import Aside from "../../common/component/aside/Aside";
import {message} from "antd";

/**
 * 流水线左侧导航（二级导航）
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAside= (props)=>{

    const {match,pipelineStore,systemRoleStore}=props

    const {findOnePipeline,updateOpen,pipelineList,pipeline,setPipeline} = pipelineStore

    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id
    const userId = getUser().userId

    // 加载状态
    const [isAside,setIsAside] = useState(true)

    useEffect(()=>{
        // 组件销毁清空流水线信息
        return setPipeline("")
    },[])

    useEffect(()=>{
        if(id){
            // 获取单个流水线信息
            findOnePipeline(id).then(res=>{
                if(res.data===null){
                    message.info("当前流水线不存在")
                    props.history.push('/index/pipeline')
                    return
                }
                // 获取流水线权限
                getInitProjectPermissions(userId,id,res.data?.power===1)
                setIsAside(false)
            })
            // 当前流水线打开
            updateOpen(id)
        }
    },[id])

    // 左侧菜单（二级菜单）
    const firstRouters=[
        {
            id:`/index/pipeline/${id}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
            key:"2",
        },
        {
            id:`/index/pipeline/${id}/config`,
            title: "设计",
            icon: <CreditCardOutlined />,
            key:"3",
        },
        {
            id:`/index/pipeline/${id}/structure`,
            title: "历史",
            icon: <ClockCircleOutlined />,
            key:"4",
        },
        {
            id:`/index/pipeline/${id}/test`,
            title: "测试",
            icon: <ExperimentOutlined />,
            key:"5",
        },
    ]

    if(isAside) return <Loading/>

    return  <Aside
                {...props}
                pipeline={pipeline}
                pipelineList={pipelineList}
                firstRouters={firstRouters}
            />

}

export default inject("systemRoleStore","pipelineStore")(observer(PipelineAside))



import React,{useEffect,useState} from "react";
import {inject,observer,Provider} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import {message} from "antd";
import {
    ApartmentOutlined,
    ClockCircleOutlined,
    CreditCardOutlined,
    ExperimentOutlined,
    ScanOutlined
} from "@ant-design/icons";
import {Loading} from "../../common/component/loading/Loading";
import Aside from "../../common/component/aside/Aside";
import pipelineStore from "../pipeline/store/PipelineStore";

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

    const {match,systemRoleStore}=props

    const {findOnePipeline,updateOpen,findRecentlyPipeline,pipeline} = pipelineStore

    const {getInitProjectPermissions} = systemRoleStore

    const id = match.params.id
    const userId = getUser().userId

    // 加载状态
    const [isAside,setIsAside] = useState(true);

    const [recentlyPipeline,setRecentlyPipeline] = useState([])

    useEffect(()=>{
        if(id){
            // 获取单个流水线信息
            findOnePipeline(id).then(res=>{
                if(res.data===null || !res.data){
                    message.info("当前流水线不存在或没有权限！")
                    props.history.push('/pipeline')
                    return
                }
                setIsAside(false)
                // 获取流水线权限
                getInitProjectPermissions(userId,id,res.data?.power===1)
                // 当前流水线打开
                updateOpen(id).then()
                // 切换流水线
                findRecentlyPipeline(id).then(res=>{
                    if(res.code===0){
                        setRecentlyPipeline(res.data)
                    }
                })

            })
        }
    },[id])

    // 左侧菜单（二级菜单）
    const firstRouters=[
        {
            id:`/pipeline/${id}/survey`,
            title:"概况",
            icon:<ApartmentOutlined />,
            key:"survey",
        },
        {
            id:`/pipeline/${id}/config`,
            title: "设计",
            icon: <CreditCardOutlined />,
            key:"config",
        },
        {
            id:`/pipeline/${id}/history`,
            title: "历史",
            icon: <ClockCircleOutlined />,
            key:"history",
        },
        {
            id:`/pipeline/${id}/scan`,
            title: "代码扫描",
            icon: <ScanOutlined />,
            key:"scan",
        },
        {
            id:`/pipeline/${id}/test`,
            title: "测试报告",
            icon: <ExperimentOutlined />,
            key:"test",
        },
    ]

    if(isAside) return <Loading/>

    return (
        <Provider {...store}>
            <Aside
                {...props}
                pipeline={pipeline}
                firstRouters={firstRouters}
                recentlyPipeline={recentlyPipeline}
            />
        </Provider>
    )

}

export default inject("systemRoleStore")(observer(PipelineAside))



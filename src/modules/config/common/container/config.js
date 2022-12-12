import React,{useState} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import View from "../../view/container/view";
import Postpose from "../../postpose/container/postpose";
// import Postpose from "../../postpose/components/postpose";
import Trigger from "../../trigger/container/trigger";
import "./config.scss";

const Config = props =>{

    const {pipelineStore,configStore,structureStore} = props

    const {pipelineStartStructure} = structureStore
    const {validType,data} = configStore
    const {pipeline} = pipelineStore

    const [type,setType] = useState(3)
    const [process,setProcess] = useState(false) // 运行按钮
    
    const pipelineId = pipeline.id

    const run = () => {
        // 改变按钮
        setProcess(true)
        pipelineStartStructure(pipelineId).then(res=>{
            if(res.code===0){
                if(!res.data){
                    message.info("流水线正在运行")
                }
                props.history.push(`/index/task/${pipelineId}/structure`)
            }
        })
    }
 
    // 是否能运行
    const runStatu = () => !(data && data.length < 1 || validType && validType.length > 0)

    const typeLis = [
        {
            id:1,
            title:"流程设计"
        },
        {
            id:2,
            title:"触发器"
        },
        {
            id:3,
            title:"后置处理"
        },
    ]

    return(
        <div className="config mf">
            <div className="config-up">
                <div className="config-top">
                    <div className="config_bread">
                        <BreadcrumbContent firstItem={pipeline.name} secondItem={"配置"}/>
                    </div>
                    <div className="changeView-btn">
                        {
                            process ?
                                <Btn
                                    type={"primary"}
                                    title={<Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />}
                                />
                                :
                                <Btn
                                    type={runStatu() ? "primary" : "disabled" }
                                    onClick={runStatu() ? ()=>run() : null }
                                    icon={<CaretRightOutlined />}
                                    title={"运行"}
                                />

                        }
                    </div>
                </div>
                <div className="config-tabs">
                    {
                        typeLis.map(item=>{
                            return(
                                <div
                                    key={item.id}
                                    className={`config-tab ${type===item.id?"config-active":""}`}
                                    onClick={()=>setType(item.id)}
                                >
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                type === 1 &&
                <View
                    configStore={configStore}
                    pipelineStore={pipelineStore}
                />
            }
            {
                type===2 &&
                <Trigger/>
            }
            {
                type===3 &&
                <Postpose/>
            }
        </div>
    )
}

export default withRouter(inject("structureStore","configStore","pipelineStore")
                (observer(Config)))
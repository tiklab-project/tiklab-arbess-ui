import React,{useState} from "react";
import {
    CaretRightOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {getVersionInfo} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import View from "../../view/container/view";
import Postpose from "../../postpose/container/postpose";
import Trigger from "../../trigger/container/trigger";
import "./config.scss";

const Config = props =>{

    const {pipelineStore,configStore,structureStore} = props

    const {pipelineStartStructure} = structureStore
    const {validType,data,setOpt} = configStore
    const {pipeline} = pipelineStore

    const [processVisible,setProcessVisible] = useState(false)
    const [type,setType] = useState(1)
    const pipelineId = pipeline.id

    const run = () => {
        // 改变按钮
        setProcessVisible(true)
        pipelineStartStructure(pipelineId).then(res=>{
            if(res.code===0){
                if(!res.data){
                    message.info("流水线正在运行")
                }
                props.history.push(`/index/task/${pipelineId}/structure`)
            }
        })
    }

    const runStatu = () => !(data && data.length < 1 || validType && validType.length > 0)

    // 滚动--锚点
    const onScroll = () =>{
        const scrollTop=document.getElementById("config-content").scrollTop
        data && data.map((item,index)=>{
            const form = `formView_${index+1}`
            const iId = document.getElementById(form)
            const lastId = document.getElementById(form) && document.getElementById(form).previousSibling
            const iTop = iId && iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop>lastTop && scrollTop<iTop ){
                setOpt(index+1)
            }
        })
    }

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
        <div className="config mf" id="config-content" onScroll={onScroll}>
            <div className="config-up">
                <div className="config-top">
                    <div className="config_bread">
                        <BreadcrumbContent firstItem={pipeline.name} secondItem={"配置"}/>
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
                    <div className="config-valid">
                        {validType && validType.length > 0 ?
                            <span>
                                <ExclamationCircleOutlined style={{fontSize:16}}/> &nbsp;
                                <span className="config-valid-num">{validType && validType.length}项未配置</span>
                            </span> :
                            null}
                    </div>
                    <div className="changeView-btn">
                        {
                            processVisible ?
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
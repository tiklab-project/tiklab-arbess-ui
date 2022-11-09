import React,{useEffect,useState} from "react";
import "./configTop.scss";
import {
    AppstoreOutlined,
    BarsOutlined,
    CaretRightOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {message,Spin} from "antd";
import {getUser,getVersionInfo} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/btn/btn";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";


const ConfigTop = props =>{

    const {view,setView,pipelineId,pipelineName,configStore,structureStore,setAddConfigVisible} = props

    const {pipelineStartStructure} = structureStore
    const {validLength,isPlugin} = configStore

    const [processVisible,setProcessVisible] = useState(false)

    const configView = localStorage.getItem("configView")
    const userId = getUser().userId

    useEffect(()=>{
        if(configView){
            setView(configView)
        }
    },[configView])

    const run = () => {
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        // 改变按钮
        setProcessVisible(true)
        pipelineStartStructure(params).then(res=>{
            if(res.code===0){
                if(res.data===100){
                    // props.history.push(`/index/task/${pipelineId}/structure`)
                    message.error({content:"流水线正在运行", className:"message"})
                }
                props.history.push(`/index/task/${pipelineId}/structure`)
                // setTimeout(()=>props.history.push(`/index/task/${pipelineId}/structure`),1000)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    return(
        <div className="config-top">
            <div className="config-top-content">
                <BreadcrumbContent
                    firstItem={pipelineName}
                    secondItem={"配置"}
                />
                <div className="config_changeView">
                    <div className="changeView">
                        <div className="changeView-valid">
                            {validLength && validLength > 0 ?
                                <span>
                        <ExclamationCircleOutlined />
                                    &nbsp;
                                    {validLength}项配置未完成
                    </span> : null}
                        </div>
                        <div className="changeView-newStage">
                            <Btn
                                onClick={()=>setAddConfigVisible(true)}
                                icon={<PlusOutlined />}
                                title={"添加配置"}
                            />
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
                                        type={validLength>0?"disabled":"primary"}
                                        onClick={validLength>0?null:()=>run()}
                                        icon={<CaretRightOutlined />}
                                        title={"运行"}
                                    />

                            }
                        </div>
                        <div className="changeView-view">
                            <div className={`changeView-view-li ${view==="forms" ? "changeView-view-inner":""}`}
                                 onClick={()=>changeView("forms")}
                            >
                                <div className="changeView-view-item" >
                                    <BarsOutlined  />
                                    &nbsp;
                                    表单
                                </div>
                            </div>
                            {/*<div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":""}`}*/}
                            {/*     onClick={()=>changeView("gui")}*/}
                            {/*>*/}
                            {/*    <div className="changeView-view-item">*/}
                            {/*        <AppstoreOutlined/>*/}
                            {/*        &nbsp;*/}
                            {/*        图形*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {
                                !getVersionInfo().expired && isPlugin ?
                                    <div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":null}`}
                                         onClick={()=>changeView("gui")}
                                    >
                                        <div className="changeView-view-item">
                                            <AppstoreOutlined/>
                                            &nbsp;
                                            图形化
                                        </div>
                                    </div>
                                    :
                                    <div className="changeView-view-li changeView-view-ban">
                                        <AppstoreOutlined/>
                                        &nbsp;
                                        图形化
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("structureStore","configStore")(observer(ConfigTop)))
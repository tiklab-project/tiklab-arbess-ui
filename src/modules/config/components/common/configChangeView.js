import React,{useEffect,useState} from "react";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {getVersionInfo,getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "./configChangeView.scss";
import ChangeConfigSortsModal from "./changeConfigSortsModal";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineName,structureStore,configDataStore,configStore} = props

    const {pipelineStartStructure} = structureStore
    const {isPlugin,data,setData,codeType} = configDataStore
    const {updateConfigure} = configStore

    const [processVisible,setProcessVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)

    const configView = localStorage.getItem("configView")
    const userId = getUser().userId

    useEffect(()=>{
        if(configView){setView(configView)}
    },[configView])

    const run = () => {
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        // 改变按钮
        setProcessVisible(true)
        setTimeout(()=>props.history.push(`/index/task/${pipelineId}/structure`),1000)
        pipelineStartStructure(params).then(res=>{
            if(res.code===0 && res.data===1){
                if(res.data===1){
                // props.history.push(`/index/task/${pipelineName}/structure`)
                }else{
                    setProcessVisible(false)
                    message.error({content:"项目正在运行", className:"message"})
                }
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    const changeView = type => {
        setView(type)
        localStorage.setItem("configView",type)
    }

    return (
        <div className="config_changeView">
            <div className="changeView">
                <div className="changeView-changeSort">
                    <Button onClick={()=>setChangeSortVisible(true)}>
                        更改配置顺序
                    </Button>
                </div>
                <div className="changeView-btn">
                    <Button type="primary" onClick={()=>run()}>
                        {processVisible ? <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} /> :"运行"}
                    </Button>
                </div>
                <div className="changeView-view">
                    <div className={`changeView-view-li ${view==="forms" ? "changeView-view-inner":""}`}
                         onClick={()=>changeView("forms")}
                    >
                        <div className="changeView-view-item" >
                            表单视图
                        </div>
                    </div>
                    {/*<div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":""}`}*/}
                    {/*     onClick={()=>changeView("gui")}*/}
                    {/*>*/}
                    {/*    <div className="changeView-view-item">*/}
                    {/*        图形化视图*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {
                        !getVersionInfo().expired && isPlugin ?
                            <div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":""}`}
                                 onClick={()=>changeView("gui")}
                            >
                                <div className="changeView-view-item">
                                    图形化视图
                                </div>
                            </div>
                            :
                            <div className="changeView-view-li changeView-view-ban">
                                图形化视图
                            </div>
                    }
                </div>
            </div>

            <ChangeConfigSortsModal
                changeSortVisible={changeSortVisible}
                setChangeSortVisible={setChangeSortVisible}
                data={data}
                setData={setData}
                codeType={codeType}
                updateConfigure={updateConfigure}
                pipelineId={pipelineId}
            />

        </div>
    )
}

export default withRouter(inject("structureStore","configDataStore","configStore")(observer(ConfigChangeView)))
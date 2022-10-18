import React,{useEffect,useState} from "react";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {getVersionInfo,getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "./configChangeView.scss";
import NewStageAddModal from "../formView/newStageAddModal";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,structureStore,configDataStore,configStore} = props

    const {pipelineStartStructure} = structureStore
    const {isPlugin,data,setData,setBuildType,setDeployType} = configDataStore
    const {updateConfigure} = configStore

    const [processVisible,setProcessVisible] = useState(false)
    const [newStageVisible,setNewStageVisible] = useState(false)

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
                // props.history.push(`/index/task/${pipelineId}/structure`)
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
                <div className="changeView-newStage">
                    <Button onClick={()=>setNewStageVisible(true)}>
                        新阶段
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
                    <div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":""}`}
                         onClick={()=>changeView("gui")}
                    >
                        <div className="changeView-view-item">
                            图形化视图
                        </div>
                    </div>
                    {/*{*/}
                    {/*    !getVersionInfo().expired && isPlugin ?*/}
                    {/*        <div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":""}`}*/}
                    {/*             onClick={()=>changeView("gui")}*/}
                    {/*        >*/}
                    {/*            <div className="changeView-view-item">*/}
                    {/*                图形化视图*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        :*/}
                    {/*        <div className="changeView-view-li changeView-view-ban">*/}
                    {/*            图形化视图*/}
                    {/*        </div>*/}
                    {/*}*/}
                </div>
            </div>

            <NewStageAddModal
                data={data}
                setData={setData}
                newStageVisible={newStageVisible}
                setNewStageVisible={setNewStageVisible}
                setBuildType={setBuildType}
                setDeployType={setDeployType}
                updateConfigure={updateConfigure}
                pipelineId={pipelineId}
            />
        </div>
    )
}

export default withRouter(inject("structureStore","configDataStore","configStore")(observer(ConfigChangeView)))
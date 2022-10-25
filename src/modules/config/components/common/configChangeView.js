import React,{useEffect,useState} from "react";
import {Button,message,Spin} from "antd";
import {LoadingOutlined,BarsOutlined,AppstoreOutlined,ExclamationCircleOutlined} from "@ant-design/icons";
import {getVersionInfo,getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "./configChangeView.scss";
import AddModal from "../formView/addModal";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,configStore,structureStore} = props

    const {pipelineStartStructure} = structureStore
    const {validLength,isPlugin} = configStore

    const [processVisible,setProcessVisible] = useState(false)
    const [addConfigVisible,setAddConfigVisible] = useState(false)

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

    const isRun = () =>{
        return validLength > 0
    }

    return (
        <div className="config_changeView">
            <div className="changeView">
                <div className="changeView-valid">
                    {validLength && validLength > 0 &&
                    <span>
                        <ExclamationCircleOutlined />
                        &nbsp;
                        {validLength}项配置未完成
                    </span>}
                </div>
                <div className="changeView-newStage">
                    <Button onClick={()=>setAddConfigVisible(true)}>
                        添加配置
                    </Button>
                </div>
                <div className="changeView-btn">
                    {
                        processVisible ?
                            <Button type="primary">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 25 }} spin />} />
                            </Button>
                            :
                            <Button
                                type="primary"
                                form="form"
                                onClick={()=>run()}
                                disabled={isRun()}
                            >
                                运行
                            </Button>
                    }
                </div>
                <div className="changeView-view">
                    <div className={`changeView-view-li ${view==="forms" ? "changeView-view-inner":null}`}
                         onClick={()=>changeView("forms")}
                    >
                        <div className="changeView-view-item" >
                            <BarsOutlined  />
                            &nbsp;
                            表单视图
                        </div>
                    </div>
                    {/*<div className={`changeView-view-li ${view==="gui" ? "changeView-view-inner":null}`}*/}
                    {/*     onClick={()=>changeView("gui")}*/}
                    {/*>*/}
                    {/*    <div className="changeView-view-item">*/}
                    {/*        <AppstoreOutlined/>*/}
                    {/*        &nbsp;*/}
                    {/*        图形化视图*/}
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
                                    图形化视图
                                </div>
                            </div>
                            :
                            <div className="changeView-view-li changeView-view-ban">
                                <AppstoreOutlined/>
                                &nbsp;
                                图形化视图
                            </div>
                    }
                </div>
            </div>

            <AddModal
                addConfigVisible={addConfigVisible}
                setAddConfigVisible={setAddConfigVisible}
            />

        </div>
    )
}

export default withRouter(inject("structureStore","configStore")(observer(ConfigChangeView)))
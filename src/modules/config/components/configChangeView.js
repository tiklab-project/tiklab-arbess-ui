import React,{useEffect,useState} from "react";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {getVersionInfo} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "./configChangeView.scss";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,structureStore,userId,pipelineName,setRunOrSave,configDataStore} = props

    const {pipelineStartStructure} = structureStore
    const {isPlugin,setIsPrompt} = configDataStore
    const [processVisible,setProcessVisible] = useState(false)
    const configView = localStorage.getItem("configView")

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
        // 离开编辑页面关闭提示
        setIsPrompt(false)
        // 关闭新建配置跳转
        if(setRunOrSave){
            setRunOrSave(false)
        }
        setTimeout(()=>props.history.push(`/index/task/${pipelineName}/structure`),1000)
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
                <div className="changeView-btn">
                    <Button form="form" htmlType="submit">保存</Button>
                    <Button form="form" htmlType="submit" type="primary" onClick={()=>run()}>
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
        </div>
    )
}

export default withRouter(inject("structureStore","configDataStore")(observer(ConfigChangeView)))
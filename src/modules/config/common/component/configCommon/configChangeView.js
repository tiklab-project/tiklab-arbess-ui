import React,{useState} from "react";
import "./configChangeView.scss";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const ConfigChangeView = props =>{

    const {view,setView,matFlowId,structureStore,setIsPrompt,userId,isBtn,matFlowName,
        setRunOrSave} = props

    const {matFlowStartStructure} = structureStore
    const [processVisible,setProcessVisible] = useState(false)

    const run = () => {
        const params = {
            userId:userId,
            matFlowId:matFlowId
        }
        setProcessVisible(true)
        setIsPrompt(false)
        if(setRunOrSave){
            setRunOrSave(false)
        }
        matFlowStartStructure(params).then(res=>{
            if(res.code === 0 && res.data === 1){
                setTimeout(()=>props.history.push(`/index/task/${matFlowName}/structure`),500)
            }else {
                setProcessVisible(false)
                message.error({content:"运行失败", className:"message"})
            }
        }).catch(error=>{
            console.log(error)
        })
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
                    <div onClick={()=>setView(1)} className={view===1 ? "changeView-view-li changeView-view-inner" : "changeView-view-li"}>
                        <div className="changeView-view-item" >
                            表单视图
                        </div>
                    </div>
                    {
                        isBtn ?
                            <div onClick={()=>setView(2)} className={view===2 ? "changeView-view-li changeView-view-inner" : "changeView-view-li"}>
                                <div className="changeView-view-item">
                                    图形化视图
                                </div>
                            </div>
                            :
                            <div className = "changeView-view-li changeView-view-ban">
                                图形化视图
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(inject("structureStore")(observer(ConfigChangeView)))
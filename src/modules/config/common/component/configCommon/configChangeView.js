import React,{useState} from "react";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {getVersionInfo} from "tiklab-core-ui";
import "./configChangeView.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";

const ConfigChangeView = props =>{

    const {view,setView,matFlowId,structureStore,setIsPrompt,userId,matFlowName,
        setRunOrSave} = props

    const {matFlowStartStructure} = structureStore
    const [processVisible,setProcessVisible] = useState(false)

    const run = () => {
        const params = {
            userId:userId,
            matFlowId:matFlowId
        }
        // 改变按钮
        setProcessVisible(true)
        // 离开编辑页面关闭提示
        setIsPrompt(false)
        // 关闭新建配置跳转
        if(setRunOrSave){
            setRunOrSave(false)
        }
        // setTimeout(()=> props.history.push(`/index/task/${matFlowName}/structure`),1000)
        matFlowStartStructure(params).then(res=>{
            if(res.code === 0 && res.data === 1){
                if(res.data===1){
                props.history.push(`/index/task/${matFlowName}/structure`)
                }else{
                    setProcessVisible(false)
                    message.error({content:"项目正在运行", className:"message"})
                }
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
                    <div className={view===1 ? "changeView-view-li changeView-view-inner" : "changeView-view-li"}
                         onClick={()=>setView(1)}
                    >
                        <div className="changeView-view-item" >
                            表单视图
                        </div>
                    </div>
                    {
                        !getVersionInfo().expired ?
                            <div className={view===2 ? "changeView-view-li changeView-view-inner" : "changeView-view-li"}
                                 onClick={()=>setView(2)}
                            >
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
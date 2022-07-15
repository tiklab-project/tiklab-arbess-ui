import React,{useState} from "react";
import "./configChangeView.scss";
import {Button,message,Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt,userId,isBtn} = props

    const [processVisible,setProcessVisible] = useState(false)

    const run = () => {
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        setProcessVisible(true)
        setIsPrompt(false)
        setTimeout(()=>{
            pipelineStartStructure(params).then(res=>{
                console.log("运行",res)
                if(res.code === 0 && res.data === 1){
                    props.history.push("/index/task/structure")
                }else {
                    setProcessVisible(false)
                    message.error({content:"运行失败", className:"message"})
                }
            }).catch(error=>{
                console.log(error)
            })
        },1000)
    }

    return (
        <div className="config_changeView">
            <div className="changeView">
                <div className="changeView-btn">
                    <Button form="form" htmlType="submit">保存</Button>
                    <Button form="form" type="primary" htmlType="submit" onClick={()=>run()}>
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

export default withRouter(ConfigChangeView)
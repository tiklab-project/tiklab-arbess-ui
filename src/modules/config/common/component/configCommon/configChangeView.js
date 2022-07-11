import React from "react";
import {Button} from "antd";
import "./configChangeView.scss";
import {withRouter} from "react-router-dom";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt,userId,isBtn} = props

    const run = () => {
        setIsPrompt(false)
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        setTimeout(()=>{
            pipelineStartStructure(params).then(res=>{
                if(res.code === 0){
                    props.history.push("/index/task/structure")
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
                        运行
                    </Button>
                </div>
                <div className="changeView-view">
                    <div onClick={()=>setView(1)} className={view===1 ? "view view-link" : "view"} >
                        表单视图
                    </div>
                    {
                        isBtn ?
                            <div className={view===2 ?  "view view-link" : "view" } onClick={()=>setView(2)}>
                                图形化视图
                            </div>
                            :
                            <div className = "view view-ban">
                                图形化视图
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(ConfigChangeView)
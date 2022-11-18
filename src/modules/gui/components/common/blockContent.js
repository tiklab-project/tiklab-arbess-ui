import React from "react";
import {Space} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import HlineIcon from "../../../config/components/formTitle/hlineIcon";
import Subtitle from "../../../config/components/formTitle/subtitle";

const BlockContent = props =>{

    const {setTaskFormDrawer,setNewStage,validType,type,formInitialValues,setNewStageDrawer,setIndex,inse} = props

    const showStage = type =>{
        setTaskFormDrawer(true)
        setNewStage(type)
    }

    const valid = type =>{
        return validType && validType.some(item=>item==type)
    }

    const style = {
        width:260
    }

    const insertData = (type,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    return(
        <>
            {type>10 && <div className="group-flow">
                <div className="group-flow_btn">
                    <svg className="icon group-flow_btn_i"
                         aria-hidden="true"
                         onClick={() =>insertData(type,inse)}
                    >
                        <use xlinkHref="#icon-zengjia"/>
                    </svg>
                </div>
            </div>}
            <div className="group-table">
                <div className="group-head">
                    <div className="name">
                        <div  className="label">
                            <HlineIcon type={type}/>
                        </div>
                    </div>
                </div>
                <div className="newStages">
                    <div className="newStages-step">
                        <div className="newStages-content"  onClick={()=>showStage(type)}>
                            <div className="newStages-task">
                                <div className={`newStages-job ${valid(type)?"job-name":""}`}>
                                    <div className="newStages-job_text">
                                        <Space>
                                            <span className="newStages-job-title">
                                                <Subtitle type={type}/>
                                            </span>
                                            {valid(type) &&
                                                <span className="newStages-job-warn">
                                                <ExclamationCircleOutlined />
                                            </span>
                                            }
                                        </Space>                                                               
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            type < 10 && formInitialValues && formInitialValues.codeName &&
                            <div className="guiView_codeName">
                                <div className="branch-title"> {formInitialValues.codeName} </div>
                            </div>
                        }
                        {
                            type < 10 &&formInitialValues && formInitialValues.codeBranch &&
                            <div className="guiView_branch ">
                                <div className="branch-address">{formInitialValues.codeBranch}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlockContent
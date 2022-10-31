import React from "react";
import NameType from "./nameType";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import TitleType from "./titleType";

const BlockContent = props =>{

    const {setTaskFormDrawer,setNewStage,validType,type,formInitialValues,setNewStageDrawer,setIndex,inse} = props

    const showStage = type =>{
        setNewStage(type)
        setTaskFormDrawer(true)
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
                            <TitleType type={type}/>
                        </div>
                    </div>
                </div>
                <div className="newStages">
                    <div className="newStages-step">
                        <div className="newStages-content"  >
                            <div className="newStages-task" onClick={()=>showStage(type)}>
                                <div className={`newStages-job ${valid(type)?"job-name":""}`}
                                     style={type<10 ? style:null}
                                >
                                    <div className="newStages-job_text">
                                        <NameType type={type}/>
                                        {valid(type) &&
                                            <span className="newStages-job-warn">
                                            <ExclamationCircleOutlined />
                                        </span>
                                        }
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
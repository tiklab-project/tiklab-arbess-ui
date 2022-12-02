import React,{useState,Fragment} from "react";
import AddDrawer from "./addDrawer";
import {PlusOutlined} from "@ant-design/icons";

const NewStage = props =>{

    const {data,setTaskFormDrawer,index,setIndex,validType,setDataItem} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉

    const newTask = () =>{
        setNewStageDrawer(true)
        setIndex(data && data.length)
    }

    const showStage = item =>{
        setTaskFormDrawer(true)
        setDataItem(item)
    }

    const valid = type =>{
        return validType && validType.some(item=>item==type)
    }

    const insertData = (type,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    // data渲染
    const newStageShow = data =>{
        return data && data.map((item,index)=>{
            return <Fragment key={index}>
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
                        <div className="newStages-content"  onClick={()=>showStage(item)}>
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
            </Fragment>
        })
    }

    const render = () =>{
        if(data && data.length === 0){
            return null
        }
        else {
            return  <div className="group-flow">
                        <div className="group-flow_btn" />
                   </div>
        }
    }

    // data是否为最长度
    const isAddNewStage = data => {
        return data && data.length > 6 ?
            null
             :
            <>
                {render()}
                <div className="group-create">
                    <div className="group-head">
                        <div className="name" style={{opacity:0}}>新阶段</div>
                    </div>
                    <div className="newStages">
                        <div className="newStages-content"  >
                            <div className="newStages-task">
                                <div className="newStages-job" onClick={()=>newTask()}>
                                    <div className="newStages-job_text">
                                        <PlusOutlined/>
                                        <span style={{paddingLeft:5}}>新任务</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    }

    return(
       <>
           {newStageShow(data)}
           {isAddNewStage(data)}
           <AddDrawer
               newStageDrawer={newStageDrawer}
               setNewStageDrawer={setNewStageDrawer}
               index={index}
               setIndex={setIndex}
           />
       </>
    )
}

export default NewStage
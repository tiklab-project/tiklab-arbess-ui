import React,{Fragment,useState} from "react";
import NameType from "./nameType";
import NewStageAddDrawer from "./newStageAddDrawer";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const NewStage = props =>{

    const {data,setTaskFormDrawer,setNewStage,index,setIndex,validType} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉

    const newTask = () =>{
        setNewStageDrawer(true)
        setIndex(data && data.length)
    }

    const showStage = item =>{
        setNewStage(item.dataType)
        setTaskFormDrawer(true)
    }

    const insertData = (item,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    const title = dataType =>{
        switch (parseInt(dataType)) {
            case 11:
                return renderTitle("ceshi1","测试")
            case 21:
            case 22:
                return renderTitle("goujiangongju","构建")
            case 31:
            case 32:
                return renderTitle("bushubanben","部署")
        }
    }

    const renderTitle = (icon,title) =>{
        return  <>
                    <span className="desc-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${icon}`} />
                        </svg>
                    </span>
                    <span className="desc-title">
                        {title}
                    </span>
                </>
    }

    const valid = codeType =>{
        return validType && validType.some(item=>item==codeType)
    }

    // data渲染
    const newStageShow = data =>{
        return data && data.map((item,index)=>{
            return(
                <Fragment key={index}>
                    <div className="group-flow">
                        <div className="group-flow_btn" >
                            <svg className="icon group-flow_btn_i"
                                 aria-hidden="true"
                                 onClick={()=>insertData(item,index)}
                            >
                                <use xlinkHref="#icon-zengjia"/>
                            </svg>
                        </div>
                    </div>
                    <div className="group-table">
                        <div className="group-head">
                            <div className="name">
                                <div  className="label">
                                    <span>{title(item.dataType)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="newStages">
                            <div className="newStages-step">
                                <div className="newStages-content"  >
                                    <div className="newStages-task">
                                        <div className={`newStages-job ${valid(item.dataType)?"job-name":""}`}>
                                            <div className="newStages-job_text" onClick={()=>showStage(item)}>
                                                <NameType type={item.dataType}/>
                                                {valid(item.dataType) &&
                                                    <span key={item} className="newStages-job-warn">
                                                        <ExclamationCircleOutlined />
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }

    // data是否为最长度
    const isAddNewStage = data => {
        return data && data.length > 2 ?
            null
             :
            <>
                <div className="group-flow">
                    <div className="group-flow_btn" />
                </div>
                <div className="group-create">
                    <div className="group-head">
                        <div className="name" style={{opacity:0}}>新阶段</div>
                    </div>
                    <div className="newStages">
                        <div className="newStages-content"  >
                            <div className="newStages-task">
                                <div className="newStages-job">
                                    <div className="newStages-job_text" onClick={()=>newTask()}>
                                        新任务
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
           <NewStageAddDrawer
               newStageDrawer={newStageDrawer}
               setNewStageDrawer={setNewStageDrawer}
               index={index}
               setIndex={setIndex}
           />
       </>
    )
}

export default NewStage
import React,{useState} from "react";
import AddDrawer from "./addDrawer";
import BlockContent from "./blockContent";
import {PlusOutlined} from "@ant-design/icons";

const NewStage = props =>{

    const {data,setTaskFormDrawer,setNewStage,index,setIndex,validType,codeType} = props

    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉

    const newTask = () =>{
        setNewStageDrawer(true)
        setIndex(data && data.length)
    }

    // data渲染
    const newStageShow = data =>{
        return data && data.map((item,index)=>{
            return <BlockContent
                        key={index}
                        setTaskFormDrawer={setTaskFormDrawer}
                        setNewStage={setNewStage}
                        setNewStageDrawer={setNewStageDrawer}
                        setIndex={setIndex}
                        inse={index}
                        validType={validType}
                        type={item.type}
                    />
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
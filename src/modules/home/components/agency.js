import React from "react";
import {ShareAltOutlined} from "@ant-design/icons";

const Agency = props =>{

    const {taskList} = props

    return(
        <div className="agency">
            <div className="agency-top">
                <div className="agency-top-title">我的待办</div>
                <div
                    className="agency-top-ac"
                    onClick={()=>props.history.push("/index/system/myTodoTask")}
                >
                    更多...
                </div>
            </div>
            <div className="agency-bottom">
                {
                    taskList && taskList.map((item,index)=>{
                        return(
                            <div key={index}>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Agency
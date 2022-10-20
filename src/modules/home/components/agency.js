import React from "react";

const Agency = props =>{
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
            <div>

            </div>
        </div>
    )
}

export default Agency
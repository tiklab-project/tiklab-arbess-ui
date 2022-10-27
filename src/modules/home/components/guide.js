import React from "react";
import {withRouter} from "react-router-dom";

const Guide = props =>{

    const {title,type} = props

    const goDetails = type =>{
        switch (type) {
            case "agency":
                props.history.push("/index/fullWorkTodo")
                break
        }
    }

    return(
        <div className="homePage-guide">
            <div className="homePage-guide-title">
                {title}
            </div>
            {
                type && (
                    <div className="homePage-guide-ac">
                        <span onClick={()=>goDetails(type)}>
                            更多...
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default withRouter(Guide)
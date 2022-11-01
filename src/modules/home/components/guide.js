import React from "react";
import {withRouter} from "react-router-dom";
import {ArrowRightOutlined} from "@ant-design/icons";

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
            <div className="--mf-second-level-title">
                {title}
            </div>
            {
                type && (
                    <div className="homePage-guide-ac --mf-dominant-color">
                        <span onClick={()=>goDetails(type)}>
                            <ArrowRightOutlined />
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default withRouter(Guide)
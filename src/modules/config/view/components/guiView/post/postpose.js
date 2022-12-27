import React from "react";
import {PlusOutlined} from "@ant-design/icons";
import Btn from "../../../../../common/btn/btn";
import "./postpose.scss";

const Postpose = props =>{
    return(
        <div className="pose-pose">
            <div className="pose-pose-up">
                <div>
                    <span style={{paddingRight:5}}>后置处理</span>
                    <span style={{fontSize:13}}>(0个)</span>
                </div>
                <Btn
                    title={"添加"}
                    type={"link-nopadding"}
                    icon={<PlusOutlined/>}
                    // onClick={()=>addInput()}
                />
            </div>
            <div className="pose-pose-content">
            </div>
        </div>
    )
}

export default Postpose
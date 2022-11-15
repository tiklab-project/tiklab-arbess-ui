import React from "react";
import {AimOutlined} from "@ant-design/icons";
import "./dynaLatest.scss";
import DynaList from "../common/dynaList";
import Guide from "../../common/guide/guide";

// 最近动态（首页，概况）
const DynaLatest = props =>{

    const {dynamicList,pipelineId,title} = props

    return(
        <div className="dynaLatest">
            <Guide
                title={title}
                icon={<AimOutlined/>}
                type={"dynamic"}
                pipelineId={pipelineId[0]}
            />
            <DynaList
                {...props}
                dynamicList={dynamicList}
                pipelineId={pipelineId}
            />
        </div>
    )
}

export default DynaLatest
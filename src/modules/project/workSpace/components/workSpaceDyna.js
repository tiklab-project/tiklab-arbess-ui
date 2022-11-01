import React from "react";
import {LoadingOutlined,AimOutlined,UserOutlined} from "@ant-design/icons";
import WorkLine from "./workLine";

const WorkSpaceDyna = props =>{

    const {dynamicList,moreDynamic,isDyna,dynaPageTotal,dynaPagination} = props

    const renderDynaList = (item,index) => {
        return <div className="dyna-item" key={index}>
            <div className="dyna-item-left">
                <div className={`dyna-item-icon`}>
                    <UserOutlined/>
                </div>
                <div className="dyna-item-message">
                    <div
                        dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                    />
                </div>
            </div>
            <div>{item.timestamp}</div>
        </div>
    }


    return(
        <div className="workSpace-dyna workSpace-div">
            <WorkLine
                icon={<AimOutlined />}
                title={"流水线动态"}
            />
            <div className="dyna">
                {
                    dynamicList && dynamicList.map((item,index)=>{
                        return renderDynaList(item,index)
                    })
                }
            </div>
            {
                dynamicList && dynamicList.length === dynaPageTotal && dynaPagination > 1 &&
                <div className="dyna-bottom --mf-second-level-title"> 没有更多了 🤐</div>
            }
            {
                dynamicList && dynamicList.length < dynaPageTotal && isDyna===false &&
                <div
                    className="dyna-bottom --mf-second-level-title --mf-dominant-color"
                    onClick={()=>moreDynamic()}
                >
                    更多动态...
                </div>
            }
            {
                isDyna &&
                <div className="dyna-bottom --mf-second-level-title --mf-dominant-color">
                    <LoadingOutlined/>
                </div>
            }
        </div>
    )
}

export default WorkSpaceDyna
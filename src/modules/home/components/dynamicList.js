import React from "react";
import {LoadingOutlined,UserOutlined} from "@ant-design/icons";
import Guide from "./guide";

const DynamicList = props =>{

    const {dynamicList,moreDynamic,isDyna,dynaPageTotal,dynaPagination} = props

    const renderLis = (item,index) => {
        return <div className="dynamic-item" key={index}>
            <div className="dynamic-item-left">
                <div className="dynamic-item-icon">
                    <UserOutlined/>
                </div>
                <div className="dynamic-item-message">
                    <div
                        dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                    />
                </div>
            </div>
            <div>{item.timestamp}</div>
        </div>
    }

    return(
        <div className={"dynamic"}>
            <Guide title={"近期动态"}/>
            <div className="dynamic-center">
                {
                    dynamicList && dynamicList.map((item,index)=>{
                        return renderLis(item,index)
                    })
                }
            </div>
            {
                dynamicList && dynamicList.length === dynaPageTotal && dynaPagination > 1 &&
                <div className="dynamic-bottom --mf-second-level-title"> 没有更多了 🤐</div>
            }
            {
                dynamicList && dynamicList.length < dynaPageTotal && isDyna===false &&
                <div
                    className="dynamic-bottom --mf-second-level-title --mf-dominant-color"
                    onClick={()=>moreDynamic()}
                >
                    更多动态...
                </div>
            }
            {
                isDyna &&
                <div className="dynamic-bottom --mf-second-level-title --mf-dominant-color">
                    <LoadingOutlined/>
                </div>
            }

        </div>
    )
}

export default DynamicList
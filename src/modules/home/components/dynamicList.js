import React from "react";
import {LoadingOutlined, UserOutlined} from "@ant-design/icons";
import Guide from "./guide";

const DynamicList = props =>{

    const {dynamicList,moreDynamic,isDyna,dynaPage} = props

    const renderLis = (item,index) => {
        return <div className="dynamic-item" key={index}>
            <div className="dynamic-item-left">
                <div className="dynamic-item-icon">
                    <UserOutlined/>
                </div>
                <div>
                    <div className="dynamic-item-userName">
                        {item.user.name}
                    </div>
                    <div className="dynamic-item-message">
                        <div
                            dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                        />
                    </div>
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
                dynamicList && dynamicList.length === dynaPage.total &&
                <div className="dynamic-bottom dynamic-bottom-none"> 没有更多了 🤐</div>
            }
            {
                dynamicList && dynamicList.length < dynaPage.total && !isDyna &&
                <div
                    className="dynamic-bottom dynamic-bottom-more"
                    onClick={()=>moreDynamic()}
                >
                    更多动态...
                </div>
            }
            {
                isDyna &&
                <div className="dynamic-bottom dynamic-bottom-more">
                    <LoadingOutlined/>
                </div>
            }

        </div>
    )
}

export default DynamicList
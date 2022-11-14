import React from "react";
import {Profile} from "tiklab-eam-ui";
import {Space} from "antd";
import "./dynaList.scss";

const DynaList = props =>{

    const {dynamicList} = props

    const renderLis = (item,index) => {
        return <div className="dynamic-item" key={index}>
            <div className="dynamic-item-left">
                <Space>
                    <Profile userInfo={item.user}/>
                    <div className="dynamic-item-message">
                        <div
                            dangerouslySetInnerHTML={{__html: item.opLogTemplate.content}}
                        />
                    </div>
                </Space>
            </div>
            <div>{item.timestamp}</div>
        </div>
    }

    return (
        <div className="dynamic-center">
            {
                dynamicList && dynamicList.map((item,index)=>{
                    return renderLis(item,index)
                })
            }
        </div>
    )
}

export default DynaList